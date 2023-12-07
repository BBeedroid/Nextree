import React, { ReactElement, ReactNode } from "react";
import Header from "../Header/Header";

const MainLayout = ({ children }: { children: ReactNode }): ReactElement => {
    return (
        <>
            <Header />
            <div>{children}</div>
        </>
    );
};

export default MainLayout;
