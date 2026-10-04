package org.auto.garage.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.auto.garage.entity.Vehicle;
import org.auto.garage.repository.VehicleRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class ReminderScheduler {

    private final VehicleRepository vehicleRepository;

    @Scheduled(cron = "0 0 9 * * ?")
    public void sendReminders() {


        List<Vehicle> dueVehicles =
                vehicleRepository.findDueServices(java.time.LocalDate.now());

        if (dueVehicles.isEmpty()) {
            log.info("No service reminders are due today.");
            return;
        }

        for (Vehicle vehicle : dueVehicles) {

            log.info(
                    "Service reminder due for vehicle: {}",
                    vehicle.getVehicleNumber()
            );

            // WhatsApp/email notification integration
            // will be added in the Notification module.
        }
    }
}