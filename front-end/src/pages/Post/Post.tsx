import React, { ReactElement, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostDTO } from "../Util/dtoTypes";
import { fetchPost } from "./utils/postservice";
import { dateFormat } from "../Util/utilservice";
import {
    Box,
    Container,
    Table,
    StyledTd,
    StyledTr,
    Title,
} from "../../styles/theme";
import NavigateButton from "../Util/NavigateButton";

const Post = (): ReactElement => {
    const { clubId, boardId, postId } = useParams();
    const [post, setPost] = useState<PostDTO>();

    useEffect(() => {
        if (postId) {
            fetchPost(parseInt(postId, 10)).then(setPost).catch(console.error);
        }
    }, [postId]);

    const clubIdNum = clubId ? parseInt(clubId, 10) : null;
    const boardIdNum = boardId ? parseInt(boardId, 10) : null;

    return (
        <Box>
            <Container>
                <Title>게시글</Title>
                {post ? (
                    <Table>
                        <StyledTr>
                            <StyledTd fontSize="1.3rem" fontWeight="bold">
                                {post ? post.postTitle : ""}
                            </StyledTd>
                            <StyledTd>
                                {post ? post.memberNickname : ""}
                            </StyledTd>
                        </StyledTr>
                        <StyledTr>
                            <StyledTd>{post ? post.postContent : ""}</StyledTd>
                        </StyledTr>
                        <StyledTr>
                            <StyledTd>
                                {post && post.createdTime
                                    ? dateFormat(post.createdTime)
                                    : ""}
                            </StyledTd>
                        </StyledTr>
                        <StyledTr>
                            <StyledTd>
                                {post ? post.postViewCount : ""}
                            </StyledTd>
                        </StyledTr>
                    </Table>
                ) : (
                    <div>게시글을 불러오고 있습니다.</div>
                )}
                <NavigateButton
                    path={`/club/${clubIdNum}/board/${boardIdNum}`}
                    label="게시판으로"
                />
            </Container>
        </Box>
    );
};

export default Post;
