package com.example.backend.dto;

import com.example.backend.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDTO {
    private long memberId;

    private String memberEmail;

    private String memberPassword;

    private String memberNickname;

    private String memberTel;

    private String memberBirthDate;

    private String memberAddr1;

    private String memberAddr2;

    private String memberAddr3;

    private LocalDateTime createdTime;

    private LocalDateTime updatedTime;

    public Member DTOToEntity() {
        return Member.builder()
                .memberId(this.memberId)
                .memberEmail(this.memberEmail)
                .memberPassword(this.memberPassword)
                .memberNickname(this.memberNickname)
                .memberTel(this.memberTel)
                .memberBirthDate(this.memberBirthDate)
                .memberAddr1(this.memberAddr1)
                .memberAddr2(this.memberAddr2)
                .memberAddr3(this.memberAddr3)
                .build();
    }
}
