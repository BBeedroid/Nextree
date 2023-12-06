import axios from "axios";
import { SPRING_API_URL } from "../../../config";
import { ResponseDTO, PostDTO } from "../../Util/dtoTypes";

export const fetchPost = async (
    postId: number,
): Promise<PostDTO | undefined> => {
    try {
        const response = await axios.get<ResponseDTO<PostDTO>>(
            `${SPRING_API_URL}/api/post/${postId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );
        console.log(response.data.item);
        return response.data.item;
    } catch (error) {
        console.error("게시글을 불러오는 데 실패했습니다.", error);
        return undefined;
    }
};
