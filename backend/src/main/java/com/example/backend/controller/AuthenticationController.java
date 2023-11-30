package com.example.backend.controller;

import com.example.backend.dto.ResponseDTO;
import com.example.backend.entity.Member;
import com.example.backend.service.MemberService;
import com.example.backend.util.NoSuchEmailException;
import com.example.backend.util.PasswordNotMatchException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthenticationController {
    public final MemberService memberService;

    @PostMapping
    public ResponseEntity<?> login(@RequestParam("memberEmail") String memberEmail,
                                   @RequestParam("memberPassword") String memberPassword,
                                   HttpSession session) {
        ResponseDTO<Map<String, String>> responseDTO = new ResponseDTO<>();
        try {
            Member member = memberService.login(memberEmail, memberPassword);
            session.setAttribute("loginUserId", member.getMemberId());

            Map<String, String> returnMap = new HashMap<>();
            returnMap.put("message", "Login Succeed.");
            responseDTO.setItem(returnMap);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok().body(responseDTO);
        } catch (NoSuchEmailException | PasswordNotMatchException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.UNAUTHORIZED.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
}
