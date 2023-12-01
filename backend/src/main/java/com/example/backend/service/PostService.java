package com.example.backend.service;

import com.example.backend.dto.PostDTO;

import java.util.List;

public interface PostService {
    void register(Long boardId, PostDTO postDTO, Long currentUserId);
    PostDTO findPost(Long postId);
    List<PostDTO> findByTitleInBoard(Long boardId, String postTitle);
    List<PostDTO> findByBoard(Long boardId);
    List<PostDTO> findByClubAndMember(Long clubId, Long memberId);
    PostDTO modify(PostDTO postDTO, Long currentUserId);
    void remove(Long postId);
    void removeAllIn(Long boardId);
}
