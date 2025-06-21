package com.example.travel.Controllers;


import com.example.travel.Entities.Reservation;
import com.example.travel.Services.Interface.ReservationService;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Data
@Validated
@RequestMapping("/api/reservations")
public class ReservationController {
    private ReservationService reservationService;
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }


    @GetMapping("")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReservationById(@PathVariable("id") Integer id) {
        Reservation reservation = reservationService.getReservationById(id);
        if (reservation == null) {
            return ResponseEntity.ok().body("not found");
        }
        else{
            return ResponseEntity.ok(reservation);
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getReservationByUser(@PathVariable("id") Integer id) {
        List<Reservation> reservations = reservationService.getReservationsByUser(id);
        if (reservations.isEmpty()) {
            return ResponseEntity.ok().body("not found");
        }
        else {
            return ResponseEntity.ok(reservations);
        }
    }



    @PostMapping("/add")
    public ResponseEntity<?> addReservation(@RequestBody Reservation reservation) {
        String result = reservationService.addReservation(reservation);
        Map<String,String> response = new HashMap<>();
        if(result.equals("date or places error")){
            response.put("message", "date error");
            return ResponseEntity.badRequest().body(response);
        }
        else{
            response.put("message", "pass ig");
            return ResponseEntity.ok().body(response);
        }


    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateReservation(@PathVariable("id") Integer id, @RequestBody Reservation reservation) {
        String result = reservationService.updateReservation(reservation,id);
        Map<String,String> response = new HashMap<>();
        if(result.equals("date or places error") || result.equals("error fields")){
            response.put("message", "date of fields error");
        }
        else{
            response.put("message", "pass ig");

        }
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable("id") Integer id) {
        String result = reservationService.deleteReservation(id);
        Map<String,String> response = new HashMap<>();
        if(result.equals("success")){
            response.put("message", "success");
            return ResponseEntity.ok().body(response);
        }
        else{
            response.put("message", "fail");
            return ResponseEntity.badRequest().body(response);
        }

    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<?> approveReservation(@PathVariable("id") Integer id) {
        String result = reservationService.approveReservation(id);
        Map<String,String> response = new HashMap<>();
        if(result.equals("success")){
            response.put("message", "success");
        }
        else{
            response.put("message", "fail");
        }
        return ResponseEntity.ok().body(response);
    }
    @PutMapping("cancel/{id}")
    public ResponseEntity<?> cancelReservation(@PathVariable("id") Integer id) {
        String result = reservationService.cancelReservation(id);
        Map<String,String> response = new HashMap<>();
        if(result.equals("success")){
            response.put("message", "success");

        }
        else{
            response.put("message", "fail");
        }
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/reject/{id}")
    public ResponseEntity<?> rejectReservation(@PathVariable("id") Integer id) {
        String result = reservationService.rejectReservation(id);
        Map<String,String> response = new HashMap<>();
        if(result.equals("success")){
            response.put("message", "success");
        }
        else{
            response.put("message", "fail");
        }
        return ResponseEntity.ok().body(response);
    }

}
