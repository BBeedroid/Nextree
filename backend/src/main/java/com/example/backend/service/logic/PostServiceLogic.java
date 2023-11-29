package com.example.backend.service.logic;

import com.example.backend.dto.PostDTO;
import com.example.backend.service.PostService;

import java.util.List;

public class PostServiceLogic implements PostService {
    @Override
    public String register(Long boardId, PostDTO postDTO) {
        return null;
    }

    @Override
    public PostDTO find(Long postId) {
        return null;
    }

    @Override
    public List<PostDTO> findByBoard(Long boardId) {
        return null;
    }

    @Override
    public void modify(PostDTO postDTO) {

    }

    @Override
    public void remove(Long postId) {

    }

    @Override
    public void removeAllIn(Long boardId) {

    }
}
