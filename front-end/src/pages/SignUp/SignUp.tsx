import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { SPRING_API_URL } from "../../config";

const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    padding: 10px 20px;
    width: 500px;
    height: 350px;
    border: 1px solid grey;
    border-radius: 5px;
`;

const Input = styled.input`
    margin: 10px 0;
    padding: 10px 0 10px 5px;
    width: 100%;
    height: 35px;
    color: #505050;
`;

const Button = styled.button`
    width: 130px;
    height: 35px;
    color: #ffffff;
    background: #505050;
    border: 1px solid grey;
`;

const SignUpButtonDiv = styled.div`
    float: left;
    padding: 5px 0;
    width: 150px;
    height: 45px;
`;

const CancelButtonDiv = styled.div`
    display: inline-block;
    padding: 5px 0;
    width: 150px;
    height: 45px;
`;

interface MemberDTO {
    memberEmail: string;
    memberPassword: string;
    memberNickname: string;
    memberTel: string;
}

const SignUp: React.FC = (): JSX.Element => {
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
                `${SPRING_API_URL}/member`,
                member,
            );
            console.log("Sign up successful: ", response.data);
            alert("회원 가입이 정상적으로 완료되었습니다.");
            navigate("/");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage =
                    error.response.data.message || "Sign up failed";
                alert(errorMessage);
                console.error("An error occurred: ", error);
            } else {
                console.error("An error occurred:", error);
                alert("에러가 발생했습니다.");
            }
        }
    };

    const handleCancel = (): void => {
        navigate(-1);
    };

    return (
        <Box>
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
                    <SignUpButtonDiv>
                        <Button type="submit">회원가입</Button>
                    </SignUpButtonDiv>
                    <CancelButtonDiv>
                        <Button type="button" onClick={handleCancel}>
                            취소
                        </Button>
                    </CancelButtonDiv>
                </form>
            </Container>
        </Box>
    );
};

export default SignUp;
