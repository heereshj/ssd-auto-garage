package org.auto.garage.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@ToString
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vehicleNumber;
    private String model;
    private LocalDate lastServiceDate;
    private LocalDate nextServiceDate;

    @ManyToOne
    private Customer customer;

    // getters & setters
}