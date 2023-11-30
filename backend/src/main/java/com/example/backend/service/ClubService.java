package com.example.backend.service;

import com.example.backend.dto.ClubDTO;

public interface ClubService {
    void register(Long memberId, ClubDTO clubDTO);
    ClubDTO findClubById(Long clubId);
    ClubDTO findClubByName(String clubName);
    ClubDTO modify(Long clubId, ClubDTO clubDTO);
    void remove(Long clubId);
}
