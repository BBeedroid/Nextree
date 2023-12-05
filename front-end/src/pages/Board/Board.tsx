import React, { ReactElement, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostDTO } from "../Util/dtoTypes";
import { fetchPostsByBoard } from "./utils/boardservice";
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
        navigate(`/post/${postId}`);
    };

    const clubIdNum = clubId ? parseInt(clubId, 10) : null;

    return (
        <Box>
            <Container>
                <Title>게시글 목록</Title>
                <Table>
                    <StyledTr>
                        <StyledTd fontSize="1.3rem" fontWeight="bold">
                            제목
                        </StyledTd>
                        <StyledTd fontSize="1.3rem" fontWeight="bold">
                            작성자
                        </StyledTd>
                        <StyledTd fontSize="1.3rem" fontWeight="bold">
                            작성일
                        </StyledTd>
                        <StyledTd fontSize="1.3rem" fontWeight="bold">
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
                                    {post.postTitle}
                                </PointerSpan>
                                <StyledTd>{post.memberNickname}</StyledTd>
                                <StyledTd>{post.createdTime}</StyledTd>
                                <StyledTd>{post.postViewCount}</StyledTd>
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
