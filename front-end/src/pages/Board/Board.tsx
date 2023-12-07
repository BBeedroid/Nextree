import React, { ReactElement, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PostDTO, BoardDTO, MembershipDTO } from "../Util/dtoTypes";
import { fetchPostsByBoard, fetchBoard } from "./utils/boardservice";
import { dateFormat, toggleModal, fetchMembership } from "../Util/utilservice";
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
    RightButtonDiv,
    Overlay,
} from "../../styles/theme";
import NavigateButton from "../Util/NavigateButton";
import { SPRING_API_URL } from "../../config";
import ModifyBoardModal from "./utils/ModifyBoardModal";
import Pagination from "../Util/Pagination";

const Board = (): ReactElement => {
    const { clubId, boardId } = useParams();
    const [posts, setPosts] = useState<PostDTO[]>([]);
    const [board, setBoard] = useState<BoardDTO | undefined>();
    const [membership, setMembership] = useState<MembershipDTO | undefined>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (boardId) {
            const boardIdNum = parseInt(boardId, 10);
            fetchPostsByBoard(boardIdNum, currentPage - 1, 5)
                .then((response) => {
                    setPosts(response.items ?? []);
                    setTotalPages(response.paginationInfo?.totalPages ?? 0);
                })
                .catch(console.error);

            fetchBoard(boardIdNum).then(setBoard).catch(console.error);
        }
    }, [boardId, currentPage]);

    useEffect(() => {
        if (clubId) {
            fetchMembership(parseInt(clubId, 10))
                .then(setMembership)
                .catch(console.error);
        }
    }, [clubId]);

    const handlePostClick = (postId: number): void => {
        navigate(`/club/${clubId}/board/${boardId}/post/${postId}`);
    };

    const handleDeleteClick = async (deleteBoardId: number): Promise<void> => {
        const confirmDelete = window.confirm("정말로 게시판을 삭제하겠습니까?");

        if (confirmDelete) {
            try {
                const response = await axios.delete(
                    `${SPRING_API_URL}/api/board`,
                    {
                        params: { boardId: deleteBoardId },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token",
                            )}`,
                        },
                    },
                );
                console.log("Deleted board: ", response.data);
                alert("성공적으로 게시판을 삭제했습니다.");
                navigate(`/club/${clubId}`);
            } catch (error) {
                console.error("An error occurred", error);
                alert("게시판 삭제에 실패했습니다.");
            }
        }
    };

    const handlePageChange = (pageNumber: number): void => {
        setCurrentPage(pageNumber);
    };

    const refreshBoardList = (): void => {
        if (boardId) {
            const boardIdNum = parseInt(boardId, 10);
            fetchBoard(boardIdNum).then(setBoard).catch(console.log);
        }
    };

    return (
        <Box>
            <Container width="950px" height="600px">
                <Title>{board ? `"${board.boardTitle}"` : "게시글 목록"}</Title>
                {posts.length > 0 ? (
                    <>
                        <Table>
                            <StyledTr>
                                <StyledTd
                                    fontSize="1.3rem"
                                    fontWeight="bold"
                                    width="700px"
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
                                    width="50px"
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
                                                    handlePostClick(
                                                        post.postId,
                                                    );
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
                        <Pagination
                            paginationInfo={{ totalPages, currentPage }}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <Title fontSize="1.6rem">게시글이 없습니다.</Title>
                )}
                <LeftButtonDiv>
                    <NavigateButton
                        path={`/club/${clubId}`}
                        label="게시판 목록"
                    />
                </LeftButtonDiv>
                <MiddleButtonDiv>
                    <NavigateButton
                        path={`/club/${clubId}/board/${boardId}/create`}
                        label="글쓰기"
                    />
                </MiddleButtonDiv>
                {membership?.role === "PRESIDENT" && (
                    <RightButtonDiv>
                        <Button onClick={toggleModal(setIsModalOpen)}>
                            게시판 수정
                        </Button>
                        <Button
                            margin="5px 0"
                            width="80px"
                            height="25px"
                            background="#FFBE0A"
                            fontSize="0.8rem"
                            onClick={() => {
                                if (boardId) {
                                    handleDeleteClick(parseInt(boardId, 10));
                                } else {
                                    console.log("boardId is undefined");
                                }
                            }}
                        >
                            게시판 삭제
                        </Button>
                    </RightButtonDiv>
                )}
                {isModalOpen && (
                    <>
                        <Overlay onClick={toggleModal(setIsModalOpen)} />
                        <ModifyBoardModal
                            onClose={toggleModal(setIsModalOpen)}
                            onBoardModify={refreshBoardList}
                        />
                    </>
                )}
            </Container>
        </Box>
    );
};

export default Board;
