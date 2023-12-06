import React, { useState, useEffect, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
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
import { ClubDTO } from "../Util/dtoTypes";
import { fetchAllClubs, fetchMembership } from "./utils/clubservice";
import { toggleModal } from "../Util/utilservice";
import CreateClubModal from "./utils/CreateClubModal";

const AllClubList = (): ReactElement => {
    const [clubs, setClubs] = useState<ClubDTO[]>([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchAllClubs().then(setClubs).catch(console.error);
    }, []);

    const handleClubClick = async (clubId: number): Promise<void> => {
        const membership = await fetchMembership(clubId);
        if (!membership) {
            alert("가입하시겠습니까?");
        } else {
            navigate(`/club/${clubId}`);
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
