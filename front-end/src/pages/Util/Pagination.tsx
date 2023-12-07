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
    const { totalPages = 0, currentPage } = paginationInfo;

    console.log("Total Pages:", totalPages);
    console.log("Current Pages:", currentPage);

    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1,
    );

    console.log("pageNumbers", pageNumbers);

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
