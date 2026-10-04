package org.auto.garage.service;

import lombok.RequiredArgsConstructor;
import org.auto.garage.entity.Customer;
import org.auto.garage.exception.ResourceNotFoundException;
import org.auto.garage.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomerService {

    private final CustomerRepository repository;

    public Customer save(Customer customer) {
        return repository.save(customer);
    }

    @Transactional(readOnly = true)
    public List<Customer> getAll() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public Customer getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found with id: " + id
                        )
                );
    }
}