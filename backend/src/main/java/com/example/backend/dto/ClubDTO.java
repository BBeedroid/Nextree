package com.example.backend.dto;

import com.example.backend.entity.Club;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClubDTO {
    private long clubId;
    private String clubName;
    private String clubIntro;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;

    public Club DTOToEntity() {
        return Club.builder()
                .clubId(this.clubId)
                .clubName(this.clubName)
                .clubIntro(this.clubIntro)
                .build();
    }
}
