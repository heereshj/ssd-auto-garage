package org.auto.garage.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.auto.garage.common.ApiResponse;
import org.auto.garage.entity.Customer;
import org.auto.garage.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    public ResponseEntity<ApiResponse<Customer>> create(
            @Valid @RequestBody Customer customer) {

        Customer savedCustomer = customerService.save(customer);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Customer created successfully",
                        savedCustomer
                ));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Customer>>> getAll() {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Customers fetched successfully",
                        customerService.getAll()
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Customer>> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Customer fetched successfully",
                        customerService.getById(id)
                )
        );
    }
}