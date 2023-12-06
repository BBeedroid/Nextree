import React, { ReactElement, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PostDTO } from "../Util/dtoTypes";
import { fetchPost } from "./utils/postservice";
import { dateFormat } from "../Util/utilservice";
import {
    Box,
    Container,
    Table,
    StyledTd,
    StyledTr,
    LeftButtonDiv,
    MiddleButtonDiv,
    RightButtonDiv,
    Button,
    TextBox,
} from "../../styles/theme";
import NavigateButton from "../Util/NavigateButton";

const Post = (): ReactElement => {
    const { clubId, boardId, postId } = useParams();
    const [post, setPost] = useState<PostDTO>();
    const navigate = useNavigate();

    useEffect(() => {
        if (postId) {
            fetchPost(parseInt(postId, 10)).then(setPost).catch(console.error);
        }
    }, [postId]);

    const handleModifyClick = (modifyPostId: number): void => {
        navigate(
            `/club/${clubId}/board/${boardId}/post/${modifyPostId}/modify`,
        );
    };

    const clubIdNum = clubId ? parseInt(clubId, 10) : null;
    const boardIdNum = boardId ? parseInt(boardId, 10) : null;

    return (
        <Box>
            <Container width="950px" height="600px" border="none">
                {post ? (
                    <>
                        <Table>
                            <StyledTr>
                                <StyledTd
                                    fontSize="1.5rem"
                                    fontWeight="bold"
                                    width="700px"
                                >
                                    {post ? post.postTitle : ""}
                                </StyledTd>
                                <StyledTd width="100px">
                                    {post ? post.memberNickname : ""}
                                </StyledTd>
                                <StyledTd width="100px">
                                    {post && post.createdTime
                                        ? dateFormat(post.createdTime)
                                        : ""}
                                </StyledTd>
                                <StyledTd width="50px">
                                    {post ? post.postViewCount : ""}
                                </StyledTd>
                            </StyledTr>
                        </Table>
                        <TextBox width="900px" fontSize="1.2rem">
                            {post ? post.postContent : ""}
                        </TextBox>
                    </>
                ) : (
                    <div>게시글을 불러오고 있습니다.</div>
                )}
                <LeftButtonDiv>
                    <NavigateButton
                        path={`/club/${clubIdNum}/board/${boardIdNum}`}
                        label="게시판으로"
                    />
                </LeftButtonDiv>
                <MiddleButtonDiv>
                    <Button
                        onClick={() => {
                            if (postId) {
                                handleModifyClick(parseInt(postId, 10));
                            } else {
                                console.error("postId is undefined");
                            }
                        }}
                    >
                        수정
                    </Button>
                </MiddleButtonDiv>
                <RightButtonDiv>
                    <Button>삭제</Button>
                </RightButtonDiv>
            </Container>
        </Box>
    );
};

export default Post;
