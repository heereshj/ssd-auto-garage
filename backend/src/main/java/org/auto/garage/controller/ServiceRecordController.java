package org.auto.garage.controller;

import org.auto.garage.entity.ServiceRecord;
import org.auto.garage.service.ServiceRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
public class ServiceRecordController {

    @Autowired
    private ServiceRecordService service;

    @PostMapping
    public ServiceRecord addService(@RequestBody ServiceRecord serviceRecord) {
        return service.save(serviceRecord);
    }

    @GetMapping
    public List<ServiceRecord> getAllServices() {
        return service.getAll();
    }
}
