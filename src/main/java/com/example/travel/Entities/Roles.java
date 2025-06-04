package com.example.travel.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Roles")

public class Roles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true)
    private String libelle;
    private String description;
    @JsonIgnore
    @OneToMany(mappedBy = "role",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<User> users;

}
