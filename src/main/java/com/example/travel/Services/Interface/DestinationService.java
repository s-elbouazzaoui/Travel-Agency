package com.example.travel.Services.Interface;

import com.example.travel.Entities.Destination;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DestinationService {

    public String addDestionation(Destination destination, MultipartFile file);
    public String updateDestination(Destination destination,MultipartFile file, Integer id);
    public String deleteDestination(Integer id);
    public Destination getDestination(Integer id);
    public List<Destination> getDestinations();
}
