package com.example.travel.Services.Implementation;

import com.example.travel.Entities.Destination;
import com.example.travel.Entities.Offre;
import com.example.travel.Entities.Reservation;
import com.example.travel.Entities.Status;
import com.example.travel.Repositories.DestinationRepository;
import com.example.travel.Repositories.OffreRepository;
import com.example.travel.Repositories.ReservationRepository;
import com.example.travel.Services.Interface.ReservationService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.nio.channels.NotYetBoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Data
@Transactional
@Service

public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final DestinationRepository destinationRepository;
    private final OffreRepository offreRepository;
    private double prixTotal;
    public ReservationServiceImpl(ReservationRepository reservationRepository,DestinationRepository destinationRepository,OffreRepository offreRepository) {
        this.reservationRepository = reservationRepository;
        this.destinationRepository = destinationRepository;
        this.offreRepository = offreRepository;

    }
    @Override
    public String addReservation(Reservation reservation) {

        if (reservation.getNombrePlace() == null || reservation.getDateReservation() == null || reservation.getDestination() == null || reservation.getUser() == null) {
            return "error fields";
        } else {
            Destination destination = destinationRepository.findById(reservation.getDestination().getId()).orElse(null);
            assert destination != null;
            if (reservation.getDateReservation().toLocalDate().isBefore(destination.getDateDebut()) || reservation.getDateReservation().toLocalDate().isAfter(destination.getDateFin()) || reservation.getNombrePlace() > destination.getNombrePlace()) {
                return "date or places error";
            } else {
                if (reservation.getOffre() != null) {
                    Offre offre = offreRepository.findById(reservation.getOffre().getId()).orElse(null);
                    assert offre != null;
                    if (offre.getDestination().getId().equals(reservation.getDestination().getId())) {

                        prixTotal = reservation.getNombrePlace() * destination.getPrix();
                        double discount = (offre.getPourcentage()/100.0);
                        prixTotal -= prixTotal*discount;
                        reservation.setMontant((long) prixTotal);
                    } else {
                        prixTotal = reservation.getNombrePlace() * destination.getPrix();
                        reservation.setMontant((long) prixTotal);
                    }

                }
                    reservation.setStatus(Status.PENDING);
                    reservationRepository.save(reservation);
                    return "success";
                }
            }

    }

    @Override
    public String updateReservation(Reservation reservation,Integer id) {
        Reservation oldReservation = reservationRepository.findById(id).orElse(null);
        Destination destination = destinationRepository.findById(reservation.getDestination().getId()).orElse(null);
        assert oldReservation != null;
        if(reservation.getDateReservation()==null ||reservation.getNombrePlace()==null||reservation.getDestination()==null){
            return "error fields";
        }
        else{
            assert destination != null;
            if (reservation.getDateReservation().toLocalDate().isBefore(destination.getDateDebut()) || reservation.getDateReservation().toLocalDate().isAfter(destination.getDateFin()) ) {
                return "date or places error";
            }
            else{
                oldReservation.setDateModification(LocalDateTime.now());
                oldReservation.setDateReservation(reservation.getDateReservation());
            }
            if(reservation.getNombrePlace() < destination.getNombrePlace()){
                oldReservation.setNombrePlace(reservation.getNombrePlace());
            }
            if (reservation.getOffre() != null) {
                Offre offre = offreRepository.findById(reservation.getOffre().getId()).orElse(null);
                assert offre != null;
                if (offre.getDestination().getId().equals(reservation.getDestination().getId())) {

                    prixTotal = reservation.getNombrePlace() * destination.getPrix();
                    double discount = (offre.getPourcentage()/100.0);
                    prixTotal -= prixTotal*discount;
                    oldReservation.setMontant((long) prixTotal);
                    oldReservation.setOffre(reservation.getOffre());
                } else {
                    prixTotal = reservation.getNombrePlace() * destination.getPrix();
                    oldReservation.setMontant((long) prixTotal);
                }
            }
            else{
                prixTotal = reservation.getNombrePlace() * destination.getPrix();
                oldReservation.setMontant((long) prixTotal);
                oldReservation.setOffre(null);

            }
            if(oldReservation.getStatus() == Status.APPROVED || oldReservation.getStatus() == null){
                oldReservation.setStatus(Status.PENDING);
            }
            reservationRepository.save(oldReservation);
            return "success";
        }
    }

    @Override
    public String deleteReservation(Integer id) {
        Reservation reservation = reservationRepository.findById(id).orElse(null);
        assert reservation != null;
        reservationRepository.deleteById(id);
        return "success";

    }

    @Override
    public Reservation getReservationById(Integer id) {
        Reservation reservation = reservationRepository.findById(id).orElseThrow(()->new EntityNotFoundException("no Reservation has this is"));
        assert reservation != null;
        return reservation;
    }

    @Override
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @Override
    public List<Reservation> getReservationsByUser(Integer id) {
        return reservationRepository.findByUser(id);
    }

    @Override
    public String approveReservation(Integer id) {
        Reservation reservation = reservationRepository.findById(id).orElse(null);
        assert reservation != null;
        reservation.setStatus(Status.APPROVED);
        reservation.setDateModification(LocalDateTime.now());
        reservationRepository.save(reservation);
        return "success";
    }

    @Override
    public String rejectReservation(Integer id) {
        Reservation reservation = reservationRepository.findById(id).orElse(null);
        assert reservation != null;
        reservation.setStatus(Status.REJECTED);
        reservation.setDateModification(LocalDateTime.now());
        reservationRepository.save(reservation);
        return "success";
    }

    @Override
    public String cancelReservation(Integer id) {
        Reservation reservation = reservationRepository.findById(id).orElse(null);
        assert reservation != null;
        reservation.setStatus(Status.CANCELLED);
        reservation.setDateModification(LocalDateTime.now());
        reservationRepository.save(reservation);
        return "success";
    }
}
