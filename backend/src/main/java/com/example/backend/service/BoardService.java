package com.example.backend.service;

import com.example.backend.dto.BoardDTO;

import java.util.List;

public interface BoardService {
    void register(Long clubId, BoardDTO boardDTO, Long currentUserId);
    BoardDTO findBoard(Long boardId);
    BoardDTO findByClubIdAndBoardTitle(Long clubId, String boardTitle);
    List<BoardDTO> findByClubId(Long clubId);
    BoardDTO modify(Long clubId, BoardDTO boardDTO, Long currentUserId);
    void remove(Long boardId, Long currentUserId);
}
