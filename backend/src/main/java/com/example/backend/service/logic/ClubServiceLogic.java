package com.example.backend.service.logic;

import com.example.backend.dto.ClubDTO;
import com.example.backend.entity.Club;
import com.example.backend.entity.Member;
import com.example.backend.entity.Membership;
import com.example.backend.entity.Role;
import com.example.backend.service.ClubService;
import com.example.backend.store.ClubStore;
import com.example.backend.store.MemberStore;
import com.example.backend.store.MembershipStore;
import com.example.backend.util.ClubDuplicationException;
import com.example.backend.util.NoSuchClubException;
import com.example.backend.util.NoSuchMemberException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ClubServiceLogic implements ClubService {
    private final ClubStore clubStore;
    private final MemberStore memberStore;
    private final MembershipStore membershipStore;

    @Override
    @Transactional
    public void register(ClubDTO clubDTO, Long memberId) {
        Optional.ofNullable(clubStore.findByClubName(clubDTO.getClubName()))
                .ifPresent(dto -> {throw new ClubDuplicationException("Club already exists with name : " + clubDTO.getClubName());});
        Club club = clubDTO.DTOToEntity();
        Club savedClub = clubStore.save(club);

        Member member = memberStore.findById(memberId)
                .orElseThrow(() -> new NoSuchMemberException("No such member with id: " + memberId));
        Membership membership = new Membership();
        membership.setMember(member);
        membership.setClub(savedClub);
        membership.setRole(Role.PRESIDENT);
        member.getMemberships().add(membership);
        membershipStore.save(membership);
    }

    @Override
    public ClubDTO find(Long clubId) {
        return clubStore.findById(clubId)
                .map(club -> new ClubDTO(club))
                .orElseThrow(() -> new NoSuchClubException("No such club with id : " + clubId));
    }

    @Override
    public ClubDTO findClubByName(String clubName) {
        return Optional.ofNullable(clubStore.findByClubName(clubName))
                .map(club -> new ClubDTO(club))
                .orElseThrow(() -> new NoSuchClubException("No such club with name : " + clubName));
    }

    @Override
    @Transactional
    public ClubDTO modify(ClubDTO clubDTO) {
        return null;
    }

    @Override
    @Transactional
    public void remove(Long clubId) {

    }
}
