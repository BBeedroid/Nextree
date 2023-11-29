package com.example.backend.service;

import com.example.backend.dto.ClubDTO;

public interface ClubService {
    void register(ClubDTO clubDTO, Long memberId);
    ClubDTO find(Long clubId);
    ClubDTO findClubByName(String clubName);
    ClubDTO modify(ClubDTO clubDTO);
    void remove(Long clubId);
}
