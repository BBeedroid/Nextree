package com.example.backend.service.logic;

import com.example.backend.dto.MembershipDTO;
import com.example.backend.entity.Club;
import com.example.backend.entity.Member;
import com.example.backend.entity.Membership;
import com.example.backend.service.MembershipService;
import com.example.backend.store.MemberStore;
import com.example.backend.store.MembershipStore;
import com.example.backend.store.ClubStore;
import com.example.backend.util.MemberDuplicationException;
import com.example.backend.util.NoSuchClubException;
import com.example.backend.util.NoSuchMemberException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MembershipServiceLogic implements MembershipService {
    private final MembershipStore membershipStore;
    private final MemberStore memberStore;
    private final ClubStore clubStore;

    @Override
    @Transactional
    public void addMembership(MembershipDTO membershipDTO) {
        Member member = memberStore.findById(membershipDTO.getMemberId())
                .orElseThrow(() -> new NoSuchMemberException("No such member with id : " + membershipDTO.getMemberId()));
        Club club = clubStore.findById(membershipDTO.getClubId())
                .orElseThrow(() -> new NoSuchClubException("No such club with id : " + membershipDTO.getClubId()));

        for (Membership membership : club.getMemberships()) {
            if (member.getMemberId() == membership.getMember().getMemberId()) {
                throw new MemberDuplicationException("Member already exists in the club --> " + member.getMemberId());
            }
        }

        Membership membership = membershipDTO.DTOToEntity();
        club.getMemberships().add(membership);
        clubStore.save(club);
        member.getMemberships().add(membership);
        memberStore.save(member);
    }

    @Override
    public MembershipDTO findMembership(Long clubId, Long memberId) {
        return null;
    }

    @Override
    public List<MembershipDTO> findAllMembershipsByClub(Long clubId) {
        Club club = clubStore.findById(clubId)
                .orElseThrow(() -> new NoSuchClubException("No such club with id : " + clubId));

        return club.getMemberships().stream()
                .map(membership -> new MembershipDTO(membership))
                .collect(Collectors.toList());
    }

    @Override
    public List<MembershipDTO> findAllMembershipsByMember(Long memberId) {
        Member member = memberStore.findById(memberId)
                .orElseThrow(() -> new NoSuchMemberException("No such member with id : " + memberId));

        return member.getMemberships().stream()
                .map(membership -> new MembershipDTO(membership))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void modify(MembershipDTO membershipDTO) {

    }

    @Override
    @Transactional
    public void remove(Long clubId, Long memberId) {
        Club foundClub = clubStore.findById(clubId)
                .orElseThrow(() -> new NoSuchClubException("No such club with id : " + clubId));
        Member foundMember = memberStore.findById(memberId)
                .orElseThrow(() -> new NoSuchMemberException("No such member with id : " + memberId));
        Membership membership = getMembershipIn(foundClub, memberId);

        foundClub.getMemberships().remove(membership);
        clubStore.save(foundClub);
        foundMember.getMemberships().remove(membership);
        memberStore.save(foundMember);
    }

    private Membership getMembershipIn(Club club, Long memberId) {
        for (Membership membership : club.getMemberships()) {
            if (memberId == membership.getMember().getMemberId()) {
                return membership;
            }
        }

        String message = String.format("No such member [id: $s] in club [name: %s]", memberId, club.getClubName());
        throw new NoSuchMemberException(message);
    }
}
