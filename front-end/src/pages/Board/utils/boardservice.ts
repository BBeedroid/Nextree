import axios from "axios";
import { SPRING_API_URL } from "../../../config";
import { ResponseDTO, BoardDTO, PostDTO, ClubDTO } from "../../Util/dtoTypes";

export const fetchAllBoards = async (clubId: number): Promise<BoardDTO[]> => {
    try {
        const response = await axios.get<ResponseDTO<BoardDTO>>(
            `${SPRING_API_URL}/api/board/list`,
            {
                params: {
                    clubId,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );
        console.log(response.data.items);
        return response.data.items ?? [];
    } catch (error) {
        console.error("게시판 목록을 불러오는 데 실패했습니다.", error);
        throw error;
    }
};

export const fetchPostsByBoard = async (
    boardId: number,
): Promise<PostDTO[]> => {
    try {
        const response = await axios.get<ResponseDTO<PostDTO>>(
            `${SPRING_API_URL}/api/post/list/${boardId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );
        console.log(response.data.items);
        return response.data.items ?? [];
    } catch (error) {
        console.error("게시글 목록을 불러오는 데 실패했습니다.", error);
        throw error;
    }
};

export const fetchClub = async (
    clubId: number,
): Promise<ClubDTO | undefined> => {
    try {
        const response = await axios.get<ResponseDTO<ClubDTO>>(
            `${SPRING_API_URL}/api/club/${clubId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );
        console.log(response.data.item);
        return response.data.item;
    } catch (error) {
        console.error("클럽 정보를 불러오는 데 실패했습니다.", error);
        return undefined;
    }
};
