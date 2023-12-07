import React, { ReactElement } from "react";
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
    const { totalPages, currentPage } = paginationInfo;

    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1,
    );

    return (
        <PageContainer>
            {pageNumbers.map((number) => (
                <PageNumber
                    key={number}
                    className={currentPage === number ? "active" : ""}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </PageNumber>
            ))}
        </PageContainer>
    );
};

export default Pagination;
