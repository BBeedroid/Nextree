import React, { ReactElement, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SPRING_API_URL } from "../../config";
import { MemberDTO } from "../Util/dtoTypes";
import {
    Box,
    Container,
    Input,
    Button,
    LeftButtonDiv,
    MiddleButtonDiv,
} from "../../styles/theme";
import NavigateButton from "../Util/NavigateButton";

const SignUp = (): ReactElement => {
    const initialMemberState: MemberDTO = {
        memberEmail: "",
        memberPassword: "",
        memberNickname: "",
        memberTel: "",
    };

    const [member, setMember] = useState<MemberDTO>(initialMemberState);
    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setMember({
            ...member,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        event.preventDefault();
        try {
            const response = await axios.post(
                `${SPRING_API_URL}/api/member/signup`,
                member,
            );
            console.log("Sign up successful: ", response.data);
            alert("회원 가입이 정상적으로 완료되었습니다.");
            navigate("/");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage =
                    error.response.data.errorMessage || "Sign up failed";
                alert(errorMessage);
                console.error("An error occurred: ", error);
            } else {
                console.error("An error occurred:", error);
                alert("에러가 발생했습니다.");
            }
        }
    };

    return (
        <Box height="100vh">
            <Container>
                <form onSubmit={handleSubmit}>
                    <Input
                        name="memberEmail"
                        value={member.memberEmail}
                        onChange={handleChange}
                        placeholder="이메일 *"
                    />
                    <Input
                        name="memberPassword"
                        type="password"
                        value={member.memberPassword}
                        onChange={handleChange}
                        placeholder="비밀번호 *"
                    />
                    <Input
                        name="memberNickname"
                        value={member.memberNickname}
                        onChange={handleChange}
                        placeholder="닉네임 *"
                    />
                    <Input
                        name="memberTel"
                        value={member.memberTel}
                        onChange={handleChange}
                        placeholder="전화번호"
                    />
                    <LeftButtonDiv>
                        <Button type="submit">회원가입</Button>
                    </LeftButtonDiv>
                    <MiddleButtonDiv>
                        <NavigateButton path="/" label="취소" />
                    </MiddleButtonDiv>
                </form>
            </Container>
        </Box>
    );
};

export default SignUp;
