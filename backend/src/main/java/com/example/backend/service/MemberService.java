package com.example.backend.service;

import com.example.backend.dto.MemberDTO;
import com.example.backend.dto.MembershipDTO;
import com.example.backend.util.InvalidEmailException;

import java.util.List;

public interface MemberService {
    void register(MemberDTO memberDTO) throws InvalidEmailException;
    MemberDTO find(String memberEmail);
    List<MemberDTO> findByNickname(String memberNickname);
    MemberDTO modify(MemberDTO memberDTO) throws InvalidEmailException;
    void remove(Long memberId);
}
