package com.example.backend.controller;

import com.example.backend.dto.MembershipDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.jwt.JwtTokenProvider;
import com.example.backend.service.MembershipService;
import com.example.backend.util.MemberDuplicationException;
import com.example.backend.util.NoSuchClubException;
import com.example.backend.util.NoSuchMemberException;
import com.example.backend.util.NoSuchMembershipException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/membership")
public class MembershipController {
    private final MembershipService membershipService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping
    public ResponseEntity<?> joinClub(@RequestParam("clubId") Long clubId,
                                      @RequestBody MembershipDTO membershipDTO,
                                      HttpServletRequest request) {
        ResponseDTO<MembershipDTO> responseDTO = new ResponseDTO<>();
        try {
            String token = jwtTokenProvider.resolveToken(request);
            Long currentUserId = jwtTokenProvider.getMemberId(token);

            membershipService.addMembership(clubId, currentUserId, membershipDTO);
            responseDTO.setItem(membershipDTO);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok().body(responseDTO);
        } catch (NoSuchClubException | NoSuchMemberException | MemberDuplicationException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @GetMapping
    public ResponseEntity<?> searchMembership(@RequestParam("clubId") Long clubId,
                                              HttpServletRequest request) {
        ResponseDTO<MembershipDTO> responseDTO = new ResponseDTO<>();
        try {
            String token = jwtTokenProvider.resolveToken(request);
            Long currentUserId = jwtTokenProvider.getMemberId(token);

            MembershipDTO foundMembership = membershipService.findMembership(clubId, currentUserId);
            responseDTO.setItem(foundMembership);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok().body(responseDTO);
        } catch (NoSuchMembershipException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @GetMapping("/club")
    public ResponseEntity<?> searchMembershipsInClub(@RequestParam("clubId") Long clubId) {
        ResponseDTO<MembershipDTO> responseDTO = new ResponseDTO<>();
        try {
            List<MembershipDTO> foundMemberships = membershipService.findAllMembershipsByClub(clubId);
            responseDTO.setItems(foundMemberships);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok().body(responseDTO);
        } catch (NoSuchClubException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @GetMapping("/member")
    public ResponseEntity<?> searchMembershipsInMember(HttpServletRequest request) {
        ResponseDTO<MembershipDTO> responseDTO = new ResponseDTO<>();
        try {
            String token = jwtTokenProvider.resolveToken(request);
            Long currentUserId = jwtTokenProvider.getMemberId(token);

            List<MembershipDTO> foundMemberships = membershipService.findAllMembershipsByMember(currentUserId);
            responseDTO.setItems(foundMemberships);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok().body(responseDTO);
        } catch (NoSuchMemberException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @PutMapping
    public ResponseEntity<?> updateMembership(@RequestParam("clubId") Long clubId,
                                              @RequestParam("memberId") Long memberId,
                                              @RequestBody MembershipDTO membershipDTO) {
        ResponseDTO<MembershipDTO> responseDTO = new ResponseDTO<>();
        try {
            MembershipDTO updatedMembershipDTO = membershipService.modify(clubId, memberId, membershipDTO);
            responseDTO.setItem(updatedMembershipDTO);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok().body(responseDTO);
        } catch (NoSuchClubException | NoSuchMemberException | NoSuchMembershipException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteMembership(@RequestParam("clubId") Long clubId,
                                              HttpServletRequest request) {
        ResponseDTO<Map<String, String>> responseDTO = new ResponseDTO<>();
        try {
            String token = jwtTokenProvider.resolveToken(request);
            Long currentUserId = jwtTokenProvider.getMemberId(token);

            membershipService.remove(clubId, currentUserId);
            Map<String, String> returnMap = new HashMap<>();
            returnMap.put("message", "Successfully removed the membership.");
            responseDTO.setItem(returnMap);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok().body(responseDTO);
        } catch (NoSuchClubException | NoSuchMemberException | NoSuchMembershipException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteMembershipByPresident(@RequestParam("clubId") Long clubId,
                                                         @RequestParam("membershipId") Long membershipId,
                                                         HttpServletRequest request) {
        ResponseDTO<Map<String, String>> responseDTO = new ResponseDTO<>();
        try {
            String token = jwtTokenProvider.resolveToken(request);
            Long currentUserId = jwtTokenProvider.getMemberId(token);

            membershipService.removeByPresident(clubId, membershipId, currentUserId);
            Map<String, String> returnMap = new HashMap<>();
            returnMap.put("message", "Successfully removed the membership.");
            responseDTO.setItem(returnMap);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok().body(responseDTO);
        } catch (NoSuchClubException | NoSuchMemberException | NoSuchMembershipException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
}
