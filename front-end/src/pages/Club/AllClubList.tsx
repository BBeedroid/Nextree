import React, { useState, useEffect, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SPRING_API_URL } from "../../config";
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
    Overlay,
} from "../../styles/theme";
import NavigateButton from "../Util/NavigateButton";
import { ClubDTO, MembershipDTO } from "../Util/dtoTypes";
import { fetchAllClubs, fetchMembership } from "./utils/clubservice";
import { toggleModal, fetchLoginUser } from "../Util/utilservice";
import CreateClubModal from "./utils/CreateClubModal";

const AllClubList = (): ReactElement => {
    const [clubs, setClubs] = useState<ClubDTO[]>([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchAllClubs().then(setClubs).catch(console.error);
    }, []);

    const handleClubClick = async (certainClubId: number): Promise<void> => {
        const loginUser = await fetchLoginUser();
        if (!loginUser) {
            console.error("Failed fetching login user data");
            return;
        }
        const currentUserId = loginUser.memberId;

        const existingMembership = await fetchMembership(certainClubId);

        if (!existingMembership) {
            const confirmJoin = window.confirm("가입하시겠습니까?");

            if (confirmJoin) {
                try {
                    const response = await axios.post<MembershipDTO>(
                        `${SPRING_API_URL}/api/membership`,
                        { memberId: currentUserId },
                        {
                            params: { clubId: certainClubId },
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                    "token",
                                )}`,
                            },
                        },
                    );
                    console.log(response.data);
                    alert("성공적으로 클럽에 가입했습니다.");
                    navigate(`/club/${certainClubId}`);
                } catch (error) {
                    console.error("An error occurred", error);
                    alert("클럽 가입에 실패했습니다.");
                }
            }
        } else {
            navigate(`/club/${certainClubId}`);
        }
    };

    const refreshClubList = (): void => {
        fetchAllClubs().then(setClubs).catch(console.error);
    };

    return (
        <Box>
            <Container height="500px">
                <Title>클럽 목록</Title>
                <Table>
                    <StyledTr>
                        <StyledTd fontSize="1.3rem" fontWeight="bold">
                            클럽 이름
                        </StyledTd>
                        <StyledTd fontSize="1.3rem" fontWeight="bold">
                            클럽 소개
                        </StyledTd>
                    </StyledTr>
                    {clubs.map((club) => (
                        <StyledTr key={club.clubId}>
                            <StyledTd fontSize="1.1rem">
                                <PointerSpan
                                    onClick={() => {
                                        if (club.clubId !== undefined) {
                                            handleClubClick(club.clubId);
                                        }
                                    }}
                                >
                                    {club.clubName}
                                </PointerSpan>
                            </StyledTd>
                            <StyledTd>{club.clubIntro}</StyledTd>
                        </StyledTr>
                    ))}
                </Table>
                <LeftButtonDiv>
                    <NavigateButton path="/my-club-list" label="내 클럽 목록" />
                </LeftButtonDiv>
                <MiddleButtonDiv>
                    <Button onClick={toggleModal(setIsModalOpen)}>
                        클럽 생성
                    </Button>
                </MiddleButtonDiv>

                {isModalOpen && (
                    <>
                        <Overlay onClick={toggleModal(setIsModalOpen)} />
                        <CreateClubModal
                            onClose={toggleModal(setIsModalOpen)}
                            onClubCreate={refreshClubList}
                        />
                    </>
                )}
            </Container>
        </Box>
    );
};

export default AllClubList;
