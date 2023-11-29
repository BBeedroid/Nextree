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

import java.util.HashMap;
import java.util.Map;

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
            ClubDTO foundClubDTO = clubService.findClubById(clubId);
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

    @PutMapping
    public ResponseEntity<?> updateClub(@RequestParam Long clubId, @RequestBody ClubDTO clubDTO) {
        ResponseDTO<ClubDTO> responseDTO = new ResponseDTO<>();
        try {
            ClubDTO updatedClubDTO = clubService.modify(clubId, clubDTO);
            responseDTO.setItem(updatedClubDTO);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok(responseDTO);
        } catch (NoSuchClubException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @DeleteMapping("/{clubId}")
    public ResponseEntity<?> deleteClub(@PathVariable Long clubId) {
        ResponseDTO<Map<String, String>> responseDTO = new ResponseDTO<>();
        try {
            clubService.remove(clubId);
            Map<String, String> returnMap = new HashMap<>();
            returnMap.put("message", "successfully removed club with id : " + clubId);
            responseDTO.setItem(returnMap);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok().body(responseDTO);
        } catch (NoSuchClubException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
}
