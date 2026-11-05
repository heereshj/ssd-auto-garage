
package org.auto.garage.service;

import lombok.RequiredArgsConstructor;
import org.auto.garage.dto.*;
import org.auto.garage.entity.*;
import org.auto.garage.repository.CustomerRepository;
import org.auto.garage.repository.JobCardRepository;
import org.auto.garage.repository.VehicleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobCardService {

    private final JobCardRepository jobCardRepository;
    private final CustomerRepository customerRepository;
    private final VehicleRepository vehicleRepository;

    @Transactional(readOnly = true)
    public List<JobCardResponse> getAllJobCards() {
        return jobCardRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public JobCardResponse getJobCardById(Long id) {
        return convertToResponse(findJobCard(id));
    }

    @Transactional
    public JobCardResponse createJobCard(JobCard jobCard) {

        Customer customer = customerRepository.findById(
                jobCard.getCustomer().getId()
        ).orElseThrow(() ->
                new RuntimeException("Customer not found"));

        Vehicle vehicle = vehicleRepository.findById(
                jobCard.getVehicle().getId()
        ).orElseThrow(() ->
                new RuntimeException("Vehicle not found"));

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

        return convertToResponse(jobCardRepository.save(jobCard));
    }

    @Transactional
    public JobCardResponse updateStatus(Long id, JobCardStatus status) {

        JobCard jobCard = findJobCard(id);
        jobCard.setStatus(status);

        return convertToResponse(jobCardRepository.save(jobCard));
    }

    @Transactional
    public void deleteJobCard(Long id) {
        if (!jobCardRepository.existsById(id)) {
            throw new RuntimeException("Job card not found");
        }
        jobCardRepository.deleteById(id);
    }

    private JobCard findJobCard(Long id) {
        return jobCardRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Job card not found"));
    }

    private JobCardResponse convertToResponse(JobCard jobCard) {

        Customer customer = jobCard.getCustomer();
        Vehicle vehicle = jobCard.getVehicle();

        CustomerResponse customerResponse = new CustomerResponse(
                customer.getId(),
                customer.getName(),
                customer.getPhone(),
                customer.getEmail(),
                customer.getAddress()
        );

        VehicleResponse vehicleResponse = new VehicleResponse(
                vehicle.getId(),
                vehicle.getVehicleNumber(),
                vehicle.getModel(),
                vehicle.getLastServiceDate(),
                vehicle.getNextServiceDate(),
                customer.getId(),
                customer.getName()
        );

        return new JobCardResponse(
                jobCard.getId(),
                jobCard.getJobCardNumber(),
                customerResponse,
                vehicleResponse,
                jobCard.getServiceDate(),
                jobCard.getExpectedDeliveryDate(),
                jobCard.getOdometerReading(),
                jobCard.getComplaint(),
                jobCard.getMechanicNotes(),
                jobCard.getServiceType(),
                jobCard.getStatus()
        );
    }
}
