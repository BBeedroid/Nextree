import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import MyClubList from "./pages/Club/MyClubList";
import AllClubList from "./pages/Club/AllClubList";

function App(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/my-club-list" element={<MyClubList />} />
            <Route path="/all-club-list" element={<AllClubList />} />
        </Routes>
    );
}

export default App;
