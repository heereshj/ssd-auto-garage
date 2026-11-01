package org.auto.garage.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.auto.garage.common.ApiResponse;
import org.auto.garage.dto.VehicleResponse;
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
    public ResponseEntity<ApiResponse<VehicleResponse>> create(
            @Valid @RequestBody Vehicle vehicle) {

        VehicleResponse savedVehicle = vehicleService.save(vehicle);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Vehicle created successfully",
                        savedVehicle));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<VehicleResponse>>> getAll() {
        return ResponseEntity.ok(
                ApiResponse.success(
                        "Vehicles fetched successfully",
                        vehicleService.getAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<VehicleResponse>> getById(
            @PathVariable Long id) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        "Vehicle fetched successfully",
                        vehicleService.getById(id)));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<ApiResponse<List<VehicleResponse>>> getByCustomer(
            @PathVariable Long customerId) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        "Customer vehicles fetched successfully",
                        vehicleService.getByCustomer(customerId)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id) {
        vehicleService.delete(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Vehicle deleted successfully",
                        null));
    }
}