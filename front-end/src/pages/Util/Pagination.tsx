import React, { ReactElement, useState } from "react";
import { PaginationInfo } from "./dtoTypes";
import { PageContainer, PageNumber } from "../../styles/theme";

interface PaginationProps {
    paginationInfo: PaginationInfo;
    onPageChange: (page: number) => void;
}

const Pagination = ({
    paginationInfo,
    onPageChange,
}: PaginationProps): ReactElement => {
    const { totalPages = 0, currentPage } = paginationInfo;
    const [pageNumberStart, setPageNumberStart] = useState(1);
    const maxPageNumber = 5;

    const calculatePageNumbers = (): number[] => {
        const end = Math.min(pageNumberStart + maxPageNumber - 1, totalPages);
        return Array.from(
            { length: end - pageNumberStart + 1 },
            (_, index) => pageNumberStart + index,
        );
    };

    const pageNumbers = calculatePageNumbers();

    const handlePrevious = (): void => {
        const newStart = Math.max(1, pageNumberStart - maxPageNumber);
        setPageNumberStart(newStart);
        onPageChange(newStart);
    };

    const handleNext = (): void => {
        const newStart = Math.max(
            totalPages - maxPageNumber + 1,
            pageNumberStart + maxPageNumber,
        );
        setPageNumberStart(newStart);
        onPageChange(newStart);
    };

    return (
        <PageContainer>
            {pageNumberStart > 1 && (
                <PageNumber onClick={handlePrevious}>이전</PageNumber>
            )}
            {pageNumbers.map((number) => (
                <PageNumber
                    key={number}
                    className={currentPage === number ? "active" : ""}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </PageNumber>
            ))}
            {pageNumberStart + maxPageNumber - 1 < totalPages && (
                <PageNumber onClick={handleNext}>다음</PageNumber>
            )}
        </PageContainer>
    );
};

export default Pagination;
