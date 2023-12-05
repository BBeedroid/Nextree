import React, { useState, useEffect, ReactElement } from "react";
import {
    Box,
    Container,
    Table,
    StyledTd,
    StyledTr,
    Title,
} from "../../styles/theme";
import NavigateButton from "../Util/NavigateButton";
import { ClubDTO } from "../Util/dtoTypes";
import { fetchAllClubs } from "./clubService/clubservice";

const AllClubList = (): ReactElement => {
    const [clubs, setClubs] = useState<ClubDTO[]>([]);

    useEffect(() => {
        fetchAllClubs().then(setClubs).catch(console.error);
    }, []);

    return (
        <Box>
            <Container height="500px">
                <Title>클럽 목록</Title>
                <Table>
                    <StyledTr>
                        <StyledTd fontSize="1.3rem" fontWeight="bold">
                            클럽 이름
                        </StyledTd>
                        <StyledTd fontSize="1.3rem" fontWeight="bold">
                            클럽 소개
                        </StyledTd>
                    </StyledTr>
                    {clubs.map((club) => (
                        <StyledTr key={club.clubId}>
                            <StyledTd>{club.clubName}</StyledTd>
                            <StyledTd>{club.clubIntro}</StyledTd>
                        </StyledTr>
                    ))}
                </Table>
                <NavigateButton path="/my-club-list" label="내 클럽 목록" />
            </Container>
        </Box>
    );
};

export default AllClubList;
