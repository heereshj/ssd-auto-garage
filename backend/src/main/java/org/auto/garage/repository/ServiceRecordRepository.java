package org.auto.garage.repository;

import org.auto.garage.entity.ServiceRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRecordRepository extends JpaRepository<ServiceRecord, Long> {}