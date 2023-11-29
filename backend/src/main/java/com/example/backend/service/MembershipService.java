package com.example.backend.service;

import com.example.backend.dto.MembershipDTO;

import java.util.List;

public interface MembershipService {
    void addMembership(MembershipDTO membershipDTO);
    MembershipDTO findMembership(Long clubId, Long memberId);
    List<MembershipDTO> findAllMembershipsByClub(Long clubId);
    List<MembershipDTO> findAllMembershipsByMember(Long memberId);
    void modify(MembershipDTO membershipDTO);
    void remove(Long clubId, Long memberId);
}
