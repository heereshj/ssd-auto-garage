package org.auto.garage.repository;

import org.auto.garage.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    @Query("SELECT v FROM Vehicle v WHERE v.nextServiceDate = CURRENT_DATE")
    List<Vehicle> findDueServices();
}
