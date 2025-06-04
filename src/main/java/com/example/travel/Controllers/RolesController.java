package com.example.travel.Controllers;

import com.example.travel.Entities.Roles;
import com.example.travel.Services.Interface.RolesService;
import lombok.Data;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/api/roles")
public class RolesController {

    private final RolesService rolesService;

    public RolesController(RolesService rolesService) {
        this.rolesService = rolesService;
    }

    @GetMapping("")
    public ResponseEntity<List<Roles>> getAllRoles() {
        List<Roles> roles = rolesService.getAllRoles();
        if(roles==null || roles.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(rolesService.getAllRoles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Roles> getRoleById(@PathVariable int id) {
        return ResponseEntity.ok(rolesService.getRole(id));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addRole(@Validated @RequestBody Roles role) {
        Map<String,String> response = new HashMap<>();
        String result = rolesService.addRole(role);
        if(result.equals("success")) {
            response.put("message","Role added successfully");
        }
        else{
            response.put("message","Role not added");
        }
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> updateRole(@PathVariable int id, @RequestBody Roles role) {
        Map<String,String> response = new HashMap<>();
        String result = rolesService.updateRole(role,id);
        if(result.equals("success")) {
            response.put("message","Role updated successfully");
        }
        else{
            response.put("message","Role not updated");
        }
        return ResponseEntity.ok().body(response);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRole(@PathVariable int id) {
        Map<String,String> response = new HashMap<>();
        String result = rolesService.deleteRole(id);
        if(result.equals("success")) {
            response.put("message","Role deleted successfully");
        }
        else{
            response.put("message","Role not deleted");
        }
        return ResponseEntity.ok().body(response);
    }
}
