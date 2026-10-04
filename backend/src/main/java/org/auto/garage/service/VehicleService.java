package org.auto.garage.service;

import lombok.RequiredArgsConstructor;
import org.auto.garage.entity.Vehicle;
import org.auto.garage.exception.ResourceNotFoundException;
import org.auto.garage.repository.VehicleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class VehicleService {

    private final VehicleRepository repository;

    public Vehicle save(Vehicle vehicle) {
        return repository.save(vehicle);
    }

    @Transactional(readOnly = true)
    public List<Vehicle> getAll() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public Vehicle getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id: " + id
                        )
                );
    }
}