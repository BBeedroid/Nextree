export interface PaginationInfo {
    totalPages?: number;
    currentPage?: number;
    totalElements?: number;
}

export interface ResponseDTO<T> {
    items?: T[];
    item?: T;
    errorMessage?: string;
    statusCode?: number;
    lastPage?: boolean;
    paginationInfo?: PaginationInfo;
}

export interface MembershipDTO {
    membershipId?: number;
    role?: string;
    createdTime?: string;
    updatedTime?: string;
    memberId?: number;
    clubId?: number;
    memberNickname?: string;
    clubName?: string;
}

export interface MemberDTO {
    memberId?: number;
    memberEmail?: string;
    memberPassword?: string;
    memberNickname?: string;
    memberTel?: string;
    memberZipcode?: string;
    memberAddress?: string;
    memberDetailAddress?: string;
    createdTime?: string;
    updatedTime?: string;
    memberships?: MembershipDTO[];
}

export interface ClubDTO {
    clubId?: number;
    clubName?: string;
    clubIntro?: string;
    createdTime?: string;
    updatedTime?: string;
    memberships?: MembershipDTO[];
}

export interface LoginDTO {
    memberEmail?: string;
    memberPassword?: string;
}

export interface BoardDTO {
    boardId?: number;
    boardTitle?: string;
    createdTime?: string;
    updatedTime?: string;
    clubId?: number;
}

export interface PostDTO {
    postId?: number;
    postTitle?: string;
    postContent?: string;
    postViewCount?: number;
    createdTime?: string;
    updatedTime?: string;
    boardId?: number;
    memberId?: number;
    memberNickname?: string;
}
