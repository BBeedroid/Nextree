package com.example.backend.entity;

import com.example.backend.dto.MemberDTO;
import com.example.backend.util.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "MEMBER")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "MEMBER_ID", nullable = false)
    private long memberId;

    @Column(name = "MEMBER_EMAIL", nullable = false)
    private String memberEmail;

    @Column(name = "MEMBER_PASSWORD", nullable = false)
    private String memberPassword;

    @Column(name = "MEMBER_NICKNAME", nullable = false)
    private String memberNickname;

    @Column(name = "MEMBER_TEL")
    private String memberTel;

    @Column(name = "MEMBER_BIRTH_DATE")
    private String memberBirthDate;

    @Column(name = "MEMBER_ADDR1")
    private String memberAddr1;

    @Column(name = "MEMBER_ADDR2")
    private String memberAddr2;

    @Column(name = "MEMBER_ADDR3")
    private String memberAddr3;

    @OneToMany(mappedBy = "member")
    private List<Membership> memberships = new ArrayList<>();

    public MemberDTO EntityToDTO() {
        return MemberDTO.builder()
                .memberId(this.memberId)
                .memberEmail(this.memberEmail)
                .memberPassword(this.memberPassword)
                .memberNickname(this.memberNickname)
                .memberTel(this.memberTel)
                .memberBirthDate(this.memberBirthDate)
                .memberAddr1(this.memberAddr1)
                .memberAddr2(this.memberAddr2)
                .memberAddr3(this.memberAddr3)
                .createdTime(this.getCreatedTime())
                .updatedTime(this.getUpdatedTime())
                .build();
    }
}
