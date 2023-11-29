package com.example.backend.dto;

import com.example.backend.entity.Club;
import com.example.backend.entity.Member;
import com.example.backend.entity.Membership;
import com.example.backend.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MembershipDTO {
    private long membershipId;

    private String role;

    private LocalDateTime createdTime;

    private LocalDateTime updatedTime;

    private long memberId;

    private long clubId;

    public MembershipDTO(Membership membership) {
        this.role = membership.getRole().toString();
        this.memberId = membership.getMember().getMemberId();
        this.clubId = membership.getClub().getClubId();
        this.createdTime = membership.getCreatedTime();
    }

    public Membership DTOToEntity() {
        return Membership.builder()
                .membershipId(this.membershipId)
                .role(Role.valueOf(this.role))
                .member(Member.builder()
                        .memberId(this.memberId)
                        .build())
                .club(Club.builder()
                        .clubId(this.clubId)
                        .build())
                .build();
    }
}
