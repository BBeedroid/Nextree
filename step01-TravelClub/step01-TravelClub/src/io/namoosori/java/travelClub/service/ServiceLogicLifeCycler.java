package io.namoosori.java.travelClub.service;

import io.namoosori.java.travelClub.service.logic.ClubServiceLogic;

public class ServiceLogicLifeCycler {
    private static ServiceLogicLifeCycler uniqueInstance;
    private ClubService clubService;

    private ServiceLogicLifeCycler() {
        this.clubService = new ClubServiceLogic();
    }

    public static ServiceLogicLifeCycler getUniqueInstance() {
        if(uniqueInstance == null) {
            uniqueInstance = new ServiceLogicLifeCycler();
        }

        return uniqueInstance;
    }

    public ClubService getClubService() {
        return this.clubService;
    }
}
