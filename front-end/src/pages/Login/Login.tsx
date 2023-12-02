import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { SPRING_API_URL } from "../../config";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 350px;
    border: 1px solid grey;
    border-radius: 5px;
`;

const InnerContainer = styled.div`
    width: 450px;
    height: 325px;
`;

const Input = styled.input`
    width: 350px;
    height: 35px;
    font-size: 1rem;
    color: #505050;
    background: transparent;
    border: none;
    outline: none;
`;

const Button = styled.button`
    width: 130px;
    height: 35px;
    font-size: 1rem;
    color: #ffffff;
    background: #505050;
    border: 1px solid grey;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
`;

const Login: React.FC = (): JSX.Element => {
    const [memberEmail, setMemberEmail] = useState<string>("");
    const [memberPassword, setMemberPassword] = useState<string>("");

    const handleLogin = async (): Promise<void> => {
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
                // 그 외 네트워크 에러 등
                console.error("An error occurred:", error);
                alert("An unexpected error occurred");
            }
        }
    };

    return (
        <Container>
            <InnerContainer>
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
                <Button onClick={handleLogin}>Login</Button>
            </InnerContainer>
        </Container>
    );
};

export default Login;
