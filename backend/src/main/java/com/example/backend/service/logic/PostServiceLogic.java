package com.example.backend.service.logic;

import com.example.backend.dto.PostDTO;
import com.example.backend.entity.*;
import com.example.backend.service.PostService;
import com.example.backend.store.BoardStore;
import com.example.backend.store.ClubStore;
import com.example.backend.store.MemberStore;
import com.example.backend.store.PostStore;
import com.example.backend.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostServiceLogic implements PostService {
    private final PostStore postStore;
    private final BoardStore boardStore;
    private final MemberStore memberStore;
    private final ClubStore clubStore;

    @Override
    @Transactional
    public void register(Long boardId, PostDTO postDTO, Long currentUserId) {
        Board board = boardStore.findById(boardId)
                .orElseThrow(() -> new NoSuchBoardException("No such board with id : " + boardId));
        Member currentMember = memberStore.findById(currentUserId)
                .orElseThrow(() -> new NoSuchMemberException("No such member with id : " + currentUserId));
        Club club = board.getClub();

        boolean isMember = club.getMemberships().stream()
                .anyMatch(membership -> membership.getMember().equals(currentMember));

        if (!isMember) {
            throw new NotInClubException("Not a member of the club.");
        }

        Post post = postDTO.DTOToEntity();
        post.setBoard(board);
        post.setMember(currentMember);
        postStore.save(post);
    }

    @Override
    public PostDTO findPost(Long postId) {
        return postStore.findById(postId)
                .map(post -> new PostDTO(post))
                .orElseThrow(() -> new NoSuchPostingException("No such post with id : " + postId));
    }

    @Override
    public List<PostDTO> findByTitleInBoard(Long boardId, String postTitle) {
        boardStore.findById(boardId)
                .orElseThrow(() -> new NoSuchBoardException("No such board with id : " + boardId));

        List<Post> posts = postStore.findByBoard_BoardIdAndPostTitle(boardId, postTitle);
        if (posts.isEmpty()) {
            throw new NoSuchPostingException("No posts with the title : " + postTitle);
        }

        return posts.stream()
                .map(Post::EntityToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<PostDTO> findByBoard(Long boardId) {
        boardStore.findById(boardId)
                .orElseThrow(() -> new NoSuchBoardException("No such board with id : " + boardId));

        List<Post> posts = postStore.findByBoard_BoardId(boardId);
        if (posts.isEmpty()) {
                throw new NoSuchPostingException("No posts in the board.");
        }

        return posts.stream()
                .map(Post::EntityToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<PostDTO> findByClubAndMember(Long clubId, Long memberId) {
        Club club = clubStore.findById(clubId)
                .orElseThrow(() -> new NoSuchClubException("No such club with id : " + clubId));
        Member member = memberStore.findById(memberId)
                .orElseThrow(() -> new NoSuchMemberException("No such member with id : " + memberId));

        List<Post> posts = postStore.findByBoard_ClubAndMember(club, member);
        if (posts.isEmpty()) {
            throw new NoSuchPostingException("No posts in the club.");
        }

        return posts.stream()
                .map(Post::EntityToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PostDTO modify(Long postId, PostDTO postDTO, Long currentUserId) {
        Post targetPost = postStore.findById(postId)
                .orElseThrow(() -> new NoSuchPostingException("No such post with id : " + postId));

        if (targetPost.getMember().getMemberId() != currentUserId) {
            throw new NoAuthorityForModifyPost("Only the writer can modify the post.");
        }

        targetPost.setPostTitle(postDTO.getPostTitle());
        targetPost.setPostContent(postDTO.getPostContent());

        return new PostDTO(targetPost);
    }

    @Override
    @Transactional
    public void remove(Long postId, Long currentUserId) {
        Post post = postStore.findById(postId)
                .orElseThrow(() -> new NoSuchPostingException("No such post with id : " + postId));

        Role currentUserRole = getCurrentUserRoleInClub(post.getBoard().getClub().getClubId(), currentUserId);
        if (!(currentUserRole == Role.PRESIDENT || currentUserId == post.getMember().getMemberId())) {
            throw new NoAuthorityForDeletePost("Only the writer or the president can delete the post.");
        }

        System.out.println("role : " + currentUserRole);
        System.out.println("id : " + currentUserId);

        postStore.delete(post);
    }

    private Role getCurrentUserRoleInClub(Long clubId, Long currentUserId) {
        Club club = clubStore.findById(clubId)
                .orElseThrow(() -> new NoSuchClubException("No such club with id : " + clubId));

        return club.getMemberships().stream()
                .filter(membership -> membership.getMember().getMemberId() == currentUserId)
                .findFirst()
                .map(Membership::getRole)
                .orElseThrow(() -> new NotInClubException("Current User is not in this club."));
    }
}
