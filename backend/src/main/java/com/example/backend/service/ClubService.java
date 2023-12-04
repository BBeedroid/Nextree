package com.example.backend.service;

import com.example.backend.dto.ClubDTO;

import java.util.List;

public interface ClubService {
    void register(Long memberId, ClubDTO clubDTO);
    ClubDTO findClubById(Long clubId);
    ClubDTO findClubByName(String clubName);
    List<ClubDTO> findAllClubs();
    ClubDTO modify(Long clubId, ClubDTO clubDTO, Long currentUserId);
    void remove(Long clubId, Long currentUserId);
}
