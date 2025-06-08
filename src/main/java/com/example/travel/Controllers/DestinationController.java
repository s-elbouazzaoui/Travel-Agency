package com.example.travel.Controllers;

import com.example.travel.Entities.Destination;
import com.example.travel.Services.Interface.DestinationService;
import lombok.Data;

import org.springframework.http.ResponseEntity;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@RestController
@Validated
@RequestMapping("/api/destinations")
public class DestinationController {

    private final DestinationService destinationService;

    public DestinationController(DestinationService destinationService) {
        this.destinationService = destinationService;
    }

    @GetMapping("")
    public ResponseEntity<List<Destination>> getDestinations() {
        return ResponseEntity.ok(destinationService.getDestinations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Destination> getDestinationById(@PathVariable("id") Integer id) {
        Destination destination = destinationService.getDestination(id);
        return ResponseEntity.ok(destination);
    }


    @PostMapping("/add")
    public ResponseEntity<?> addDestination(
            @RequestParam("nom") String nom,
            @RequestParam("lieu") String lieu,
            @RequestParam("typeVoyage") String typeVoyage,
            @RequestParam("prix") Long prix,
            @RequestParam("dateDebut") LocalDate dateDebut,
            @RequestParam("dateFin")  LocalDate dateFin,
            @RequestParam("nombrePlace") Integer nombrePlace,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image) {

        // Creating destination object
        Destination destination = new Destination();
        destination.setNom(nom);
        destination.setLieu(lieu);
        destination.setTypeVoyage(typeVoyage);
        destination.setPrix(prix);
        destination.setDateDebut(dateDebut);
        destination.setDateFin(dateFin);
        destination.setNombrePlace(nombrePlace);
        destination.setDescription(description);
        /** L'utilisation de cette methode est dûe à l'utilisation de form-data dans la soumission d'une ligne de destination,
         *  en utilisant @ModelAttribute spring ne peut pas lier le type LocalDate d'après form-data correctement. */

        String resultat = destinationService.addDestionation(destination, image);
        Map<String, String> response = new HashMap<>();
        if (resultat.equals("success"))
            response.put("message", "success");
        if (resultat.equals("error"))
            response.put("message", "missing fields");
        if (resultat.equals("error image")) {
            response.put("message", "error image");
        }
        if (resultat.equals("error date")) {
            response.put("message", "error date");
        }

        return ResponseEntity.ok().body(response);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateDestination(
            @RequestParam(value = "nom",required = false) String nom,
            @RequestParam(value = "lieu",required = false) String lieu,
            @RequestParam(value = "typeVoyage",required = false) String typeVoyage,
            @RequestParam(value = "prix",required = false) Long prix,
            @RequestParam(value = "dateDebut",required = false) LocalDate dateDebut,
            @RequestParam(value = "dateFin",required = false)  LocalDate dateFin,
            @RequestParam(value = "nombrePlace",required = false) Integer nombrePlace,
            @RequestParam(value = "description",required = false) String description,
            @RequestParam(value = "image",required = false) MultipartFile image,
            @PathVariable("id") Integer id) {
        Destination destination = new Destination();
        destination.setNom(nom);
        destination.setLieu(lieu);
        destination.setTypeVoyage(typeVoyage);
        destination.setPrix(prix);
        destination.setDateDebut(dateDebut);
        destination.setDateFin(dateFin);
        destination.setNombrePlace(nombrePlace);
        destination.setDescription(description);
        String result = destinationService.updateDestination(destination,image,id);
        Map<String, String> response = new HashMap<>();
        if(result.equals("success")){
            response.put("message", "updated successfully");
        }
        else{
            response.put("message", "error");
        }
        return ResponseEntity.ok().body(response);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteDestination(@PathVariable("id") Integer id) {
        String result = destinationService.deleteDestination(id);
        Map<String, String> response = new HashMap<>();
        if(result.equals("success")) {
            response.put("message", "deleted successfully");
        }
        else{
            response.put("message", "error");
        }
        return ResponseEntity.ok().body(response);
    }



}
