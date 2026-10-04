package org.auto.garage.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "service_records")
@Getter
@Setter
@NoArgsConstructor
public class ServiceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Service type is required")
    @Column(nullable = false, length = 100)
    private String serviceType;

    @Column(length = 1000)
    private String description;

    @PositiveOrZero(message = "Amount cannot be negative")
    private double amount;

    @Column(nullable = false)
    private LocalDate serviceDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "vehicle_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_service_vehicle")
    )
    private Vehicle vehicle;
}