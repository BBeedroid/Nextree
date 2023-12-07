import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import MyClubList from "./pages/Club/MyClubList";
import AllClubList from "./pages/Club/AllClubList";
import AllBoardList from "./pages/Board/AllBoardList";
import Board from "./pages/Board/Board";
import Post from "./pages/Post/Post";
import ModifyPost from "./pages/Post/ModifyPost";
import CreatePost from "./pages/Post/CreatePost";
import AllMemberList from "./pages/Club/AllMemberList";
import MainLayout from "./components/MainLayout/MainLayout";

function App(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
                path="/my-club-list"
                element={
                    <MainLayout>
                        <MyClubList />
                    </MainLayout>
                }
            />
            <Route
                path="/all-club-list"
                element={
                    <MainLayout>
                        <AllClubList />
                    </MainLayout>
                }
            />
            <Route
                path="/club/:clubId"
                element={
                    <MainLayout>
                        <AllBoardList />
                    </MainLayout>
                }
            />
            <Route
                path="/club/:clubId/board/:boardId"
                element={
                    <MainLayout>
                        <Board />
                    </MainLayout>
                }
            />
            <Route
                path="/club/:clubId/board/:boardId/post/:postId"
                element={
                    <MainLayout>
                        <Post />
                    </MainLayout>
                }
            />
            <Route
                path="/club/:clubId/board/:boardId/post/:postId/modify"
                element={
                    <MainLayout>
                        <ModifyPost />
                    </MainLayout>
                }
            />
            <Route
                path="/club/:clubId/board/:boardId/create"
                element={
                    <MainLayout>
                        <CreatePost />
                    </MainLayout>
                }
            />
            <Route
                path="/club/:clubId/member"
                element={
                    <MainLayout>
                        <AllMemberList />
                    </MainLayout>
                }
            />
        </Routes>
    );
}

export default App;
