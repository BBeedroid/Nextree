import styled, { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
    backgroundColor: "white",
    textColor: "black",
    buttonColor: "light-grey",
};

export const darkTheme: DefaultTheme = {
    backgroundColor: "black",
    textColor: "white",
    buttonColor: "light-grey",
};
export interface BoxProps {
    justify?: string;
    align?: string;
}

export interface ContainerProps {
    padding?: string;
    width?: string;
    height?: string;
}

export interface InputProps {
    margin?: string;
    padding?: string;
    width?: string;
    height?: string;
}

export interface ButtonProps {
    width?: string;
    height?: string;
    color?: string;
    background?: string;
}

export interface RightButtonDivProps {
    padding?: string;
    width?: string;
    height?: string;
}

export interface LeftButtonDivProps {
    padding?: string;
    width?: string;
    height?: string;
}

export interface TitleProps {
    margin?: string;
    padding?: string;
    textAlign?: string;
    fontSize?: string;
    color?: string;
}

export interface TableProps {
    minWidth?: string;
    minHeight?: string;
}

export interface TdProps {
    padding?: string;
    width?: string;
    height?: string;
    background?: string;
    textAlign?: string;
    fontSize?: string;
    fontWeight?: string;
}

export interface TrProps {
    padding?: string;
    width?: string;
}

export const Box = styled.div<BoxProps>`
    display: flex;
    justify-content: ${(props) => props.justify || "center"};
    align-items: ${(props) => props.align || "center"};
    width: 100vw;
    height: 100vh;
`;

export const Container = styled.div<ContainerProps>`
    padding: ${(props) => props.padding || "10px 20px"};
    width: ${(props) => props.width || "500px"};
    height: ${(props) => props.height || "350px"};
    border: 1px solid grey;
    border-radius: 5px;
`;

export const Input = styled.input<InputProps>`
    margin: ${(props) => props.margin || "10px 0"};
    padding: ${(props) => props.padding || "10px 0 10px 5px"};
    width: ${(props) => props.width || "100%"};
    height: ${(props) => props.height || "35px"};
    font-size: 1rem;
    color: #505050;
`;

export const Button = styled.button<ButtonProps>`
    width: ${(props) => props.width || "130px"};
    height: ${(props) => props.height || "35px"};
    color: ${(props) => props.color || "#ffffff"};
    background: ${(props) => props.background || "#505050"};
    font-size: 1rem;
`;

export const RightButtonDiv = styled.div<RightButtonDivProps>`
    float: left;
    padding: ${(props) => props.padding || "5px 0"};
    width: ${(props) => props.width || "150px"};
    height: ${(props) => props.height || "45px"};
`;

export const LeftButtonDiv = styled.div<LeftButtonDivProps>`
    display: inline-block;
    padding: ${(props) => props.padding || "5px 0"};
    width: ${(props) => props.width || "150px"};
    height: ${(props) => props.height || "45px"};
`;

export const Title = styled.div<TitleProps>`
    margin: ${(props) => props.margin || "10px 0 30px 0"};
    padding: ${(props) => props.padding || "5px 0"};
    text-align: ${(props) => props.textAlign || "Left"};
    font-size: ${(props) => props.fontSize || "2rem"};
    color: ${(props) => props.color || "#505050"};
    font-weight: bold;
`;

export const Table = styled.table<TableProps>`
    border-collapse: collapse;
    min-width: ${(props) => props.minWidth || "500px"};
    min-height: ${(props) => props.minHeight || "300px"};
`;

export const StyledTd = styled.td<TdProps>`
    padding: ${(props) => props.padding || "10px"};
    width: ${(props) => props.width || "300px"};
    height: ${(props) => props.height || "35px"};
    background: ${(props) => props.background || "transparent"};
    text-align: ${(props) => props.textAlign || "left"};
    font-size: ${(props) => props.fontSize || "1rem"};
    font-weight: ${(props) => props.fontWeight || "normal"};
    color: #505050;
`;

export const StyledTr = styled.tr<TrProps>`
    padding: ${(props) => props.padding || "5px 0"};
    width: ${(props) => props.width || "500px"};
`;
