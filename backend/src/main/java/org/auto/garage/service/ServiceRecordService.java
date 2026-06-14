package org.auto.garage.service;

import org.auto.garage.entity.ServiceRecord;
import org.auto.garage.repository.ServiceRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceRecordService {

    @Autowired
    private ServiceRecordRepository repository;

    public ServiceRecord save(ServiceRecord serviceRecord) {
        return repository.save(serviceRecord);
    }

    public List<ServiceRecord> getAll() {
        return repository.findAll();
    }
}
