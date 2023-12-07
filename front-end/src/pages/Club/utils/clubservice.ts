import axios from "axios";
import { SPRING_API_URL } from "../../../config";
import { ResponseDTO, MembershipDTO, ClubDTO } from "../../Util/dtoTypes";

export const fetchJoinedClubs = async (
    page: number,
    size: number = 5,
): Promise<ResponseDTO<MembershipDTO>> => {
    try {
        const response = await axios.get<ResponseDTO<MembershipDTO>>(
            `${SPRING_API_URL}/api/membership/member`,
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
        console.error("멤버십 목록을 불러오는 데 실패했습니다.", error);
        throw error;
    }
};

export const fetchAllClubs = async (
    page: number,
    size: number = 5,
): Promise<ResponseDTO<ClubDTO>> => {
    try {
        const response = await axios.get<ResponseDTO<ClubDTO>>(
            `${SPRING_API_URL}/api/club/list`,
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
        console.error("클럽 목록을 불러오는 데 실패했습니다.", error);
        throw error;
    }
};

export const fetchMembership = async (
    clubId: number,
): Promise<MembershipDTO | undefined> => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.get<ResponseDTO<MembershipDTO>>(
            `${SPRING_API_URL}/api/membership`,
            {
                params: {
                    clubId,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data.item;
    } catch (error) {
        console.error("멤버십 조회에 실패했습니다.", error);
        return undefined;
    }
};

export const fetchAllMembers = async (
    clubId: number,
    page: number,
    size: number = 5,
): Promise<ResponseDTO<MembershipDTO>> => {
    try {
        const response = await axios.get<ResponseDTO<MembershipDTO>>(
            `${SPRING_API_URL}/api/membership/club`,
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
        console.error("멤버십 목록을 불러오는 데 실패했습니다.", error);
        throw error;
    }
};
