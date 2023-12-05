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
import { MembershipDTO } from "../Util/dtoTypes";
import { fetchJoinedClubs } from "./clubService/clubservice";

const MyClubList = (): ReactElement => {
    const [memberships, setMemberships] = useState<MembershipDTO[]>([]);

    useEffect(() => {
        fetchJoinedClubs().then(setMemberships).catch(console.error);
    }, []);

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
                            <StyledTd>{membership.clubName}</StyledTd>
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
