package com.example.travel.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Offre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String libelle;
    private String description;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private Long pourcentage;
    private Integer nombrePlace;
    @ManyToOne
    private Destination destination;

    @OneToMany(mappedBy = "offre",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonIgnore
    private List<Reservation> reservations;



}
