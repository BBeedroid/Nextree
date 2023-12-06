import React, { ReactElement, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { SPRING_API_URL } from "../../config";
import { PostDTO } from "../Util/dtoTypes";
import { fetchPost } from "./utils/postservice";
import {
    Box,
    PostContainer,
    Title,
    Input,
    Textarea,
    Button,
    ButtonsDiv,
} from "../../styles/theme";

const ModifyPost = (): ReactElement => {
    const { clubId, boardId, postId } = useParams();
    const [post, setPost] = useState<PostDTO>();
    const navigate = useNavigate();

    useEffect(() => {
        if (postId) {
            fetchPost(parseInt(postId, 10)).then(setPost).catch(console.error);
        }
    }, [postId]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ): void => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    const handleModify = async (): Promise<void> => {
        if (post && postId) {
            try {
                const response = await axios.put<PostDTO>(
                    `${SPRING_API_URL}/api/post`,
                    post,
                    {
                        params: {
                            postId: parseInt(postId, 10),
                        },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token",
                            )}`,
                        },
                    },
                );
                setPost(response.data);
                alert("성공적으로 게시글을 수정했습니다.");
                navigate(`/club/${clubId}/board/${boardId}`);
            } catch (error) {
                console.error("An error occurred", error);
                alert("게시글 수정에 실패했습니다.");
            }
        }
    };

    const handleCancelClick = (): void => {
        navigate(-1);
    };

    return (
        <Box>
            <PostContainer width="950px" height="600px" border="none">
                <Title>게시글 수정</Title>
                <Input
                    type="text"
                    name="postTitle"
                    value={post ? post.postTitle : ""}
                    onChange={handleChange}
                    width="700px"
                />
                <Textarea
                    name="postContent"
                    value={post ? post.postContent : ""}
                    onChange={handleChange}
                    width="665px"
                    minHeight=""
                />
                <ButtonsDiv>
                    <Button onClick={handleModify}>수정</Button>
                    <Button onClick={() => handleCancelClick()}>취소</Button>
                </ButtonsDiv>
            </PostContainer>
        </Box>
    );
};

export default ModifyPost;
