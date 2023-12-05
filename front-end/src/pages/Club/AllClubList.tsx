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

interface ClubDTO {
    clubId: number;
    clubName: string;
    clubIntro: string;
}

interface ResponseDTO<T> {
    items: T[];
    errorMessage: string;
    statusCode: number;
}

const fetchAllClubs = async (): Promise<ClubDTO[]> => {
    try {
        const response = await axios.get<ResponseDTO<ClubDTO>>(
            `${SPRING_API_URL}/api/club/list`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );
        console.log(response.data.items);
        return response.data.items;
    } catch (error) {
        console.error("클럽 목록을 불러오는 데 실패했습니다.", error);
        throw error;
    }
};

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
                <NavigateButton path="/" label="내 클럽 목록" />
            </Container>
        </Box>
    );
};

export default AllClubList;
