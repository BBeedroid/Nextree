package com.example.backend.controller;

import com.example.backend.dto.MembershipDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.service.MembershipService;
import com.example.backend.util.MemberDuplicationException;
import com.example.backend.util.NoSuchClubException;
import com.example.backend.util.NoSuchMemberException;
import com.example.backend.util.NoSuchMembershipException;
import jakarta.servlet.http.HttpSession;
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
@RequestMapping("/membership")
public class MembershipController {
    private final MembershipService membershipService;

    @PostMapping
    public ResponseEntity<?> joinClub(@RequestParam("clubId") Long clubId,
                                      @RequestParam("memberId") Long memberId,
                                      @RequestBody MembershipDTO membershipDTO) {
        ResponseDTO<MembershipDTO> responseDTO = new ResponseDTO<>();
        try {
            membershipService.addMembership(clubId, memberId, membershipDTO);
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
                                              @RequestParam("memberId") Long memberId) {
        ResponseDTO<MembershipDTO> responseDTO = new ResponseDTO<>();
        try {
            MembershipDTO foundMembership = membershipService.findMembership(clubId, memberId);
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
    public ResponseEntity<?> searchMembershipsInMember(@RequestParam("memberId") Long memberId) {
        ResponseDTO<MembershipDTO> responseDTO = new ResponseDTO<>();
        try {
            List<MembershipDTO> foundMemberships = membershipService.findAllMembershipsByMember(memberId);
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
                                              HttpSession session) {
        ResponseDTO<Map<String, String>> responseDTO = new ResponseDTO<>();
        try {
            Long currentUserId = (Long) session.getAttribute("loginUserId");
            if (currentUserId == null) {
                throw new AuthenticationException("User is not authenticated.");
            }

            membershipService.remove(clubId, currentUserId);
            Map<String, String> returnMap = new HashMap<>();
            returnMap.put("message", "Successfully removed the membership.");
            responseDTO.setItem(returnMap);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok().body(responseDTO);
        } catch (NoSuchClubException | NoSuchMemberException | NoSuchMembershipException | AuthenticationException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
}
