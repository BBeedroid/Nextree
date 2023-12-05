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
} from "../../styles/theme";
import NavigateButton from "../Util/NavigateButton";
import { BoardDTO } from "../Util/dtoTypes";
import { fetchAllBoards } from "./utils/boardservice";

const AllBoardList = (): ReactElement => {
    const { clubId } = useParams();
    const [boards, setBoards] = useState<BoardDTO[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (clubId) {
            fetchAllBoards(parseInt(clubId, 10))
                .then(setBoards)
                .catch(console.error);
        }
    }, [clubId]);

    const handleClubClick = (boardId: number): void => {
        navigate(`/club/${clubId}/board/${boardId}`);
    };

    return (
        <Box>
            <Container height="500px">
                <Title>게시판 목록</Title>
                <Table>
                    <StyledTr>
                        <StyledTd fontSize="1.3rem" fontWeight="bold">
                            게시판 이름
                        </StyledTd>
                    </StyledTr>
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
                <NavigateButton path="/my-club-list" label="내 클럽 목록" />
            </Container>
        </Box>
    );
};

export default AllBoardList;
