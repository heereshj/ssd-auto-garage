package org.auto.garage.dto;

import java.time.LocalDate;

public record VehicleResponse(
        Long id,
        String vehicleNumber,
        String model,
        LocalDate lastServiceDate,
        LocalDate nextServiceDate,
        Long customerId,
        String customerName
) {
}