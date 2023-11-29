package com.example.backend.service.logic;

import com.example.backend.dto.BoardDTO;
import com.example.backend.service.BoardService;

import java.util.List;

public class BoardServiceLogic implements BoardService {
    @Override
    public String register(BoardDTO boardDTO) {
        return null;
    }

    @Override
    public BoardDTO find(Long boardId) {
        return null;
    }

    @Override
    public List<BoardDTO> findByTitle(String boardTitle) {
        return null;
    }

    @Override
    public BoardDTO findByClubName(String clubName) {
        return null;
    }

    @Override
    public void modify(BoardDTO boardDTO) {

    }

    @Override
    public void remove(Long boardId) {

    }
}
