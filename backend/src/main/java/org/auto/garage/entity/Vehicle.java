package org.auto.garage.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(
        name = "vehicles",
        indexes = {
                @Index(name = "idx_vehicle_number", columnList = "vehicleNumber"),
                @Index(name = "idx_next_service_date", columnList = "nextServiceDate")
        }
)
@Getter
@Setter
@NoArgsConstructor
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Vehicle number is required")
    @Column(nullable = false, length = 20)
    private String vehicleNumber;

    @NotBlank(message = "Vehicle model is required")
    @Column(nullable = false, length = 100)
    private String model;

    private LocalDate lastServiceDate;

    private LocalDate nextServiceDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "customer_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_vehicle_customer")
    )
    private Customer customer;
}