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
import { MembershipDTO } from "../Util/dtoTypes";
import { fetchJoinedClubs } from "./utils/clubservice";

const MyClubList = (): ReactElement => {
    const [memberships, setMemberships] = useState<MembershipDTO[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchJoinedClubs().then(setMemberships).catch(console.error);
    }, []);

    const handleClubClick = (clubId: number): void => {
        navigate(`/club/${clubId}`);
    };

    return (
        <Box>
            <Container height="500px">
                <Title>내 클럽 목록</Title>
                <Table>
                    <StyledTr>
                        <StyledTd fontSize="1.3rem" fontWeight="bold">
                            클럽 이름
                        </StyledTd>
                        <StyledTd fontSize="1.3rem" fontWeight="bold">
                            역할
                        </StyledTd>
                    </StyledTr>
                    {memberships.map((membership) => (
                        <StyledTr key={membership.memberId}>
                            <StyledTd fontSize="1.1rem">
                                <PointerSpan
                                    onClick={() => {
                                        if (membership.clubId !== undefined) {
                                            handleClubClick(membership.clubId);
                                        }
                                    }}
                                >
                                    {membership.clubName}
                                </PointerSpan>
                            </StyledTd>
                            <StyledTd>{membership.role}</StyledTd>
                        </StyledTr>
                    ))}
                </Table>
                <NavigateButton path="/all-club-list" label="전체 클럽 목록" />
            </Container>
        </Box>
    );
};

export default MyClubList;
