package com.example.travel.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity

public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nom;
    private String lieu;
    private String typeVoyage;
    private Long prix;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dateDebut;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dateFin;

    private Integer nombrePlace;
    private String description;
    private String image;

    @JsonIgnore
    @OneToMany(mappedBy = "destination", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reservation> reservations;

    @JsonIgnore
    @OneToMany(mappedBy = "destination",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Offre>offres;

    @JsonIgnore
    @OneToMany(mappedBy = "destination",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Review>reviews;
}
