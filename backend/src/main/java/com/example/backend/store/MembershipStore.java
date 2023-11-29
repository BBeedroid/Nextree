package com.example.backend.store;

import com.example.backend.entity.Membership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MembershipStore extends JpaRepository<Membership, Long> {
}
