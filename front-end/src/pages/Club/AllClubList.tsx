import React, { useState, useEffect, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Container,
    Table,
    StyledTd,
    StyledTr,
    Title,
    PointerSpan,
} from "../../styles/theme";
import NavigateButton from "../Util/NavigateButton";
import { ClubDTO } from "../Util/dtoTypes";
import { fetchAllClubs, fetchMembership } from "./utils/clubservice";

const AllClubList = (): ReactElement => {
    const [clubs, setClubs] = useState<ClubDTO[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllClubs().then(setClubs).catch(console.error);
    }, []);

    const handleClubClick = async (clubId: number): Promise<void> => {
        const membership = await fetchMembership(clubId);
        if (!membership) {
            alert("가입하시겠습니까?");
        } else {
            navigate(`/club/${clubId}`);
        }
    };

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
                            <StyledTd fontSize="1.1rem">
                                <PointerSpan
                                    onClick={() => {
                                        if (club.clubId !== undefined) {
                                            handleClubClick(club.clubId);
                                        }
                                    }}
                                >
                                    {club.clubName}
                                </PointerSpan>
                            </StyledTd>
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
