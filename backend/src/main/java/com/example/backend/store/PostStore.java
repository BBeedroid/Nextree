package com.example.backend.store;

import com.example.backend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostStore extends JpaRepository<Post, Long> {
}
