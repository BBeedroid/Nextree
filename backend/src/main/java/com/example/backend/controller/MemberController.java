package com.example.backend.controller;

import com.example.backend.dto.MemberDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.service.MemberService;
import com.example.backend.util.InvalidEmailException;
import com.example.backend.util.MemberDuplicationException;
import com.example.backend.util.NoSuchMemberException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<?> createMember(@RequestBody MemberDTO memberDTO) {
        ResponseDTO<MemberDTO> responseDTO = new ResponseDTO<>();
        try {
            memberService.register(memberDTO);
            responseDTO.setItem(memberDTO);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok(responseDTO);
        } catch (MemberDuplicationException | InvalidEmailException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @GetMapping("/{memberEmail}")
    public ResponseEntity<?> searchByMemberEmail(@PathVariable String memberEmail) {
        ResponseDTO<MemberDTO> responseDTO = new ResponseDTO<>();
        try {
            MemberDTO foundMemberDTO = memberService.find(memberEmail);
            responseDTO.setItem(foundMemberDTO);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok(responseDTO);
        } catch (NoSuchMemberException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @GetMapping
    public ResponseEntity<?> searchByNickname(@RequestParam("memberNickname") String memberNickname) {
        ResponseDTO<MemberDTO> responseDTO = new ResponseDTO<>();
        try {
            List<MemberDTO> foundMemberDTOs = memberService.findByNickname(memberNickname);
            responseDTO.setItems(foundMemberDTOs);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok(responseDTO);
        } catch (NoSuchMemberException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @PutMapping
    public ResponseEntity<?> updateMember(@RequestParam Long memberId, @RequestBody MemberDTO memberDTO) {
        ResponseDTO<MemberDTO> responseDTO = new ResponseDTO<>();
        try {
            MemberDTO updatedMemberDTO = memberService.modify(memberId, memberDTO);
            responseDTO.setItem(updatedMemberDTO);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok(responseDTO);
        } catch (MemberDuplicationException | InvalidEmailException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity<?> deleteMember(@PathVariable Long memberId) {
        ResponseDTO<Map<String, String>> responseDTO = new ResponseDTO<>();
        try {
            memberService.remove(memberId);
            Map<String, String> returnMap = new HashMap<>();
            returnMap.put("message", "successfully removed member with id : " + memberId);
            responseDTO.setItem(returnMap);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok().body(responseDTO);
        } catch (NoSuchMemberException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
}
