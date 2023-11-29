package com.example.backend.store;

import com.example.backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberStore extends JpaRepository<Member, Long> {
    Member findByMemberEmail(String memberEmail);

    List<Member> findMembersByMemberNickname(String memberNickname);
}
