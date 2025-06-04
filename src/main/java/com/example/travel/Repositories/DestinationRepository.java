package com.example.travel.Repositories;

import com.example.travel.Entities.Destination;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DestinationRepository extends JpaRepository<Destination, Integer> {
}
