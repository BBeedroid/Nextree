import axios from "axios";
import { SPRING_API_URL } from "../../../config";
import { ResponseDTO, BoardDTO, PostDTO, ClubDTO } from "../../Util/dtoTypes";

export const fetchAllBoards = async (
    clubId: number,
    page: number,
    size: number = 5,
): Promise<ResponseDTO<BoardDTO>> => {
    try {
        const response = await axios.get<ResponseDTO<BoardDTO>>(
            `${SPRING_API_URL}/api/board/list`,
            {
                params: {
                    clubId,
                    page,
                    size,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("게시판 목록을 불러오는 데 실패했습니다.", error);
        throw error;
    }
};

export const fetchPostsByBoard = async (
    boardId: number,
    page: number,
    size: number = 5,
): Promise<ResponseDTO<PostDTO>> => {
    try {
        const response = await axios.get<ResponseDTO<PostDTO>>(
            `${SPRING_API_URL}/api/post/list/${boardId}`,
            {
                params: {
                    page,
                    size,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );
        console.log(response.data);
        return response.data;
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

export const fetchBoard = async (
    boardId: number,
): Promise<BoardDTO | undefined> => {
    try {
        const response = await axios.get<ResponseDTO<BoardDTO>>(
            `${SPRING_API_URL}/api/board/${boardId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );
        console.log(response.data.item);
        return response.data.item;
    } catch (error) {
        console.error("게시판 정보를 불러오는 데 실패했습니다.", error);
        return undefined;
    }
};
