package com.example.backend.controller;

import com.example.backend.dto.PostDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.service.PostService;
import com.example.backend.util.NoSuchBoardException;
import com.example.backend.util.NoSuchPostingException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
public class PostController {
    private final PostService postService;

    @PostMapping
    public ResponseEntity<?> createPost(@RequestParam Long boardId,
                                        @RequestBody PostDTO postDTO,
                                        HttpSession session) {
        ResponseDTO<PostDTO> responseDTO = new ResponseDTO<>();
        try {
            Long currentUserId = (Long) session.getAttribute("loginUserId");
            if (currentUserId == null) {
                throw new AuthenticationException("User is not authenticated.");
            }

            postService.register(boardId, postDTO, currentUserId);
            responseDTO.setItem(postDTO);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok(responseDTO);
        } catch (NoSuchBoardException | AuthenticationException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> searchPost(@PathVariable Long postId) {
        ResponseDTO<PostDTO> responseDTO = new ResponseDTO<>();
        try {
            PostDTO postDTO = postService.findPost(postId);
            responseDTO.setItem(postDTO);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok(responseDTO);
        } catch (NoSuchPostingException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @GetMapping
    public ResponseEntity<?> searchByTitleInBoard(@RequestParam Long boardId,
                                                  @RequestParam String postTitle) {
        ResponseDTO<PostDTO> responseDTO = new ResponseDTO<>();
        try {
            List<PostDTO> foundPosts = postService.findByTitleInBoard(boardId, postTitle);
            responseDTO.setItems(foundPosts);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok().body(responseDTO);
        } catch (NoSuchBoardException | NoSuchPostingException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @GetMapping("/list/{boardId}")
    public ResponseEntity<?> searchByBoard(@PathVariable Long boardId) {
        ResponseDTO<PostDTO> responseDTO = new ResponseDTO<>();
        try {
            List<PostDTO> foundPosts = postService.findByBoard(boardId);
            responseDTO.setItems(foundPosts);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok().body(responseDTO);
        } catch (NoSuchBoardException | NoSuchPostingException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> searchByClubAndMember(@RequestParam Long clubId,
                                                   @RequestParam Long memberId) {
        ResponseDTO<PostDTO> responseDTO = new ResponseDTO<>();
        try {
            List<PostDTO> foundPosts = postService.findByClubAndMember(clubId, memberId);
            responseDTO.setItems(foundPosts);
            responseDTO.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok().body(responseDTO);
        } catch (NoSuchBoardException | NoSuchPostingException e) {
            responseDTO.setErrorMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
}
