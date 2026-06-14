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
public class ServiceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serviceType;
    private String description;
    private double amount;
    private LocalDate serviceDate;

    @ManyToOne
    private Vehicle vehicle;

    // getters & setters
}