import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyled = createGlobalStyle`
    ${reset}
    * {
        margin: 0;
        padding: 0;
        box-sizing: boarder-box;
    }
    body {
        background-color: #ffffff;
        font-size: 1rem;
        color: #505050;
        font-family: 'Nanum Gothic', Roboto, Arial, sans-serif;
    }
    a {
        color: inherit;
        text-decoration: none;
        cursor: pointer;
    }
    input {
        background-color: transparent;
        border: 1px solid grey;
        border-radius: 5px;
        outline: none;
        font-size: 1rem;
    }
    button {
        background-color: transparent;
        outline: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
    }
    h1, h2, h3, h4, h5, h6 {
        font-family: 'Nanum Gothic', sans-serif;
    }
    ol, ul, li {
        list-style: none;
    }
    img {
        display: block;
        width: 100%;
        height: 100%;
    }
`;

export default GlobalStyled;
