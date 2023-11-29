package com.example.backend.service;

import com.example.backend.dto.ClubDTO;

public interface ClubService {
    void register(ClubDTO clubDTO, Long memberId);
    ClubDTO findClubById(Long clubId);
    ClubDTO findClubByName(String clubName);
    ClubDTO modify(Long clubId, ClubDTO clubDTO);
    void remove(Long clubId);
}
