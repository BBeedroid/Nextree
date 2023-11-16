package io.namoosori.java.travelClub;

import io.namoosori.java.travelClub.entity.TravelClub;
import io.namoosori.java.travelClub.ui.menu.ClubMenu;
import io.namoosori.java.travelClub.util.DateUtil;

public class StoryAssistant {
    private void startStory() {
        ClubMenu clubMenu = new ClubMenu();
        clubMenu.show();
    }

    public static void main(String[] args) {
        StoryAssistant assistant = new StoryAssistant();
        assistant.startStory();
    }
}
