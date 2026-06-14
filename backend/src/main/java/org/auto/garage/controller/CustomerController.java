package org.auto.garage.controller;

import org.auto.garage.entity.Customer;
import org.auto.garage.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    private CustomerRepository repo;

    @PostMapping
    public Customer addCustomer(@RequestBody Customer customer) {
        return repo.save(customer);
    }

    @GetMapping
    public List<Customer> getAll() {
        return repo.findAll();
    }
}
