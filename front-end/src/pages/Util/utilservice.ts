import axios from "axios";
import { ResponseDTO, MembershipDTO, MemberDTO } from "./dtoTypes";
import { SPRING_API_URL } from "../../config";

export const dateFormat = (dateTimeStr: string): string => {
    return dateTimeStr.split("T")[0];
};

export const toggleModal = (
    setModalState: React.Dispatch<React.SetStateAction<boolean>>,
): (() => void) => {
    return () => {
        setModalState((prevState) => !prevState);
    };
};

export const fetchMembership = async (
    clubId: number,
): Promise<MembershipDTO | undefined> => {
    try {
        const response = await axios.get<ResponseDTO<MembershipDTO>>(
            `${SPRING_API_URL}/api/membership`,
            {
                params: {
                    clubId,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );
        console.log(response.data.item);
        return response.data.item;
    } catch (error) {
        console.error("멤버십 정보를 불러오는 데 실패했습니다.", error);
        return undefined;
    }
};

export const fetchLoginUser = async (): Promise<MemberDTO | undefined> => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("No token found");
        }

        const response = await axios.get<ResponseDTO<MemberDTO>>(
            `${SPRING_API_URL}/api/member/loginuser`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data.item;
    } catch (error) {
        console.error("An error occurred", error);
        return undefined;
    }
};
