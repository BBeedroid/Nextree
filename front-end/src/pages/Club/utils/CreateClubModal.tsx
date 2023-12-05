import React, { ReactElement, useState } from "react";
import axios from "axios";
import { SPRING_API_URL } from "../../../config";
import { ClubDTO } from "../../Util/dtoTypes";
import {
    Modal,
    Input,
    Button,
    RightButtonDiv,
    LeftButtonDiv,
    ModalInputContainer,
    Textarea,
} from "../../../styles/theme";

const CreateClubModal = ({
    onClose,
    onClubCreate,
}: {
    onClose: () => void;
    onClubCreate: () => void;
}): ReactElement => {
    const initialClubState: ClubDTO = {
        clubName: "",
        clubIntro: "",
    };

    const [club, setClub] = useState<ClubDTO>(initialClubState);
    const [error, setError] = useState<string>("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ): void => {
        const { name, value } = e.target;
        setClub({ ...club, [name]: value });
    };

    const handleCreateClub = async (): Promise<void> => {
        try {
            const response = await axios.post<ClubDTO>(
                `${SPRING_API_URL}/api/club`,
                club,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token",
                        )}`,
                    },
                },
            );
            setClub(response.data);
            onClubCreate();
            onClose();
        } catch (catchError) {
            setError("클럽 생성 중에 에러가 발생했습니다.");
            if (axios.isAxiosError(catchError) && catchError.response) {
                console.error("An error occurred: ", catchError);
                throw new Error(
                    catchError.response.data.message || "Create club failed",
                );
            } else {
                console.error("An error occurred:", catchError);
                throw new Error("에러가 발생했습니다.");
            }
        }
    };

    return (
        <Modal>
            <ModalInputContainer>
                <Input
                    type="text"
                    name="clubName"
                    value={club.clubName}
                    onChange={handleChange}
                    placeholder="클럽 이름을 입력해주세요."
                    margin="10px 0"
                    padding="10px 20px"
                    width="300px"
                />
                <Textarea
                    name="clubIntro"
                    value={club.clubIntro}
                    onChange={handleChange}
                    placeholder="클럽 소개를 입력해주세요."
                />
            </ModalInputContainer>
            <LeftButtonDiv>
                <Button onClick={handleCreateClub}>생성</Button>
            </LeftButtonDiv>
            <RightButtonDiv>
                <Button onClick={onClose}>취소</Button>
            </RightButtonDiv>
            {error && <p>{error}</p>}
        </Modal>
    );
};

export default CreateClubModal;
