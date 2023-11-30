package com.example.backend.service.logic;

import com.example.backend.dto.BoardDTO;
import com.example.backend.entity.Board;
import com.example.backend.entity.Club;
import com.example.backend.entity.Membership;
import com.example.backend.entity.Role;
import com.example.backend.service.BoardService;
import com.example.backend.store.BoardStore;
import com.example.backend.store.ClubStore;
import com.example.backend.util.NoPermissionToCreateBoard;
import com.example.backend.util.NoSuchClubException;
import com.example.backend.util.NotInClubException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardServiceLogic implements BoardService {
    private final ClubStore clubStore;
    private final BoardStore boardStore;

    @Override
    @Transactional
    public void register(Long clubId, BoardDTO boardDTO, Long currentUserId) {
        Club club = clubStore.findById(clubId)
                .orElseThrow(() -> new NoSuchClubException("No such club with id : " + clubId));
        Role currentUserRole = getCurrentUserRoleInClub(clubId, currentUserId);
        if (currentUserRole != Role.PRESIDENT) {
            throw new NoPermissionToCreateBoard("Only the president can create board.");
        }

        Board board = boardDTO.DTOToEntity();
        board.setClub(club);
        boardStore.save(board);
    }

    @Override
    public BoardDTO find(Long boardId) {
        return null;
    }

    @Override
    public List<BoardDTO> findByTitle(String boardTitle) {
        return null;
    }

    @Override
    public BoardDTO findByClubName(String clubName) {
        return null;
    }

    @Override
    public void modify(BoardDTO boardDTO) {

    }

    @Override
    public void remove(Long boardId) {

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
