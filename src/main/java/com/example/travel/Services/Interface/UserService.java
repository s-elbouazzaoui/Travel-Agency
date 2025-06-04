package com.example.travel.Services.Interface;

import com.example.travel.Entities.User;

import java.util.List;

public interface UserService {
    public String addUser(User user);
    public String updateUser(User user,Integer id);
    public String deleteUser(Integer id);
    public List<User> getAllUsers();
    public User getUser(Integer id);



}
