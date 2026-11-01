package org.auto.garage.repository;

import org.auto.garage.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface VehicleRepository
        extends JpaRepository<Vehicle, Long> {

    @Query("""
        SELECT v
        FROM Vehicle v
        WHERE v.nextServiceDate = :date
        """)
    List<Vehicle> findDueServices(
            @Param("date") LocalDate date
    );

    List<Vehicle> findByCustomerId(Long customerId);

    boolean existsByVehicleNumberIgnoreCase(String vehicleNumber);
}