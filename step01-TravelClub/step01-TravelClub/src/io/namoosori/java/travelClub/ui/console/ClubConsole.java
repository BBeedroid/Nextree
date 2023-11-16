package io.namoosori.java.travelClub.ui.console;

import io.namoosori.java.travelClub.entity.TravelClub;
import io.namoosori.java.travelClub.service.ClubService;
import io.namoosori.java.travelClub.service.ServiceLogicLifeCycler;
import io.namoosori.java.travelClub.util.ConsoleUtil;

import java.util.List;

public class ClubConsole {
    private ConsoleUtil consoleUtil;
    private ClubService clubService;

    public ClubConsole() {
        this.consoleUtil = new ConsoleUtil();
        this.clubService = ServiceLogicLifeCycler.getUniqueInstance().getClubService();
    }

    public void register() {
        //
        while (true) {
            String clubName = consoleUtil.getValueOf("Club Name(0.Club menu)");
            if (clubName.equals("0")) {
                return;
            }

            String intro = consoleUtil.getValueOf("Club Intro(0.Club menu)");
            if (intro.equals("0")) {
                return;
            }

            TravelClub newClub = new TravelClub(clubName, intro);

            clubService.register(newClub);

            System.out.println("Registered club : " + newClub);
        }
    }

    public void findAll() {
        List<TravelClub> foundClubs = clubService.findAll();

        if (foundClubs.isEmpty()) {
            System.out.println("Empty");
        }

        for (TravelClub club : foundClubs) {
            System.out.println(club.toString());
        }
    }

    public void findById() {
        TravelClub foundClub = null;

        while (true) {
            String clubId = consoleUtil.getValueOf("Club id to find(0.Club Menu)");
            if (clubId.equals("0")) {
                break;
            }

            foundClub = clubService.findById(clubId);

            if (foundClub != null) {
                System.out.println(foundClub);
            } else {
                System.out.println("Can not find club, ID : " + clubId);
            }
        }
    }

    public void findByName() {
        List<TravelClub> foundClubs = null;

        while (true) {
            String clubName = consoleUtil.getValueOf("Club name to find(0.Club Menu)");
            if (clubName.equals("0")) {
                break;
            }

            foundClubs = clubService.findByName(clubName);

            if (foundClubs != null && !foundClubs.isEmpty()) {
                for (TravelClub club : foundClubs) {
                    System.out.println(club);
                }
            } else {
                System.out.println("Can not find club, name : " + clubName);
            }
        }
    }

    private TravelClub findOne() {
        TravelClub foundClub = null;

        while (true) {
            String clubId = consoleUtil.getValueOf("Club id to find(0.Club Menu)");
            if (clubId.equals("0")) {
                break;
            }

            foundClub = clubService.findById(clubId);

            if (foundClub != null) {
                break;
            } else {
                System.out.println("Can not find club, ID : " + clubId);
            }
        }

        return foundClub;
    }

    public void modify() {
        TravelClub targetClub = findOne();
        if (targetClub == null) {
            return;
        }

        String newName = consoleUtil.getValueOf("New Club Name(0.Club Menu, Enter. No Change)");
        if (newName.equals("0")) {
            return;
        }
        if (!newName.isEmpty()) {
            targetClub.setClubName(newName);
        }

        String newIntro = consoleUtil.getValueOf("New Club Intro(0.Club Menu, Enter. No Change)");
        if (!newIntro.isEmpty()) {
            targetClub.setIntro(newIntro);
        }

        clubService.modify(targetClub);

        System.out.println("Modified club : " + targetClub);
    }

    public void remove() {
        TravelClub targetClub = findOne();
        if (targetClub == null) {
            return;
        }

        String confirmStr = consoleUtil.getValueOf("Remove this club? (Y: yes, N: no)");
        if (confirmStr.toLowerCase().equals("y") || confirmStr.toLowerCase().equals("yes")) {
            System.out.println("Removing the club : " + targetClub.getClubName());
            clubService.remove(targetClub.getId());
        } else {
            System.out.println("Cancelled remove, your club is safe : " + targetClub.getClubName());
        }
    }
}
