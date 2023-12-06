import React, { useState, useEffect, ReactElement } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
} from "../../styles/theme";
import NavigateButton from "../Util/NavigateButton";
import { BoardDTO, ClubDTO, MembershipDTO } from "../Util/dtoTypes";
import { fetchAllBoards, fetchClub } from "./utils/boardservice";
import { toggleModal, fetchMembership } from "../Util/utilservice";
import CreateBoardModal from "./utils/CreateBoardModal";

const AllBoardList = (): ReactElement => {
    const { clubId } = useParams();
    const [boards, setBoards] = useState<BoardDTO[]>([]);
    const [club, setClub] = useState<ClubDTO | undefined>();
    const [membership, setMembership] = useState<MembershipDTO | undefined>();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (clubId) {
            const clubIdNum = parseInt(clubId, 10);
            fetchAllBoards(clubIdNum).then(setBoards).catch(console.error);

            fetchClub(clubIdNum).then(setClub).catch(console.error);

            fetchMembership(clubIdNum).then(setMembership).catch(console.error);
        }
    }, [clubId]);

    const handleClubClick = (boardId: number): void => {
        navigate(`/club/${clubId}/board/${boardId}`);
    };

    const refreshBoardList = (): void => {
        if (clubId) {
            const clubIdNum = parseInt(clubId, 10);
            fetchAllBoards(clubIdNum).then(setBoards).catch(console.error);
        }
    };

    return (
        <Box>
            <Container height="500px">
                <Title>{club ? `"${club.clubName}"` : "게시판 목록"}</Title>
                <Table minHeight="350px">
                    {boards.map((board) => (
                        <StyledTr key={board.boardId}>
                            <StyledTd fontSize="1.1rem">
                                <PointerSpan
                                    onClick={() => {
                                        if (board.boardId !== undefined) {
                                            handleClubClick(board.boardId);
                                        }
                                    }}
                                >
                                    {board.boardTitle}
                                </PointerSpan>
                            </StyledTd>
                        </StyledTr>
                    ))}
                </Table>
                <LeftButtonDiv>
                    <NavigateButton path="/my-club-list" label="내 클럽 목록" />
                </LeftButtonDiv>
                <MiddleButtonDiv>
                    <NavigateButton
                        path="/all-club-list"
                        label="전체 클럽 목록"
                    />
                </MiddleButtonDiv>
                {membership?.role === "PRESIDENT" && (
                    <RightButtonDiv>
                        <Button onClick={toggleModal(setIsModalOpen)}>
                            게시판 생성
                        </Button>
                    </RightButtonDiv>
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
