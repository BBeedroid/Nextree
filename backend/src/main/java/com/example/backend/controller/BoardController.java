package com.example.backend.controller;

import com.example.backend.dto.BoardDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.service.BoardService;
import com.example.backend.util.BoardDuplicationException;
import com.example.backend.util.NoPermissionToCreateBoard;
import com.example.backend.util.NoSuchBoardException;
import com.example.backend.util.NoSuchClubException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.List;

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
            return ResponseEntity.ok(responseDTO);
        } catch (NoSuchClubException | BoardDuplicationException | NoPermissionToCreateBoard | AuthenticationException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<?> searchBoard(@PathVariable Long boardId) {
        ResponseDTO<BoardDTO> responseDTO = new ResponseDTO<>();
        try {
            BoardDTO boardDTO = boardService.findBoard(boardId);
            responseDTO.setItem(boardDTO);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok(responseDTO);
        } catch (NoSuchBoardException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @GetMapping
    public ResponseEntity<?> searchBoardByTitle(@RequestParam Long clubId,
                                                @RequestParam String boardTitle) {
        ResponseDTO<BoardDTO> responseDTO = new ResponseDTO<>();
        try {
            BoardDTO boardDTO = boardService.findByClubIdAndBoardTitle(clubId, boardTitle);
            responseDTO.setItem(boardDTO);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok(responseDTO);
        } catch (NoSuchBoardException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> searchBoardByClubId(@RequestParam Long clubId) {
        ResponseDTO<BoardDTO> responseDTO = new ResponseDTO<>();
        try {
            List<BoardDTO> foundBoards = boardService.findByClubId(clubId);
            responseDTO.setItems(foundBoards);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok().body(responseDTO);
        } catch (NoSuchClubException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
}
