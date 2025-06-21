package com.example.travel.Controllers;

import com.example.travel.Entities.Offre;
import com.example.travel.Services.Interface.OffreService;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Data
@Validated
@RequestMapping("/api/offres")
public class OffreController {

    private final OffreService offreService;
    public OffreController(OffreService offreService) {
        this.offreService = offreService;
    }

    @GetMapping("")
    public ResponseEntity<List<Offre>> findAll() {
        return ResponseEntity.ok(offreService.getOffre());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Offre> findById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(offreService.getOffreById(id));
    }

    @GetMapping("/offresbydestination")
    public ResponseEntity<List<Offre>> findOffresByDestinationId(@RequestParam("id") Integer id) {
        return ResponseEntity.ok(offreService.getOffresByDestinationId(id));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addOffre(@RequestBody Offre offre) {
        String result = offreService.addOffre(offre);
        Map<String,String> response = new HashMap<>();
        if(result.equals("success")){
            response.put("result","success");
        }
        else {
            response.put("result","fail");
        }
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateOffre(@PathVariable("id") Integer id, @RequestBody Offre offre) {
        String result = offreService.updateOffre(offre,id);
        Map<String,String> response = new HashMap<>();
        if(result.equals("success")){
            response.put("result","success");
        }
        else {
            response.put("result","fail");
        }
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteOffre(@PathVariable("id") Integer id) {
        String result = offreService.deleteOffre(id);
        Map<String,String> response = new HashMap<>();
        if(result.equals("success")){
            response.put("result","success");
        }
        else {
            response.put("result","fail");
        }
        return ResponseEntity.ok().body(response);
    }
}
