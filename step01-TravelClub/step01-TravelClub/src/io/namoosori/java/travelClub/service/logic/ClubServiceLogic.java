package io.namoosori.java.travelClub.service.logic;

import io.namoosori.java.travelClub.entity.TravelClub;
import io.namoosori.java.travelClub.service.ClubService;
import io.namoosori.java.travelClub.store.ClubStore;
import io.namoosori.java.travelClub.store.StoreLifeCycler;

import java.util.List;

public class ClubServiceLogic implements ClubService {
    private ClubStore clubStore;

    public ClubServiceLogic() {
        this.clubStore = StoreLifeCycler.getUniqueInstance().requestClubStore();
    }

    @Override
    public void register(TravelClub travelClub) {
        this.clubStore.create(travelClub);
    }

    @Override
    public List<TravelClub> findAll() {
        return this.clubStore.retrieveAll();
    }

    @Override
    public List<TravelClub> findByName(String clubName) {
        return this.clubStore.retrieveAllByName(clubName);
    }

    @Override
    public TravelClub findById(String clubId) {
        return this.clubStore.retrieve(clubId);
    }

    @Override
    public void modify(TravelClub modifyClub) {
        this.clubStore.update(modifyClub);
    }

    @Override
    public void remove(String clubId) {
        this.clubStore.delete(clubId);
    }
}
