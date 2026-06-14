package org.auto.garage.controller;

import org.auto.garage.entity.Vehicle;
import org.auto.garage.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    @Autowired
    private VehicleRepository repo;

    @PostMapping
    public Vehicle addVehicle(@RequestBody Vehicle vehicle) {
        return repo.save(vehicle);
    }

    @GetMapping
    public List<Vehicle> getAll() {
        return repo.findAll();
    }
}