package com.example.backend.controller;

import com.example.backend.dto.BoardDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.service.BoardService;
import com.example.backend.util.NoPermissionToCreateBoard;
import com.example.backend.util.NoSuchClubException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {
    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<?> createBoard(@RequestParam Long clubId,
                                      @RequestBody BoardDTO boardDTO,
                                      HttpSession session) {
        ResponseDTO<BoardDTO> responseDTO = new ResponseDTO<>();
        try {
            Long currentUserId = (Long) session.getAttribute("loginUserId");
            if (currentUserId == null) {
                throw new AuthenticationException("User is not authenticated.");
            }

            boardService.register(clubId, boardDTO, currentUserId);
            responseDTO.setItem(boardDTO);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok(boardDTO);
        } catch (NoSuchClubException | NoPermissionToCreateBoard | AuthenticationException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
}
