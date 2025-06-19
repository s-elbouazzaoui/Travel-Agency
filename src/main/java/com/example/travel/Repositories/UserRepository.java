package com.example.travel.Repositories;

import com.example.travel.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("select u from User u where u.email =:email and u.password =:password")
    User getUserLogin(@Param("email") String email, @Param("password") String password);
}
