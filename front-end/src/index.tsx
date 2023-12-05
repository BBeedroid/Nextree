import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import { lightTheme } from "./styles/theme";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <Router>
        <GlobalStyle />
        <ThemeProvider theme={lightTheme}>
            <App />
        </ThemeProvider>
    </Router>,
);
