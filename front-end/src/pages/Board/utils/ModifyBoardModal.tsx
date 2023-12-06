import React, { ReactElement, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SPRING_API_URL } from "../../../config";
import { BoardDTO } from "../../Util/dtoTypes";
import {
    Modal,
    Input,
    Button,
    LeftButtonDiv,
    MiddleButtonDiv,
    ModalInputContainer,
} from "../../../styles/theme";
import { fetchBoard } from "./boardservice";

const ModifyBoardModal = ({
    onClose,
    onBoardModify,
}: {
    onClose: () => void;
    onBoardModify: () => void;
}): ReactElement => {
    const { clubId, boardId } = useParams();
    const [board, setBoard] = useState<BoardDTO>();

    useEffect(() => {
        if (boardId) {
            const boardIdNum = parseInt(boardId, 10);
            fetchBoard(boardIdNum).then(setBoard).catch(console.error);
        }
    }, [boardId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setBoard({ ...board, [name]: value });
    };

    const handleModifyBoard = async (): Promise<void> => {
        if (board && boardId) {
            try {
                const response = await axios.put<BoardDTO>(
                    `${SPRING_API_URL}/api/board`,
                    { ...board, boardId: parseInt(boardId, 10) },
                    {
                        params: {
                            clubId,
                        },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token",
                            )}`,
                        },
                    },
                );
                setBoard(response.data);
                onBoardModify();
                onClose();
                alert("성공적으로 게시판을 수정했습니다.");
            } catch (catchError) {
                if (axios.isAxiosError(catchError) && catchError.response) {
                    const errorMessage =
                        catchError.response.data.errorMessage ||
                        "Modify board failed";
                    alert(errorMessage);
                    console.error("An error occurred: ", catchError);
                } else {
                    console.error("An error occurred:", catchError);
                    throw new Error("에러가 발생했습니다.");
                }
            }
        }
    };

    return (
        <Modal height="150px">
            <ModalInputContainer>
                <Input
                    type="text"
                    name="boardTitle"
                    value={board ? board.boardTitle : undefined}
                    onChange={handleChange}
                    margin="10px 0"
                    padding="10px 20px"
                    width="300px"
                />
            </ModalInputContainer>
            <LeftButtonDiv>
                <Button onClick={handleModifyBoard}>수정</Button>
            </LeftButtonDiv>
            <MiddleButtonDiv>
                <Button onClick={onClose}>취소</Button>
            </MiddleButtonDiv>
        </Modal>
    );
};

export default ModifyBoardModal;
