import axios from "axios";
import { SPRING_API_URL } from "../../../config";
import { ResponseDTO, MembershipDTO, ClubDTO } from "../../Util/dtoTypes";

export const fetchJoinedClubs = async (): Promise<MembershipDTO[]> => {
    try {
        const response = await axios.get<ResponseDTO<MembershipDTO>>(
            `${SPRING_API_URL}/api/membership/member`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );
        console.log(response.data.items);
        return response.data.items ?? [];
    } catch (error) {
        console.error("멤버십 목록을 불러오는 데 실패했습니다.", error);
        throw error;
    }
};

export const fetchAllClubs = async (): Promise<ClubDTO[]> => {
    try {
        const response = await axios.get<ResponseDTO<ClubDTO>>(
            `${SPRING_API_URL}/api/club/list`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );
        console.log(response.data.items);
        return response.data.items ?? [];
    } catch (error) {
        console.error("클럽 목록을 불러오는 데 실패했습니다.", error);
        throw error;
    }
};
