package com.example.travel.Services.Interface;

import com.example.travel.Entities.User;

import java.util.List;

public interface UserService {
    public String addUser(User user);
    public String updateAdminUser(User user,Integer id);
    public String updateUser(User user, Integer id);
    public String deleteUser(Integer id);
    public List<User> getAllUsers();
    public User getUser(Integer id);

    public User getUserLogs(String email,String password);
    public String register(User user);



}
