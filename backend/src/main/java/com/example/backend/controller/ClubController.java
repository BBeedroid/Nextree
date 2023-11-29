package com.example.backend.controller;

import com.example.backend.dto.ClubDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.service.ClubService;
import com.example.backend.util.ClubDuplicationException;
import com.example.backend.util.NoSuchClubException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/club")
public class ClubController {
    private final ClubService clubService;

    @PostMapping
    public ResponseEntity<?> createClub(@RequestBody ClubDTO clubDTO, @RequestParam Long memberId) {
        ResponseDTO<ClubDTO> responseDTO = new ResponseDTO<>();
        try {
            clubService.register(clubDTO, memberId);
            responseDTO.setItem(clubDTO);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok(responseDTO);
        } catch (ClubDuplicationException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @GetMapping("/{clubId}")
    public ResponseEntity<?> searchByClubId(@PathVariable Long clubId) {
        ResponseDTO<ClubDTO> responseDTO = new ResponseDTO<>();
        try {
            ClubDTO foundClubDTO = clubService.find(clubId);
            responseDTO.setItem(foundClubDTO);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok(responseDTO);
        } catch (NoSuchClubException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @GetMapping
    public ResponseEntity<?> searchByClubName(@RequestParam("clubName") String clubName) {
        ResponseDTO<ClubDTO> responseDTO = new ResponseDTO<>();
        try {
            ClubDTO foundClubDTO = clubService.findClubByName(clubName);
            responseDTO.setItem(foundClubDTO);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok(responseDTO);
        } catch (NoSuchClubException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
}
