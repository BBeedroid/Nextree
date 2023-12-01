package com.example.backend.store;

import com.example.backend.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardStore extends JpaRepository<Board, Long> {
    Board findByClub_ClubIdAndBoardTitle(Long clubId, String boardTitle);

    List<Board> findByClub_ClubId(Long clubId);
}
