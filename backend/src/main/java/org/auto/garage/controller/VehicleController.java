package org.auto.garage.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.auto.garage.common.ApiResponse;
import org.auto.garage.entity.Vehicle;
import org.auto.garage.service.VehicleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    @PostMapping
    public ResponseEntity<ApiResponse<Vehicle>> create(
            @Valid @RequestBody Vehicle vehicle) {

        Vehicle savedVehicle = vehicleService.save(vehicle);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Vehicle created successfully",
                        savedVehicle
                ));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Vehicle>>> getAll() {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Vehicles fetched successfully",
                        vehicleService.getAll()
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Vehicle>> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Vehicle fetched successfully",
                        vehicleService.getById(id)
                )
        );
    }
}
