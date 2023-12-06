package com.example.backend.store;

import com.example.backend.entity.Membership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MembershipStore extends JpaRepository<Membership, Long> {
    Membership findByClub_ClubIdAndMember_MemberId(Long clubId, Long memberId);

    @Modifying
    @Query("DELETE FROM Membership m WHERE m.club.clubId = :clubId AND m.member.memberId = :memberId")
    void deleteByClub_IdAndMember_Id(@Param("clubId") Long clubId, @Param("memberId") Long memberId);

    @Modifying
    @Query("DELETE FROM Membership m WHERE m.club.clubId = :clubId AND m.membershipId = :membershipId")
    void deleteByCLub_ClubIdAndMembershipId(@Param("clubId") Long clubId, @Param("membershipId") Long membershipId);
}
