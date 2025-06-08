package com.example.travel.Services.Implementation;

import com.example.travel.Config.FileStorageService;
import com.example.travel.Entities.Destination;
import com.example.travel.Repositories.DestinationRepository;
import com.example.travel.Services.Interface.DestinationService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Data
@Service
@Transactional

public class DestinationServiceIpmpl implements DestinationService {


    private final DestinationRepository destinationRepository;
    private final FileStorageService fileStorageService;
    public DestinationServiceIpmpl(DestinationRepository destinationRepository,FileStorageService fileStorageService) {
        this.destinationRepository = destinationRepository;
        this.fileStorageService = fileStorageService;
    }

    @Override
    public String addDestionation(Destination destination, MultipartFile file) {
        if (destination.getNom() == null  || destination.getLieu() == null
                 || destination.getTypeVoyage() == null
                || destination.getPrix() == null || destination.getDateDebut() == null || destination.getDateFin() == null
                || destination.getNombrePlace() == null || destination.getDescription() == null
                ){
            return "error";
        }
        if(destination.getDateDebut().isAfter(destination.getDateFin())){
            return "error date";
        }


        if (file == null || file.isEmpty()) {
            return "error image";
        }
        // Build a unique, safe filename
        String original = file.getOriginalFilename();
        String ext = "";
        if (original != null && original.contains(".")) {
            ext = original.substring(original.lastIndexOf('.'));
        }
        String safeName = UUID.randomUUID().toString() + ext;

        // Save file to disk
        fileStorageService.storeFile(file, safeName);

        //  Stamp the Destination with that filename
        destination.setImage(safeName);
        destinationRepository.save(destination);
        return "success";
    }

    @Override
    public String updateDestination(Destination destination,MultipartFile file, Integer id) {
        Destination oldDestination = destinationRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("destination not found"));
        if(destination.getNom() != null){
            oldDestination.setNom(destination.getNom());
        }
        if(destination.getLieu() != null){
            oldDestination.setLieu(destination.getLieu());
        }
        if(destination.getTypeVoyage() != null){
            oldDestination.setTypeVoyage(destination.getTypeVoyage());
        }
        if(destination.getPrix() != null){
            oldDestination.setPrix(destination.getPrix());
        }
        if(destination.getDateDebut() != null){
            oldDestination.setDateDebut(destination.getDateDebut());
        }
        if(destination.getDateFin() != null){
            oldDestination.setDateFin(destination.getDateFin());
        }
        if(destination.getNombrePlace() != null){
            oldDestination.setNombrePlace(destination.getNombrePlace());
        }
        if(destination.getDescription() != null){
            oldDestination.setDescription(destination.getDescription());
        }
        if(file != null ) {
            String original = file.getOriginalFilename();
            String ext = "";
            if (original != null && original.contains(".")) {
                ext = original.substring(original.lastIndexOf('.'));
            }
            String safeName = UUID.randomUUID().toString() + ext;
            fileStorageService.storeFile(file, safeName);
            oldDestination.setImage(safeName);
        }
        destinationRepository.save(oldDestination);
        return "success";
    }

    @Override
    public String deleteDestination(Integer id) {
        Destination destination = destinationRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("destination not found"));
        destinationRepository.deleteById(id);
        return "success";
    }

    @Override
    public Destination getDestination(Integer id) {
        Optional<Destination> optionalDestination = destinationRepository.findById(id);
        assert optionalDestination.isPresent();
        return optionalDestination.get();
    }
    @Override
    public List<Destination> getDestinations() {
        return destinationRepository.findAll();
    }
}
