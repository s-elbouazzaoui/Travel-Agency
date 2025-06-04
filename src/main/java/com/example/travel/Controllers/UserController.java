package com.example.travel.Controllers;

import com.example.travel.Entities.User;
import com.example.travel.Services.Interface.UserService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Validated
@Controller
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public ResponseEntity<List<User>> getAllUser() {
        List<User> users = userService.getAllUsers();
        if(users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.ok().body(users);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id) {
        User user = userService.getUser(id);
        if(user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        Map<String,String> response = new HashMap<>();
        String result = userService.addUser(user);
        if(result.equals("success")) {
            response.put("message", "User added successfully");
        }
        else {
            response.put("message", "Error adding user");
        }
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") Integer id, @RequestBody User user) {
        Map<String,String> response = new HashMap<>();
        String result = userService.updateAdminUser(user,id);
        if(result.equals("success")) {
            response.put("message", "User updated successfully");
        }
        else {
            response.put("message", "Error updating user");
        }
        return ResponseEntity.ok().body(response);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        Map<String,String> response = new HashMap<>();
        String result = userService.deleteUser(id);
        if(result.equals("success")) {
            response.put("message", "User deleted successfully");
        }
        else {
            response.put("message", "Error deleting user");
        }
        return ResponseEntity.ok().body(response);
    }


}
