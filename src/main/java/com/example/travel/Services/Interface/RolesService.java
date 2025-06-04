package com.example.travel.Services.Interface;

import com.example.travel.Entities.Roles;

import java.util.List;

public interface RolesService {
    public String addRole(Roles role);
    public List<Roles> getAllRoles();
    public Roles getRole(Integer id);
    public String deleteRole(Integer id);
    public String updateRole(Roles role, Integer id);

}
