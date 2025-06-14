package com.example.travel.Repositories;

import com.example.travel.Entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    @Query("select r from Reservation r where r.user.id =:id")
    List<Reservation> findByUser(@Param("id") Integer id);

}
