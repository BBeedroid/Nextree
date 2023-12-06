import React, { ReactElement, useState } from "react";
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

const CreateBoardModal = ({
    onClose,
    onBoardCreate,
}: {
    onClose: () => void;
    onBoardCreate: () => void;
}): ReactElement => {
    const { clubId } = useParams();
    const initialBoardState: BoardDTO = { boardTitle: "" };
    const [board, setBoard] = useState<BoardDTO>(initialBoardState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setBoard({ ...board, [name]: value });
    };

    const handleCreateBoard = async (): Promise<void> => {
        try {
            const response = await axios.post<BoardDTO>(
                `${SPRING_API_URL}/api/board`,
                board,
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
            onBoardCreate();
            onClose();
        } catch (catchError) {
            if (axios.isAxiosError(catchError) && catchError.response) {
                const errorMessage =
                    catchError.response.data.errorMessage ||
                    "Create board failed";
                alert(errorMessage);
                console.error("An error occurred: ", catchError);
            } else {
                console.error("An error occurred:", catchError);
                throw new Error("에러가 발생했습니다.");
            }
        }
    };

    return (
        <Modal height="150px">
            <ModalInputContainer>
                <Input
                    type="text"
                    name="boardTitle"
                    value={board.boardTitle}
                    onChange={handleChange}
                    placeholder="게시판 이름을 입력해주세요."
                    margin="10px 0"
                    padding="10px 20px"
                    width="300px"
                />
            </ModalInputContainer>
            <LeftButtonDiv>
                <Button onClick={handleCreateBoard}>생성</Button>
            </LeftButtonDiv>
            <MiddleButtonDiv>
                <Button onClick={onClose}>취소</Button>
            </MiddleButtonDiv>
        </Modal>
    );
};

export default CreateBoardModal;
