import React, { ReactElement, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { SPRING_API_URL } from "../../config";
import { MembershipDTO, PostDTO } from "../Util/dtoTypes";
import { fetchPost } from "./utils/postservice";
import { dateFormat, fetchMembership } from "../Util/utilservice";
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
    const [membership, setMembership] = useState<MembershipDTO>();
    const navigate = useNavigate();

    useEffect(() => {
        if (postId) {
            fetchPost(parseInt(postId, 10)).then(setPost).catch(console.error);
        }
    }, [postId]);

    useEffect(() => {
        if (clubId) {
            fetchMembership(parseInt(clubId, 10))
                .then(setMembership)
                .catch(console.error);
        }
    }, [clubId]);

    const isWriter = post?.memberId === membership?.memberId;
    const isPresident = membership?.role === "PRESIDENT";

    const handleDeleteClick = async (deletePostId: number): Promise<void> => {
        const confirmDelete = window.confirm("정말로 게시글을 삭제하겠습니까?");

        if (confirmDelete) {
            try {
                const response = await axios.delete(
                    `${SPRING_API_URL}/api/post`,
                    {
                        params: { postId: deletePostId },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token",
                            )}`,
                        },
                    },
                );
                console.log("Deleted post: ", response.data);
                alert("성공적으로 게시글을 삭제했습니다.");
                navigate(`/club/${clubId}/board/${boardId}`);
            } catch (error) {
                console.error("An error occurred", error);
                alert("게시판 삭제에 실패했습니다.");
            }
        }
    };

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
                        path={`/club/${clubId}/board/${boardId}`}
                        label="게시판으로"
                    />
                </LeftButtonDiv>
                {isWriter && (
                    <MiddleButtonDiv>
                        <NavigateButton
                            path={`/club/${clubId}/board/${boardId}/post/${postId}/modify`}
                            label="수정"
                        />
                    </MiddleButtonDiv>
                )}
                {(isWriter || isPresident) && (
                    <RightButtonDiv>
                        <Button
                            onClick={() => {
                                if (postId) {
                                    handleDeleteClick(parseInt(postId, 10));
                                } else {
                                    console.log("postId is undefined");
                                }
                            }}
                        >
                            삭제
                        </Button>
                    </RightButtonDiv>
                )}
            </Container>
        </Box>
    );
};

export default Post;
