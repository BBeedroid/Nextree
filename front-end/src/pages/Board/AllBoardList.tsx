import React, { useState, useEffect, ReactElement } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
    MiddleButtonDiv,
    RightButtonDiv,
    Overlay,
    Button,
    ButtonsDiv,
} from "../../styles/theme";
import NavigateButton from "../Util/NavigateButton";
import { BoardDTO, ClubDTO, MembershipDTO } from "../Util/dtoTypes";
import { fetchAllBoards, fetchClub } from "./utils/boardservice";
import { toggleModal, fetchMembership } from "../Util/utilservice";
import CreateBoardModal from "./utils/CreateBoardModal";
import Pagination from "../Util/Pagination";

const AllBoardList = (): ReactElement => {
    const { clubId } = useParams();
    const [boards, setBoards] = useState<BoardDTO[]>([]);
    const [club, setClub] = useState<ClubDTO | undefined>();
    const [membership, setMembership] = useState<MembershipDTO | undefined>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (clubId) {
            const clubIdNum = parseInt(clubId, 10);
            fetchAllBoards(clubIdNum, currentPage - 1, 5)
                .then((response) => {
                    setBoards(response.items ?? []);
                    setTotalPages(response.paginationInfo?.totalPages ?? 0);
                })
                .catch(console.error);

            fetchClub(clubIdNum).then(setClub).catch(console.error);

            fetchMembership(clubIdNum).then(setMembership).catch(console.error);
        }
    }, [clubId, currentPage]);

    const handleClubClick = (boardId: number): void => {
        navigate(`/club/${clubId}/board/${boardId}`);
    };

    const handleDeleteClick = async (deleteClubId: number): Promise<void> => {
        const confirmDelete = window.confirm("정말로 클럽을 삭제하겠습니까?");

        if (confirmDelete) {
            try {
                const response = await axios.delete(
                    `${SPRING_API_URL}/api/club/${deleteClubId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token",
                            )}`,
                        },
                    },
                );
                console.log("Deleted club: ", response.data);
                alert("성공적으로 클럽을 삭제했습니다.");
                navigate("/my-club-list");
            } catch (error) {
                console.error("An error occurred", error);
                alert("클럽 삭제에 실패했습니다.");
            }
        }
    };

    const handleLeaveClick = async (leaveClubId: number): Promise<void> => {
        const confirmLeave = window.confirm("정말로 클럽에서 탈퇴하겠습니까?");

        if (confirmLeave) {
            try {
                const response = await axios.delete(
                    `${SPRING_API_URL}/api/membership`,
                    {
                        params: {
                            clubId: leaveClubId,
                        },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token",
                            )}`,
                        },
                    },
                );
                console.log("Leaved club: ", response.data);
                alert("성공적으로 클럽에서 탈퇴했습니다.");
                navigate("/my-club-list");
            } catch (error) {
                console.error("An error occurred", error);
                alert("클럽 탈퇴에 실패했습니다.");
            }
        }
    };

    const handlePageChange = (pageNumber: number): void => {
        setCurrentPage(pageNumber);
    };

    const refreshBoardList = (): void => {
        if (clubId) {
            const clubIdNum = parseInt(clubId, 10);
            fetchAllBoards(clubIdNum, currentPage - 1, 5)
                .then((response) => {
                    setBoards(response.items ?? []);
                    setTotalPages(response.paginationInfo?.totalPages ?? 0);
                })
                .catch(console.error);
        }
    };

    return (
        <Box>
            <Container height="500px">
                <Title>{club ? `"${club.clubName}"` : "게시판 목록"}</Title>
                {boards.length > 0 ? (
                    <>
                        <Table minHeight="350px">
                            {boards.map((board) => (
                                <StyledTr key={board.boardId}>
                                    <StyledTd fontSize="1.1rem">
                                        <PointerSpan
                                            onClick={() => {
                                                if (
                                                    board.boardId !== undefined
                                                ) {
                                                    handleClubClick(
                                                        board.boardId,
                                                    );
                                                }
                                            }}
                                        >
                                            {board.boardTitle}
                                        </PointerSpan>
                                    </StyledTd>
                                </StyledTr>
                            ))}
                        </Table>
                        <Pagination
                            paginationInfo={{ totalPages, currentPage }}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <Title fontSize="1.6rem">게시판이 없습니다.</Title>
                )}
                <LeftButtonDiv>
                    <NavigateButton path="/my-club-list" label="내 클럽 목록" />
                </LeftButtonDiv>
                <MiddleButtonDiv>
                    <NavigateButton
                        path="/all-club-list"
                        label="전체 클럽 목록"
                    />
                </MiddleButtonDiv>
                {membership?.role === "PRESIDENT" ? (
                    <RightButtonDiv>
                        <Button onClick={toggleModal(setIsModalOpen)}>
                            게시판 생성
                        </Button>
                        <ButtonsDiv>
                            <Button
                                margin="5px 0"
                                width="80px"
                                height="25px"
                                fontSize="0.8rem"
                                onClick={() => {
                                    if (clubId) {
                                        navigate(`/club/${clubId}/member`);
                                    } else {
                                        console.log("clubId is undefined");
                                    }
                                }}
                            >
                                멤버 목록
                            </Button>
                            <Button
                                margin="5px 0"
                                width="80px"
                                height="25px"
                                background="#FFBE0A"
                                fontSize="0.8rem"
                                onClick={() => {
                                    if (clubId) {
                                        handleDeleteClick(parseInt(clubId, 10));
                                    } else {
                                        console.log("clubId is undefined");
                                    }
                                }}
                            >
                                클럽 삭제
                            </Button>
                        </ButtonsDiv>
                    </RightButtonDiv>
                ) : (
                    <Button
                        margin="5px 0 5px 80px"
                        width="80px"
                        height="25px"
                        background="#FFBE0A"
                        fontSize="0.8rem"
                        onClick={() => {
                            if (clubId) {
                                handleLeaveClick(parseInt(clubId, 10));
                            } else {
                                console.log("clubId is undefined");
                            }
                        }}
                    >
                        클럽 탈퇴
                    </Button>
                )}

                {isModalOpen && (
                    <>
                        <Overlay onClick={toggleModal(setIsModalOpen)} />
                        <CreateBoardModal
                            onClose={toggleModal(setIsModalOpen)}
                            onBoardCreate={refreshBoardList}
                        />
                    </>
                )}
            </Container>
        </Box>
    );
};

export default AllBoardList;
