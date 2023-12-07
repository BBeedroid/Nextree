import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderContainer } from "../header";
import { Button, Title } from "../../styles/theme";

const Header = (): ReactElement => {
    const navigete = useNavigate();

    const handleLogout = (): void => {
        localStorage.removeItem("token");
        alert("로그아웃 되었습니다.");
        navigete("/");
    };

    return (
        <HeaderContainer>
            <Title>🌙 Travel Club</Title>
            <Button background="#bebebe" onClick={() => handleLogout()}>
                로그아웃
            </Button>
        </HeaderContainer>
    );
};

export default Header;
