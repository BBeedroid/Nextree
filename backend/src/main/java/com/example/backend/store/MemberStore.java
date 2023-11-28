package com.example.backend.store;

import com.example.backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberStore extends JpaRepository<Member, Long> {
}
