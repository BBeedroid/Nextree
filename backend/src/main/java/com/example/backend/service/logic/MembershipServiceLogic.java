package com.example.backend.service.logic;

import com.example.backend.dto.MembershipDTO;
import com.example.backend.entity.Club;
import com.example.backend.entity.Member;
import com.example.backend.entity.Membership;
import com.example.backend.entity.Role;
import com.example.backend.service.MembershipService;
import com.example.backend.store.MemberStore;
import com.example.backend.store.MembershipStore;
import com.example.backend.store.ClubStore;
import com.example.backend.util.*;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;
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
    public void addMembership(Long clubId, Long memberId, MembershipDTO membershipDTO) {
        Club club = clubStore.findById(clubId)
                .orElseThrow(() -> new NoSuchClubException("No such club with id : " + clubId));
        Member member = memberStore.findById(memberId)
                .orElseThrow(() -> new NoSuchMemberException("No such member with id : " + memberId));

        for (Membership membership : club.getMemberships()) {
            if (memberId == membership.getMember().getMemberId()) {
                throw new MemberDuplicationException("Member already exists in the club : " + memberId);
            }
        }

        Membership membership = new Membership();
        membership.setClub(club);
        membership.setMember(member);
        membership.setRole(Role.MEMBER);

        club.getMemberships().add(membership);
        member.getMemberships().add(membership);

        clubStore.save(club);
        memberStore.save(member);
    }

    @Override
    public MembershipDTO findMembership(Long clubId, Long memberId) {
        return Optional.ofNullable(membershipStore.findByClubClubIdAndMemberMemberId(clubId, memberId))
                .map(membership -> new MembershipDTO(membership))
                .orElseThrow(() -> new NoSuchMembershipException(
                        String.format("No such membership with clubId : [%s] memberId : [%s]", clubId, memberId)));
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
    public MembershipDTO modify(Long clubId, Long memberId, MembershipDTO membershipDTO) {
        clubStore.findById(clubId)
                .orElseThrow(() -> new NoSuchClubException("No such club with id : " + clubId));
        memberStore.findById(memberId)
                .orElseThrow(() -> new NoSuchMemberException("No such member with id : " + memberId));

        Membership targetMembership = Optional.ofNullable(membershipStore.findByClubClubIdAndMemberMemberId(clubId, memberId))
                        .orElseThrow(() -> new NoSuchMembershipException(
                                String.format("No such membership with clubId : [%s] memberId : [%s]", clubId, memberId)));

        targetMembership.setRole(Role.valueOf(membershipDTO.getRole()));

        return new MembershipDTO(targetMembership);
    }

    @Override
    @Transactional
    public void remove(Long clubId, Long membershipId, Long currentUserId) {
        Club foundclub = clubStore.findById(clubId)
                .orElseThrow(() -> new NoSuchClubException("No such club with id : " + clubId));
        Membership foundMembership = membershipStore.findById(membershipId)
                .orElseThrow(() -> new NoSuchMembershipException("No such membership with id : " + membershipId));
        Role currentUserRole = getCurrentUserRoleInClub(clubId, currentUserId);

        if (foundMembership.getClub().getClubId() != clubId) {
            throw new NoSuchMembershipException(String.format("membership with id [%s] does not belong to club with id [%s]", membershipId, clubId));
        }

        if (currentUserRole == Role.PRESIDENT || foundMembership.getMember().getMemberId() == currentUserId) {
            membershipStore.delete(foundMembership);
        } else {
            throw new NoPermissionToRemoveMembershipException("Do not have permission to delete this membership.");
        }
    }

    private Role getCurrentUserRoleInClub(Long clubId, Long currentUserId) {
        Club club = clubStore.findById(clubId)
                .orElseThrow(() -> new NoSuchClubException("No such club with id : " + clubId));

        return club.getMemberships().stream()
                .filter(membership -> membership.getMember().getMemberId() == currentUserId)
                .findFirst()
                .map(Membership::getRole)
                .orElseThrow(() -> new NotInClubException("Current User is not in this club."));
    }
}
