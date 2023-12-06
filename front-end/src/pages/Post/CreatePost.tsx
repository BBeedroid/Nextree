import React, { ReactElement, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { SPRING_API_URL } from "../../config";
import { PostDTO } from "../Util/dtoTypes";
import {
    Box,
    PostContainer,
    Title,
    Input,
    Textarea,
    Button,
    ButtonsDiv,
} from "../../styles/theme";

const CreatePost = (): ReactElement => {
    const { clubId, boardId } = useParams();
    const initialPostState: PostDTO = { postTitle: "", postContent: "" };
    const [post, setPost] = useState<PostDTO>(initialPostState);
    const navigate = useNavigate();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ): void => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };
    const handleCreatePost = async (): Promise<void> => {
        if (boardId) {
            try {
                const response = await axios.post<PostDTO>(
                    `${SPRING_API_URL}/api/post`,
                    post,
                    {
                        params: {
                            boardId: parseInt(boardId, 10),
                        },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token",
                            )}`,
                        },
                    },
                );
                setPost(response.data);
                alert("성공적으로 게시글을 작성했습니다.");
                navigate(`/club/${clubId}/board/${boardId}`);
            } catch (error) {
                console.error("An error occurred", error);
                alert("게시글 작성에 실패했습니다.");
            }
        }
    };

    const handleCancelClick = (): void => {
        navigate(-1);
    };

    return (
        <Box>
            <PostContainer width="950px" height="600px" border="none">
                <Title>게시글 작성</Title>
                <Input
                    type="text"
                    name="postTitle"
                    value={post.postTitle}
                    onChange={handleChange}
                    placeholder="제목을 입력해주세요."
                    width="700px"
                />
                <Textarea
                    name="postContent"
                    value={post.postContent}
                    onChange={handleChange}
                    placeholder="내용을 입력해주세요."
                    width="665px"
                />
                <ButtonsDiv>
                    <Button onClick={handleCreatePost}>작성</Button>
                    <Button onClick={() => handleCancelClick()}>취소</Button>
                </ButtonsDiv>
            </PostContainer>
        </Box>
    );
};

export default CreatePost;
