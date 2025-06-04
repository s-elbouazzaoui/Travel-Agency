package com.example.travel.Services.Implementation;

import com.example.travel.Entities.Roles;
import com.example.travel.Repositories.RolesRepository;
import com.example.travel.Services.Interface.RolesService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static org.apache.logging.log4j.ThreadContext.isEmpty;

@Data
@Service
@Transactional
public class RolesServiceImpl implements RolesService {

    private final RolesRepository rolesRepository;


    public RolesServiceImpl(RolesRepository rolesRepository) {
        this.rolesRepository = rolesRepository;
    }


    @Override
    public String addRole(Roles role) {
        if(role.getLibelle()==null || role.getLibelle().isEmpty()) {
            return "error";
        }
        else {
            rolesRepository.save(role);
            return "success";
        }
    }

    @Override
    public List<Roles> getAllRoles() {
        return rolesRepository.findAll();
    }

    @Override
    public Roles getRole(Integer id) {
        return rolesRepository.findById(id).orElseThrow(() -> new RuntimeException("error"));
    }

    @Override
    public String deleteRole(Integer id) {
        Roles role = rolesRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("error"));
        rolesRepository.delete(role);
        return "success";
    }

    @Override
    public String updateRole(Roles role, Integer id) {
        Roles oldRole = rolesRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("error"));
        if(role.getLibelle()!=null) {
            oldRole.setLibelle(role.getLibelle());
        }
        if(oldRole.getDescription()!=null) {
            oldRole.setDescription(role.getDescription());
        }
        rolesRepository.save(oldRole);
        return "success";
    }
}
