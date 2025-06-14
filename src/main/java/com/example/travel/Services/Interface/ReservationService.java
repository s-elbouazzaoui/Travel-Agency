package com.example.travel.Services.Interface;

import com.example.travel.Entities.Offre;
import com.example.travel.Entities.Reservation;

import java.util.List;

public interface ReservationService {
    public String addReservation(Reservation reservation);
    public String updateReservation(Reservation reservation,Integer id);
    public String deleteReservation(Integer id);
    public Reservation getReservationById(Integer id);
    public List<Reservation> getAllReservations();
    public List<Reservation> getReservationsByUser(Integer id);
    public String approveReservation(Integer id);
    public String rejectReservation(Integer id);
    public String cancelReservation(Integer id);
}
