package com.example.travel.Services.Interface;

import com.example.travel.Entities.Destination;

import java.util.List;

public interface DestinationService {

    public String addDestionation(Destination destination);
    public String updateDestination(Destination destination, Integer id);
    public String deleteDestination(Integer id);
    public Destination getDestination(Integer id);
    public List<Destination> getDestinations();
}
