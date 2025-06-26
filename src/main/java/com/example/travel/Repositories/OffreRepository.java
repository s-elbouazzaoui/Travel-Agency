package com.example.travel.Repositories;

import com.example.travel.Entities.Offre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OffreRepository extends JpaRepository<Offre, Integer> {

    @Query("select o from Offre o where o.destination.id =:id")
    List<Offre> getOffreByDestinationId(@Param("id") Integer id);

}
