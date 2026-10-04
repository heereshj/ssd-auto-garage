package org.auto.garage.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.auto.garage.common.ApiResponse;
import org.auto.garage.entity.ServiceRecord;
import org.auto.garage.service.ServiceRecordService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/service-records")
@RequiredArgsConstructor
public class ServiceRecordController {

    private final ServiceRecordService serviceRecordService;

    @PostMapping
    public ResponseEntity<ApiResponse<ServiceRecord>> create(
            @Valid @RequestBody ServiceRecord serviceRecord) {

        ServiceRecord saved = serviceRecordService.save(serviceRecord);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Service record created successfully",
                        saved
                ));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ServiceRecord>>> getAll() {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Service records fetched successfully",
                        serviceRecordService.getAll()
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ServiceRecord>> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Service record fetched successfully",
                        serviceRecordService.getById(id)
                )
        );
    }
}