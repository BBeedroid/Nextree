import React, { useState, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SPRING_API_URL } from "../../config";
import {
    Box,
    Container,
    Input,
    Button,
    LeftButtonDiv,
    MiddleButtonDiv,
} from "../../styles/theme";
import NavigateButton from "../Util/NavigateButton";
import { LoginDTO } from "../Util/dtoTypes";

const Login = (): ReactElement => {
    const [loginData, setLoginData] = useState<LoginDTO>({});
    const navigate = useNavigate();

    const handleLogin = async (inputData: LoginDTO): Promise<void> => {
        try {
            const response = await axios.post(
                `${SPRING_API_URL}/auth`,
                inputData,
            );
            const { token, message } = response.data.item;
            if (token) {
                localStorage.setItem("token", token);
                navigate("/my-club-list");
            } else {
                console.error("token not received");
                alert(`"${message}"`);
            }
        } catch (catchError) {
            if (axios.isAxiosError(catchError) && catchError.response) {
                const errorMessage =
                    catchError.response.data.errorMessage || "Login failed";
                alert(errorMessage);
                console.error("An error occurred: ", catchError);
            } else {
                console.error("An error occurred:", catchError);
                throw new Error("에러가 발생했습니다.");
            }
        }
    };

    const submitLogin = async (
        event: React.FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        event.preventDefault();
        await handleLogin(loginData);
    };

    return (
        <Box height="100vh">
            <Container width="350px" height="250px">
                <form onSubmit={submitLogin}>
                    <Input
                        type="email"
                        value={loginData.memberEmail}
                        onChange={(e) =>
                            setLoginData({
                                ...loginData,
                                memberEmail: e.target.value,
                            })
                        }
                        placeholder="Email"
                    />
                    <Input
                        type="password"
                        value={loginData.memberPassword}
                        onChange={(e) =>
                            setLoginData({
                                ...loginData,
                                memberPassword: e.target.value,
                            })
                        }
                        placeholder="Password"
                    />
                    <LeftButtonDiv>
                        <Button type="submit">로그인</Button>
                    </LeftButtonDiv>
                    <MiddleButtonDiv>
                        <NavigateButton path="/signup" label="회원 가입" />
                    </MiddleButtonDiv>
                </form>
            </Container>
        </Box>
    );
};

export default Login;
