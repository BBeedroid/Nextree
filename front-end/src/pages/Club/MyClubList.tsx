import React, { useState, useEffect, ReactElement } from "react";
import axios from "axios";
import { SPRING_API_URL } from "../../config";
import {
    Box,
    Container,
    Table,
    StyledTd,
    StyledTr,
    Title,
} from "../../styles/theme";
import NavigateButton from "../Util/NavigateButton";

interface MembershipDTO {
    role: string;
    createTime: string;
    memberId: number;
    clubName: string;
}

interface ResponseDTO<T> {
    items: T[];
    errorMessage: string;
    statusCode: number;
}

const fetchJoinedClubs = async (): Promise<MembershipDTO[]> => {
    try {
        const response = await axios.get<ResponseDTO<MembershipDTO>>(
            `${SPRING_API_URL}/api/membership/member`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );
        console.log(response.data.items);
        return response.data.items;
    } catch (error) {
        console.error("멤버십 목록을 불러오는 데 실패했습니다.", error);
        throw error;
    }
};

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
