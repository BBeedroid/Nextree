package com.example.backend.service;

import com.example.backend.dto.MembershipDTO;

import java.nio.file.AccessDeniedException;
import java.util.List;

public interface MembershipService {
    void addMembership(Long clubId, Long memberId, MembershipDTO membershipDTO);
    MembershipDTO findMembership(Long clubId, Long memberId);
    List<MembershipDTO> findAllMembershipsByClub(Long clubId);
    List<MembershipDTO> findAllMembershipsByMember(Long currentUserId);
    MembershipDTO modify(Long clubId, Long memberId, MembershipDTO membershipDTO);
    void remove(Long clubId, Long currentUserId);
}
