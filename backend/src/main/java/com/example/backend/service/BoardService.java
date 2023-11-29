package com.example.backend.service;

import com.example.backend.dto.BoardDTO;

import java.util.List;

public interface BoardService {
    String register(BoardDTO boardDTO);
    BoardDTO find(Long boardId);
    List<BoardDTO> findByTitle(String boardTitle);
    BoardDTO findByClubName(String clubName);
    void modify(BoardDTO boardDTO);
    void remove(Long boardId);
}
