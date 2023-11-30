package com.example.backend.service;

import com.example.backend.dto.BoardDTO;

import java.util.List;

public interface BoardService {
    void register(Long clubId, BoardDTO boardDTO, Long currentUserId);
    BoardDTO find(Long boardId);
    List<BoardDTO> findByTitle(String boardTitle);
    BoardDTO findByClubName(String clubName);
    void modify(BoardDTO boardDTO);
    void remove(Long boardId);
}
