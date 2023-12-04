import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { SPRING_API_URL } from "../../config";

const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    padding: 10px 20px;
    width: 500px;
    height: 350px;
    border: 1px solid grey;
    border-radius: 5px;
`;

const Table = styled.table`
    border-collapse: collapse;
    min-width: 510px;
    min-height: 360px;
`;

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
        return response.data.items;
        console.log(response.data.items);
    } catch (error) {
        console.error("멤버십 목록을 불러오는 데 실패했습니다.", error);
        throw error;
    }
};

const ClubList: React.FC = (): JSX.Element => {
    const [memberships, setMemberships] = useState<MembershipDTO[]>([]);

    useEffect(() => {
        fetchJoinedClubs().then(setMemberships).catch(console.error);
    }, []);

    return (
        <Box>
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th>클럽 이름</th>
                            <th>역할</th>
                            <th>가입 시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        {memberships.map((membership) => (
                            <tr key={membership.memberId}>
                                <td>{membership.clubName}</td>
                                <td>{membership.role}</td>
                                <td>{membership.createTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </Box>
    );
};

export default ClubList;
