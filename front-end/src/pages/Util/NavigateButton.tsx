import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../styles/theme";

interface NavigateProps {
    path: string;
    label: string;
}

const NavigateButton = ({ path, label }: NavigateProps): ReactElement => {
    const navigate = useNavigate();

    const handleNavigate = (): void => {
        navigate(path);
    };

    return <Button onClick={handleNavigate}>{label}</Button>;
};

export default NavigateButton;
