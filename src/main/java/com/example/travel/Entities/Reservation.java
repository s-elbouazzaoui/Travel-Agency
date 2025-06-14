package com.example.travel.Entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity


public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private LocalDateTime dateReservation;
    @Enumerated(EnumType.STRING)
    private Status status;
    private Long montant;
    private Integer nombrePlace;
    private LocalDateTime dateModification;

    @ManyToOne
    private User user;
    @ManyToOne
    private Destination destination;
    @ManyToOne
    private Offre offre;
}
