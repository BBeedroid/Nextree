package com.example.backend.store;

import com.example.backend.entity.Club;
import com.example.backend.entity.Member;
import com.example.backend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostStore extends JpaRepository<Post, Long> {
    List<Post> findByBoard_BoardIdAndPostTitle(Long boardId, String postTitle);
    List<Post> findByBoard_BoardId(Long boardId);
    List<Post> findByBoard_ClubAndMember(Club club, Member member);
}
