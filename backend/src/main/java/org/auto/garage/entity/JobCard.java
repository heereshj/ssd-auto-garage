package org.auto.garage.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "job_cards")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String jobCardNumber;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    private LocalDate serviceDate;

    private LocalDate expectedDeliveryDate;

    private Integer odometerReading;

    @Column(length = 1000)
    private String complaint;

    @Column(length = 2000)
    private String mechanicNotes;

    private String serviceType;

    @Enumerated(EnumType.STRING)
    private JobCardStatus status;
}