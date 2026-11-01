package org.auto.garage.service;

import lombok.RequiredArgsConstructor;
import org.auto.garage.dto.VehicleResponse;
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

    public VehicleResponse save(Vehicle vehicle) {

        if (repository.existsByVehicleNumberIgnoreCase(
                vehicle.getVehicleNumber())) {
            throw new IllegalArgumentException(
                    "Vehicle number already exists");
        }

        Vehicle savedVehicle = repository.save(vehicle);

        return mapToResponse(savedVehicle);
    }

    @Transactional(readOnly = true)
    public List<VehicleResponse> getAll() {
        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public VehicleResponse getById(Long id) {

        Vehicle vehicle = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id: " + id));

        return mapToResponse(vehicle);
    }

    @Transactional(readOnly = true)
    public List<VehicleResponse> getByCustomer(Long customerId) {

        return repository.findByCustomerId(customerId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public void delete(Long id) {
        Vehicle vehicle = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id: " + id));

        repository.delete(vehicle);
    }

    private VehicleResponse mapToResponse(Vehicle vehicle) {

        return new VehicleResponse(
                vehicle.getId(),
                vehicle.getVehicleNumber(),
                vehicle.getModel(),
                vehicle.getLastServiceDate(),
                vehicle.getNextServiceDate(),
                vehicle.getCustomer().getId(),
                vehicle.getCustomer().getName()
        );
    }
}