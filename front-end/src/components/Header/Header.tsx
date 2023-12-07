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

    const handleLogoClick = (): void => {
        navigete("/my-club-list");
    };

    return (
        <HeaderContainer>
            <Title cursor="pointer" hoverColor="true" onClick={handleLogoClick}>
                🌙 Travel Club
            </Title>
            <Button
                background="#bebebe"
                color="#505050"
                onClick={() => handleLogout()}
            >
                로그아웃
            </Button>
        </HeaderContainer>
    );
};

export default Header;
