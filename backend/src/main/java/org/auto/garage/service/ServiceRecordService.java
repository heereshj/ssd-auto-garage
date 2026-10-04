package org.auto.garage.service;

import lombok.RequiredArgsConstructor;
import org.auto.garage.entity.ServiceRecord;
import org.auto.garage.exception.ResourceNotFoundException;
import org.auto.garage.repository.ServiceRecordRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ServiceRecordService {

    private final ServiceRecordRepository repository;

    public ServiceRecord save(ServiceRecord serviceRecord) {
        return repository.save(serviceRecord);
    }

    @Transactional(readOnly = true)
    public List<ServiceRecord> getAll() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public ServiceRecord getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Service record not found with id: " + id
                        )
                );
    }
}