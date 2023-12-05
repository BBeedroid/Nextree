export const dateFormat = (dateTimeStr: string): string => {
    return dateTimeStr.split("T")[0];
};

export const toggleModal = (
    setModalState: React.Dispatch<React.SetStateAction<boolean>>,
): (() => void) => {
    return () => {
        console.log("modal toggling");
        setModalState((prevState) => !prevState);
    };
};
