import React, { ReactElement, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostDTO, BoardDTO, MembershipDTO } from "../Util/dtoTypes";
import {
    fetchPostsByBoard,
    fetchBoard,
    fetchMembership,
} from "./utils/boardservice";
import { dateFormat } from "../Util/utilservice";
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
    ThirdButtonDiv,
} from "../../styles/theme";
import NavigateButton from "../Util/NavigateButton";

const Board = (): ReactElement => {
    const { clubId, boardId } = useParams();
    const [posts, setPosts] = useState<PostDTO[]>([]);
    const [board, setBoard] = useState<BoardDTO | undefined>();
    const [membership, setMembership] = useState<MembershipDTO | undefined>();
    const navigate = useNavigate();

    useEffect(() => {
        if (boardId) {
            const boardIdNum = parseInt(boardId, 10);
            fetchPostsByBoard(boardIdNum).then(setPosts).catch(console.error);

            fetchBoard(boardIdNum).then(setBoard).catch(console.error);
        }
    }, [boardId]);

    useEffect(() => {
        if (clubId) {
            const clubIdNum = parseInt(clubId, 10);
            fetchMembership(clubIdNum).then(setMembership).catch(console.error);
        }
    }, [clubId]);

    const handlePostClick = (postId: number): void => {
        navigate(`/club/${clubId}/board/${boardId}/post/${postId}`);
    };

    const clubIdNum = clubId ? parseInt(clubId, 10) : null;

    return (
        <Box>
            <Container width="950px" height="600px">
                <Title>
                    {board
                        ? `"${board.boardTitle}" 게시글 목록`
                        : "게시글 목록"}
                </Title>
                <Table>
                    <StyledTr>
                        <StyledTd
                            fontSize="1.3rem"
                            fontWeight="bold"
                            width="650px"
                        >
                            제목
                        </StyledTd>
                        <StyledTd
                            fontSize="1.3rem"
                            fontWeight="bold"
                            width="100px"
                        >
                            작성자
                        </StyledTd>
                        <StyledTd
                            fontSize="1.3rem"
                            fontWeight="bold"
                            width="100px"
                        >
                            작성일
                        </StyledTd>
                        <StyledTd
                            fontSize="1.3rem"
                            fontWeight="bold"
                            width="100px"
                        >
                            조회수
                        </StyledTd>
                    </StyledTr>
                    {posts.map((post) => (
                        <StyledTr key={post.postId}>
                            <StyledTd fontSize="1.1rem">
                                <PointerSpan
                                    onClick={() => {
                                        if (post.postId !== undefined) {
                                            handlePostClick(post.postId);
                                        }
                                    }}
                                >
                                    {post ? post.postTitle : ""}
                                </PointerSpan>
                            </StyledTd>
                            <StyledTd>
                                {post ? post.memberNickname : ""}
                            </StyledTd>
                            <StyledTd>
                                {post && post.createdTime
                                    ? dateFormat(post.createdTime)
                                    : ""}
                            </StyledTd>
                            <StyledTd>
                                {post ? post.postViewCount : ""}
                            </StyledTd>
                        </StyledTr>
                    ))}
                </Table>
                <LeftButtonDiv>
                    <NavigateButton
                        path={`/club/${clubIdNum}`}
                        label="게시판 목록"
                    />
                </LeftButtonDiv>
                <MiddleButtonDiv>
                    <Button>글쓰기</Button>
                </MiddleButtonDiv>
                {membership?.role === "PRESIDENT" && (
                    <ThirdButtonDiv>
                        <Button>게시판 삭제</Button>
                    </ThirdButtonDiv>
                )}
            </Container>
        </Box>
    );
};

export default Board;
