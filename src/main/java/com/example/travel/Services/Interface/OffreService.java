package com.example.travel.Services.Interface;

import com.example.travel.Entities.Offre;

import java.util.List;

public interface OffreService {

    public String addOffre(Offre offre);
    public String updateOffre(Offre offre,Integer id);
    public String deleteOffre(Integer id);
    public List<Offre> getOffre();
    public Offre getOffreById(Integer id);
}
