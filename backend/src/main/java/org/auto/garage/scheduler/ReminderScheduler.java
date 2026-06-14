package org.auto.garage.scheduler;

import org.auto.garage.entity.Vehicle;
import org.auto.garage.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@EnableScheduling
public class ReminderScheduler {

    @Autowired
    private VehicleRepository vehicleRepo;

    @Scheduled(cron = "0 0 9 * * ?")
    public void sendReminders() {

        List<Vehicle> dueVehicles = vehicleRepo.findDueServices();

        for (Vehicle v : dueVehicles) {
            System.out.println("Reminder: Service due for " + v.getVehicleNumber());

            // Integrate WhatsApp API here
        }
    }
}