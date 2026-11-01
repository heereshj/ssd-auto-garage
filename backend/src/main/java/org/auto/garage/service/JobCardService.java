package org.auto.garage.service;

import lombok.RequiredArgsConstructor;
import org.auto.garage.entity.*;
import org.auto.garage.repository.CustomerRepository;
import org.auto.garage.repository.JobCardRepository;
import org.auto.garage.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobCardService {

    private final JobCardRepository jobCardRepository;
    private final CustomerRepository customerRepository;
    private final VehicleRepository vehicleRepository;

    public List<JobCard> getAllJobCards() {
        return jobCardRepository.findAll();
    }

    public JobCard getJobCardById(Long id) {
        return jobCardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job card not found"));
    }

    public JobCard createJobCard(JobCard jobCard) {

        Customer customer = customerRepository.findById(
                jobCard.getCustomer().getId()
        ).orElseThrow(() -> new RuntimeException("Customer not found"));

        Vehicle vehicle = vehicleRepository.findById(
                jobCard.getVehicle().getId()
        ).orElseThrow(() -> new RuntimeException("Vehicle not found"));

        jobCard.setCustomer(customer);
        jobCard.setVehicle(vehicle);

        if (jobCard.getServiceDate() == null) {
            jobCard.setServiceDate(LocalDate.now());
        }

        if (jobCard.getStatus() == null) {
            jobCard.setStatus(JobCardStatus.OPEN);
        }

        if (jobCard.getJobCardNumber() == null ||
                jobCard.getJobCardNumber().isBlank()) {

            jobCard.setJobCardNumber(
                    "JC-" + System.currentTimeMillis()
            );
        }

        return jobCardRepository.save(jobCard);
    }

    public JobCard updateStatus(Long id, JobCardStatus status) {

        JobCard jobCard = getJobCardById(id);

        jobCard.setStatus(status);

        return jobCardRepository.save(jobCard);
    }

    public void deleteJobCard(Long id) {

        if (!jobCardRepository.existsById(id)) {
            throw new RuntimeException("Job card not found");
        }

        jobCardRepository.deleteById(id);
    }
}