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
    height?: string;
}

export interface ContainerProps {
    margin?: string;
    padding?: string;
    width?: string;
    height?: string;
    border?: string;
}

export interface InputProps {
    margin?: string;
    padding?: string;
    width?: string;
    height?: string;
}

export interface ButtonProps {
    margin?: string;
    width?: string;
    height?: string;
    color?: string;
    background?: string;
    fontSize?: string;
}

export interface ButtonDivProps {
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
    cursor?: string;
    hoverColor?: string;
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

export interface PointerSpanProps {
    color?: string;
}

export interface ModalProps {
    padding?: string;
    width?: string;
    height?: string;
}

export interface TextareaProps {
    margin?: string;
    padding?: string;
    width?: string;
    minHeight?: string;
    fontSize?: string;
}

export interface TextBoxProps {
    margin?: string;
    padding?: string;
    width?: string;
    minHeight?: string;
    fontSize?: string;
}

export interface PostContainerProps {
    display?: string;
    flex?: string;
    align?: string;
    margin?: string;
    padding?: string;
    width?: string;
    height?: string;
    border?: string;
}

export interface ButtonsProps {
    justify?: string;
    gap?: string;
}

export interface PageContainerProps {
    justify?: string;
    margin?: string;
    padding?: string;
    width?: string;
    height?: string;
}

export interface PageNumberProps {
    margin?: string;
    padding?: string;
    border?: string;
    background?: string;
    fontSize?: string;
    color?: string;
}

export const Box = styled.div<BoxProps>`
    display: flex;
    justify-content: ${(props) => props.justify || "center"};
    align-items: ${(props) => props.align || "center"};
    width: 100vw;
    height: ${(props) => props.height || "75vh"};
`;

export const Container = styled.div<ContainerProps>`
    margin: ${(props) => props.padding};
    padding: ${(props) => props.padding || "10px 20px"};
    width: ${(props) => props.width || "500px"};
    height: ${(props) => props.height || "350px"};
    border: ${(props) => props.border || "1px solid grey"};
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
    margin: ${(props) => props.margin};
    width: ${(props) => props.width || "130px"};
    height: ${(props) => props.height || "35px"};
    color: ${(props) => props.color || "#ffffff"};
    background: ${(props) => props.background || "#505050"};
    font-size: ${(props) => props.fontSize || "1rem"};
`;

export const LeftButtonDiv = styled.div<ButtonDivProps>`
    padding: ${(props) => props.padding || "5px 0"};
    width: ${(props) => props.width || "150px"};
    height: ${(props) => props.height || "45px"};
    float: left;
`;

export const MiddleButtonDiv = styled.div<ButtonDivProps>`
    padding: ${(props) => props.padding || "5px 0"};
    width: ${(props) => props.width || "150px"};
    height: ${(props) => props.height || "45px"};
    float: left;
    margin-left: 5%;
`;

export const RightButtonDiv = styled.div<ButtonDivProps>`
    padding: ${(props) => props.padding || "5px 0"};
    width: ${(props) => props.width || "150px"};
    height: ${(props) => props.height || "45px"};
    float: right;
`;

export const Title = styled.div<TitleProps>`
    margin: ${(props) => props.margin || "10px 0 30px 0"};
    padding: ${(props) => props.padding || "5px 0"};
    text-align: ${(props) => props.textAlign || "Left"};
    font-size: ${(props) => props.fontSize || "2rem"};
    color: ${(props) => props.color || "#505050"};
    cursor: ${(props) => props.cursor || "normal"};
    font-weight: bold;

    &:hover {
        color: ${(props) => (props.hoverColor ? "#FFBE0A" : "#505050")};
    }
`;

export const Table = styled.table<TableProps>`
    border-collapse: collapse;
    min-width: ${(props) => props.minWidth || "500px"};
    min-height: ${(props) => props.minHeight || "100px"};
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

export const PointerSpan = styled.span`
    cursor: pointer;

    &:hover {
        color: ${(props) => props.color || "#FFBE0A"};
    }
`;

export const Modal = styled.div<ModalProps>`
    padding: ${(props) => props.padding || "5px 0"};
    width: ${(props) => props.width || "400px"};
    height: ${(props) => props.height || "450px"};
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    z-index: 11;
`;

export const ModalInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Textarea = styled.textarea<TextareaProps>`
    margin: ${(props) => props.margin || "10px 0"};
    padding: ${(props) => props.padding || "10px 20px"};
    width: ${(props) => props.width || "300px"};
    min-height: ${(props) => props.minHeight || "250px"};
    font-size: ${(props) => props.fontSize || "1rem"};
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
`;

export const TextBox = styled.div<TextBoxProps>`
    margin: ${(props) => props.padding};
    padding: ${(props) => props.padding || "10px 20px"};
    width: ${(props) => props.width || "500px"};
    min-height: ${(props) => props.minHeight || "400px"};
    font-size: ${(props) => props.fontSize || "1rem"};
    border: 1px solid grey;
    border-radius: 5px;
`;

export const PostContainer = styled.div<PostContainerProps>`
    display: ${(props) => props.display || "flex"};
    flex-direction: ${(props) => props.flex || "column"};
    align-items: ${(props) => props.align || "flex-start"};
    margin: ${(props) => props.padding};
    padding: ${(props) => props.padding || "10px 20px"};
    width: ${(props) => props.width || "500px"};
    height: ${(props) => props.height || "350px"};
    border: ${(props) => props.border || "1px solid grey"};
    border-radius: 5px;
`;

export const ButtonsDiv = styled.div<ButtonsProps>`
    display: flex;
    justify-content: ${(props) => props.justify || "flex-start"};
    gap: ${(props) => props.gap || "10px"};
`;

export const PageContainer = styled.div<PageContainerProps>`
    display: flex;
    justify-content: ${(props) => props.justify || "center"};
    margin: ${(props) => props.padding || "10px 0"};
    padding: ${(props) => props.padding || "10px 20px"};
    width: ${(props) => props.width || "500px"};
    height: ${(props) => props.height || "50px"};
`;

export const PageNumber = styled.button<PageNumberProps>`
    margin: ${(props) => props.padding || "0 5px"};
    padding: ${(props) => props.padding || "5px 10px"};
    border: ${(props) => props.border || "1px solid grey"};
    border-radius: 5px;
    background: ${(props) => props.background || "transparent"};
    font-size: ${(props) => props.fontSize || "0.9rem"};
    color: ${(props) => props.color || "#505050"};
    cursor: pointer;

    &.active {
        background: ${(props) => props.background || "#505050"};
        color: ${(props) => props.color || "#FFBE0A"};
    }
`;
