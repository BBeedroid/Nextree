import React, { useState } from "react";
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
    width: 350px;
    height: 200px;
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

const LoginButtonDiv = styled.div`
    float: left;
    padding: 5px 0;
    width: 150px;
    height: 45px;
`;

const SignUpButtonDiv = styled.div`
    display: inline-block;
    padding: 5px 0;
    width: 150px;
    height: 45px;
`;

const Login: React.FC = (): JSX.Element => {
    const [memberEmail, setMemberEmail] = useState<string>("");
    const [memberPassword, setMemberPassword] = useState<string>("");
    const navigate = useNavigate();

    const handleLogin = async (
        event: React.FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        event.preventDefault();
        try {
            const response = await axios.post(`${SPRING_API_URL}/auth`, {
                memberEmail,
                memberPassword,
            });
            console.log("Login successful: ", response.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage =
                    error.response.data.message || "Login failed";
                alert(errorMessage);
                console.error("An error occurred:", error);
            } else {
                console.error("An error occurred:", error);
                alert("에러가 발생했습니다.");
            }
        }
    };

    const handleSignUp = (): void => {
        navigate("/signup");
    };

    return (
        <Box>
            <Container>
                <form onSubmit={handleLogin}>
                    <Input
                        type="email"
                        value={memberEmail}
                        onChange={(e) => setMemberEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <Input
                        type="password"
                        value={memberPassword}
                        onChange={(e) => setMemberPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <LoginButtonDiv>
                        <Button type="submit">로그인</Button>
                    </LoginButtonDiv>
                    <SignUpButtonDiv>
                        <Button type="button" onClick={handleSignUp}>
                            회원가입
                        </Button>
                    </SignUpButtonDiv>
                </form>
            </Container>
        </Box>
    );
};

export default Login;
