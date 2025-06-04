package com.example.travel.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.relational.core.sql.In;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity

public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer score;
    private String description;
    @ManyToOne
    private User user;
    @ManyToOne
    private Destination destination;
}
