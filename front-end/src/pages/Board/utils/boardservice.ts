import axios from "axios";
import { SPRING_API_URL } from "../../../config";
import { ResponseDTO, BoardDTO } from "../../Util/dtoTypes";

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
