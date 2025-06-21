package com.example.travel.Services.Implementation;


import com.example.travel.Entities.Roles;
import com.example.travel.Entities.User;
import com.example.travel.Repositories.RolesRepository;
import com.example.travel.Repositories.UserRepository;
import com.example.travel.Services.Interface.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import javax.management.relation.Role;
import java.util.List;
@Data
@Service
@Transactional

public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    private final RolesRepository rolesRepository;
    public UserServiceImpl(UserRepository userRepository, RolesRepository rolesRepository) {
        this.userRepository = userRepository;
        this.rolesRepository = rolesRepository;

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
    public String updateAdminUser(User user, Integer id) {
        User oldUser = userRepository.findById(id).orElseThrow(()->new EntityNotFoundException("User not found"));
        if(user.getName()!=null){
            oldUser.setName(user.getName());
        }
        if(user.getEmail()!=null){
            oldUser.setEmail(user.getEmail());
        }
        if(user.getRole()!=null){
            oldUser.setRole(user.getRole());
        }
        if(user.getPassword()!=null){
            oldUser.setPassword(user.getPassword());
        }
        userRepository.save(oldUser);
        return "success";
    }

    @Override
    public String updateUser(User user, Integer id) {
        User oldUser = userRepository.findById(id).orElseThrow(()->new EntityNotFoundException("User not found"));
        if(user.getName()!=null){
            oldUser.setName(user.getName());
        }
        if(user.getEmail()!=null){
            oldUser.setEmail(user.getEmail());
        }
        if(user.getPassword()!=null){
            oldUser.setPassword(user.getPassword());
        }
        userRepository.save(oldUser);
        return "success";
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

    @Override
    public User getUserLogs(String email, String password) {
        User user = userRepository.getUserLogin(email, password);
        if(user==null){
            throw new EntityNotFoundException("User not found");
        }
        else{
            return user;
        }
    }


    @Override
    public String register(User user){

        if(user.getEmail() == null || user.getEmail().isEmpty()  || user.getPassword()==null
                || user.getPassword().isEmpty() ||user.getName()==null || user.getName().isEmpty()) {
            return "error";
        }
        else {
            Roles role = new Roles();
            role.setId(2);
            user.setRole(role);
            userRepository.save(user);
            return "success";
        }
    }
}
