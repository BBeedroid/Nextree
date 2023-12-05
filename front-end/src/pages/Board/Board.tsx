import React, { ReactElement, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostDTO } from "../Util/dtoTypes";
import { fetchPostsByBoard } from "./utils/boardservice";
import { dateFormat } from "../Util/utilservice";
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

const Board = (): ReactElement => {
    const { clubId, boardId } = useParams();
    const [posts, setPosts] = useState<PostDTO[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (boardId) {
            fetchPostsByBoard(parseInt(boardId, 10))
                .then(setPosts)
                .catch(console.error);
        }
    }, [boardId]);

    const handlePostClick = (postId: number): void => {
        navigate(`/club/${clubId}/board/${boardId}/post/${postId}`);
    };

    const clubIdNum = clubId ? parseInt(clubId, 10) : null;

    return (
        <Box>
            <Container width="950px" height="600px">
                <Title>게시글 목록</Title>
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
                <NavigateButton
                    path={`/club/${clubIdNum}`}
                    label="게시판 목록"
                />
            </Container>
        </Box>
    );
};

export default Board;
