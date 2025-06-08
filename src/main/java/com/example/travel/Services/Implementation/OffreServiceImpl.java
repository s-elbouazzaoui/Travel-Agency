package com.example.travel.Services.Implementation;

import com.example.travel.Entities.Offre;
import com.example.travel.Repositories.OffreRepository;
import com.example.travel.Services.Interface.OffreService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;

@Data
@Service
@Transactional
public class OffreServiceImpl implements OffreService {

    private final OffreRepository offreRepository;
    public OffreServiceImpl(OffreRepository offreRepository) {
        this.offreRepository = offreRepository;
    }

    @Override
    public String addOffre(Offre offre) {
        if(offre.getDestination().getId()==null ||offre.getDateDebut()==null || offre.getDateFin()==null || offre.getPourcentage()==null || offre.getNombrePlace()==null){
            return "error";
        }
        else{
            offreRepository.save(offre);
            return "success";
        }

    }

    @Override
    public String updateOffre(Offre offre, Integer id) {
        Offre oldOffre = offreRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("not found"));
        if(offre.getLibelle()!=null){
            oldOffre.setLibelle(offre.getLibelle());
        }
        if(offre.getDescription()!=null){
            oldOffre.setDescription(offre.getDescription());
        }
        if(offre.getDateDebut()!=null){
            oldOffre.setDateDebut(offre.getDateDebut());
        }
        if(offre.getDateFin()!=null){
            oldOffre.setDateFin(offre.getDateFin());
        }
        if(offre.getPourcentage()!=null){
            oldOffre.setPourcentage(offre.getPourcentage());
        }
        if(offre.getNombrePlace()!=null){
            oldOffre.setNombrePlace(offre.getNombrePlace());
        }
        if(offre.getDestination()!=null) {
            if (offre.getDestination().getId() != null) {
                oldOffre.setDestination(offre.getDestination());
            }
        }
        offreRepository.save(oldOffre);
        return "success";
    }

    @Override
    public String deleteOffre(Integer id) {
        Offre offre = offreRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("not found"));
        offreRepository.delete(offre);
        return "success";
    }

    @Override
    public List<Offre> getOffre() {
        return offreRepository.findAll();
    }

    @Override
    public Offre getOffreById(Integer id) {
        Offre offre = offreRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("not found"));
        assert offre != null;
        return offre;
    }
}
