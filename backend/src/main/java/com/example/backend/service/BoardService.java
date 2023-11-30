package com.example.backend.service;

import com.example.backend.dto.BoardDTO;

import java.util.List;

public interface BoardService {
    void register(Long clubId, BoardDTO boardDTO, Long currentUserId);
    BoardDTO findBoard(Long boardId);
    BoardDTO findByClubIdAndBoardTitle(Long clubId, String boardTitle);
    List<BoardDTO> findByClubId(Long clubId);
    void modify(BoardDTO boardDTO);
    void remove(Long boardId);
}
