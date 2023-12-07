import React, { useState, useEffect, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
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
    Button,
    LeftButtonDiv,
    MiddleButtonDiv,
    Overlay,
} from "../../styles/theme";
import NavigateButton from "../Util/NavigateButton";
import { ClubDTO, MembershipDTO } from "../Util/dtoTypes";
import { fetchAllClubs, fetchMembership } from "./utils/clubservice";
import { toggleModal, fetchLoginUser } from "../Util/utilservice";
import CreateClubModal from "./utils/CreateClubModal";
import Pagination from "../Util/Pagination";

const AllClubList = (): ReactElement => {
    const [clubs, setClubs] = useState<ClubDTO[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchAllClubs(currentPage - 1, 5)
            .then((response) => {
                setClubs(response.items ?? []);
                setTotalPages(response.paginationInfo?.totalPages ?? 0);
            })
            .catch(console.error);
    }, [currentPage]);

    const handleClubClick = async (certainClubId: number): Promise<void> => {
        const loginUser = await fetchLoginUser();
        if (!loginUser) {
            console.error("Failed fetching login user data");
            return;
        }
        const currentUserId = loginUser.memberId;

        const existingMembership = await fetchMembership(certainClubId);

        if (!existingMembership) {
            const confirmJoin = window.confirm("가입하시겠습니까?");

            if (confirmJoin) {
                try {
                    const response = await axios.post<MembershipDTO>(
                        `${SPRING_API_URL}/api/membership`,
                        { memberId: currentUserId },
                        {
                            params: { clubId: certainClubId },
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                    "token",
                                )}`,
                            },
                        },
                    );
                    console.log(response.data);
                    alert("성공적으로 클럽에 가입했습니다.");
                    navigate(`/club/${certainClubId}`);
                } catch (error) {
                    console.error("An error occurred", error);
                    alert("클럽 가입에 실패했습니다.");
                }
            }
        } else {
            navigate(`/club/${certainClubId}`);
        }
    };

    const handlePageChange = (pageNumber: number): void => {
        setCurrentPage(pageNumber);
    };

    const refreshClubList = (): void => {
        fetchAllClubs(currentPage - 1, 5)
            .then((response) => {
                setClubs(response.items ?? []);
                setTotalPages(response.paginationInfo?.totalPages ?? 0);
            })
            .catch(console.error);
    };

    return (
        <Box>
            <Container height="500px">
                <Title>클럽 목록</Title>
                {clubs.length > 0 ? (
                    <>
                        <Table minHeight="350px">
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
                                    <StyledTd fontSize="1.2rem">
                                        <PointerSpan
                                            onClick={() => {
                                                if (club.clubId !== undefined) {
                                                    handleClubClick(
                                                        club.clubId,
                                                    );
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
                        <Pagination
                            paginationInfo={{ totalPages, currentPage }}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <Title fontSize="1.6rem">클럽이 없습니다.</Title>
                )}
                <LeftButtonDiv>
                    <NavigateButton path="/my-club-list" label="내 클럽 목록" />
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

export default AllClubList;
