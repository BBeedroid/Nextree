import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

function App(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    );
}

export default App;
