package org.auto.garage.repository;

import org.auto.garage.entity.JobCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobCardRepository extends JpaRepository<JobCard, Long> {

    Optional<JobCard> findByJobCardNumber(String jobCardNumber);
}