package io.namoosori.java.travelClub.service;

import io.namoosori.java.travelClub.entity.TravelClub;

public interface ClubService {
    void register(TravelClub travelClub);
    TravelClub[] findAll();
    TravelClub[] findByName(String clubName);
    TravelClub findById(String clubId);

    void modify(TravelClub modifyClub);
    void remove(String clubId);
}
