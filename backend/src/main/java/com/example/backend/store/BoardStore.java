package com.example.backend.store;

import com.example.backend.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardStore extends JpaRepository<Board, Long> {
}
