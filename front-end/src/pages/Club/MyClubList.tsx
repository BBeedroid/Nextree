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
    Button,
    LeftButtonDiv,
    MiddleButtonDiv,
    Overlay,
} from "../../styles/theme";
import NavigateButton from "../Util/NavigateButton";
import { MembershipDTO } from "../Util/dtoTypes";
import { fetchJoinedClubs } from "./utils/clubservice";
import { toggleModal } from "../Util/utilservice";
import CreateClubModal from "./utils/CreateClubModal";
import Pagination from "../Util/Pagination";

const MyClubList = (): ReactElement => {
    const [memberships, setMemberships] = useState<MembershipDTO[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchJoinedClubs(currentPage - 1, 5)
            .then((response) => {
                setMemberships(response.items ?? []);
                setTotalPages(response.paginationInfo?.totalPages ?? 0);
            })
            .catch(console.error);
    }, [currentPage]);

    const handleClubClick = (clubId: number): void => {
        navigate(`/club/${clubId}`);
    };

    const handlePageChange = (pageNumber: number): void => {
        setCurrentPage(pageNumber);
    };

    const refreshClubList = (): void => {
        fetchJoinedClubs(currentPage - 1, 5)
            .then((response) => {
                setMemberships(response.items ?? []);
                setTotalPages(response.paginationInfo?.totalPages ?? 0);
            })
            .catch(console.error);
    };

    return (
        <Box>
            <Container height="500px">
                <Title>내 클럽 목록</Title>
                {memberships.length > 0 ? (
                    <>
                        <Table minHeight="350px">
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
                                    <StyledTd fontSize="1.2rem">
                                        <PointerSpan
                                            onClick={() => {
                                                if (
                                                    membership.clubId !==
                                                    undefined
                                                ) {
                                                    handleClubClick(
                                                        membership.clubId,
                                                    );
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
                        <Pagination
                            paginationInfo={{ totalPages, currentPage }}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <Title fontSize="1.6rem">가입한 클럽이 없습니다.</Title>
                )}
                <LeftButtonDiv>
                    <NavigateButton
                        path="/all-club-list"
                        label="전체 클럽 목록"
                    />
                </LeftButtonDiv>
                <MiddleButtonDiv>
                    <Button onClick={toggleModal(setIsModalOpen)}>
                        클럽 생성
                    </Button>
                </MiddleButtonDiv>

                {isModalOpen && (
                    <>
                        <Overlay onClick={toggleModal(setIsModalOpen)} />
                        <CreateClubModal
                            onClose={toggleModal(setIsModalOpen)}
                            onClubCreate={refreshClubList}
                        />
                    </>
                )}
            </Container>
        </Box>
    );
};

export default MyClubList;
