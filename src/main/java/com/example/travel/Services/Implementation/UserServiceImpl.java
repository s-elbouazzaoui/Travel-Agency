package com.example.travel.Services.Implementation;


import com.example.travel.Entities.User;
import com.example.travel.Repositories.UserRepository;
import com.example.travel.Services.Interface.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
@Data
@Service
@Transactional

public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;

    }
    @Override
    public String addUser(User user) {
        if(user.getEmail() == null || user.getEmail().isEmpty() || user.getRole()==null || user.getPassword()==null
                || user.getPassword().isEmpty() ||user.getName()==null || user.getName().isEmpty()) {
            return "error";
        }
        else {
            userRepository.save(user);
            return "success";
        }
    }

    @Override
    public String updateUser(User user, Integer id) {
        return "";
    }

    @Override
    public String deleteUser(Integer id) {
        User user = userRepository.findById(id).orElseThrow(()->new EntityNotFoundException("error"));
        userRepository.delete(user);
        return "success";
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(Integer id) {
        return userRepository.findById(id).orElseThrow(()->new EntityNotFoundException("error"));
    }
}
