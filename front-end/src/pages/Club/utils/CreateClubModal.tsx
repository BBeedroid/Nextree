import React, { ReactElement, useState } from "react";
import axios from "axios";
import { SPRING_API_URL } from "../../../config";
import { ClubDTO } from "../../Util/dtoTypes";
import {
    Modal,
    Input,
    Button,
    LeftButtonDiv,
    MiddleButtonDiv,
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
            if (axios.isAxiosError(catchError) && catchError.response) {
                const errorMessage =
                    catchError.response.data.errorMessage ||
                    "Create club failed";
                alert(errorMessage);
                console.error("An error occurred: ", catchError);
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
            <MiddleButtonDiv>
                <Button onClick={onClose}>취소</Button>
            </MiddleButtonDiv>
        </Modal>
    );
};

export default CreateClubModal;
