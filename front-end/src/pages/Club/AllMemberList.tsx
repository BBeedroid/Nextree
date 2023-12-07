import React, { useState, useEffect, ReactElement } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SPRING_API_URL } from "../../config";
import {
    Box,
    Container,
    Table,
    StyledTd,
    StyledTr,
    Title,
    PointerSpan,
    LeftButtonDiv,
} from "../../styles/theme";
import NavigateButton from "../Util/NavigateButton";
import { MembershipDTO, ClubDTO } from "../Util/dtoTypes";
import { fetchAllMembers } from "./utils/clubservice";
import { fetchClub } from "../Board/utils/boardservice";
import Pagination from "../Util/Pagination";

const AllMemberList = (): ReactElement => {
    const { clubId } = useParams();
    const [memberships, setMemberships] = useState<MembershipDTO[]>([]);
    const [club, setClub] = useState<ClubDTO | undefined>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        if (clubId) {
            const clubIdNum = parseInt(clubId, 10);

            fetchAllMembers(clubIdNum, currentPage - 1, 5)
                .then((response) => {
                    setMemberships(response.items ?? []);
                    setTotalPages(response.paginationInfo?.totalPages ?? 0);
                })
                .catch(console.error);

            fetchClub(clubIdNum).then(setClub).catch(console.error);
        }
    }, [clubId, currentPage]);

    const handlePageChange = (pageNumber: number): void => {
        setCurrentPage(pageNumber);
    };

    const refreshMemberList = (): void => {
        if (clubId) {
            const clubIdNum = parseInt(clubId, 10);

            fetchAllMembers(clubIdNum, currentPage - 1, 5)
                .then((response) => {
                    setMemberships(response.items ?? []);
                    setTotalPages(response.paginationInfo?.totalPages ?? 0);
                })
                .catch(console.error);
        }
    };

    const handleDeleteMember = async (membershipId: number): Promise<void> => {
        const confirmDelete = window.confirm("정말로 클럽에서 추방하겠습니까?");

        if (confirmDelete) {
            try {
                const response = await axios.delete(
                    `${SPRING_API_URL}/api/membership/delete`,
                    {
                        params: {
                            membershipId,
                        },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token",
                            )}`,
                        },
                    },
                );
                console.log("Deleted member: ", response.data);
                alert("성공적으로 클럽에서 추방했습니다.");
                refreshMemberList();
            } catch (error) {
                console.error("An error occurred", error);
                alert("회원 추방에 실패했습니다.");
            }
        }
    };

    return (
        <Box>
            <Container height="500px">
                <Title>{club ? `"${club.clubName}" 회원` : "회원 목록"}</Title>
                {memberships.length > 0 ? (
                    <>
                        <Table minHeight="350px">
                            {memberships.map((membership) => {
                                console.log(membership); // Logging the entire membership object

                                // Now explicitly returning the JSX
                                return (
                                    <StyledTr key={membership.membershipId}>
                                        {membership.role !== "PRESIDENT" ? (
                                            <StyledTd fontSize="1.2rem">
                                                <PointerSpan
                                                    onClick={() => {
                                                        console.log(
                                                            membership.membershipId,
                                                        ); // Logging the membershipId
                                                        if (
                                                            membership.membershipId !==
                                                            undefined
                                                        ) {
                                                            handleDeleteMember(
                                                                membership.membershipId,
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {membership.memberNickname}
                                                </PointerSpan>
                                            </StyledTd>
                                        ) : (
                                            <StyledTd fontSize="1.1rem">
                                                {membership.memberNickname}
                                            </StyledTd>
                                        )}
                                        <StyledTd>{membership.role}</StyledTd>
                                    </StyledTr>
                                );
                            })}
                        </Table>
                        <Pagination
                            paginationInfo={{ totalPages, currentPage }}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <Title fontSize="1.6rem">회원이 없습니다.</Title>
                )}
                <LeftButtonDiv>
                    <NavigateButton
                        path={`/club/${clubId}`}
                        label="게시판 목록"
                    />
                </LeftButtonDiv>
            </Container>
        </Box>
    );
};

export default AllMemberList;
