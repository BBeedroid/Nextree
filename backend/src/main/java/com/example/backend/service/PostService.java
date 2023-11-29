package com.example.backend.service;

import com.example.backend.dto.PostDTO;

import java.util.List;

public interface PostService {
    String register(Long boardId, PostDTO postDTO);
    PostDTO find(Long postId);
    List<PostDTO> findByBoard(Long boardId);
    void modify(PostDTO postDTO);
    void remove(Long postId);
    void removeAllIn(Long boardId);
}
