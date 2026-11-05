package org.auto.garage.controller;

import lombok.RequiredArgsConstructor;
import org.auto.garage.dto.JobCardResponse;
import org.auto.garage.entity.JobCard;
import org.auto.garage.entity.JobCardStatus;
import org.auto.garage.service.JobCardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/job-cards")
@RequiredArgsConstructor
public class JobCardController {

    private final JobCardService jobCardService;

    @GetMapping
    public ResponseEntity<List<JobCardResponse>> getAllJobCards() {
        return ResponseEntity.ok(jobCardService.getAllJobCards());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobCardResponse> getJobCardById(
            @PathVariable Long id) {
        return ResponseEntity.ok(jobCardService.getJobCardById(id));
    }

    @PostMapping
    public ResponseEntity<JobCardResponse> createJobCard(
            @RequestBody JobCard jobCard) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(jobCardService.createJobCard(jobCard));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<JobCardResponse> updateStatus(
            @PathVariable Long id,
            @RequestParam JobCardStatus status) {
        return ResponseEntity.ok(
                jobCardService.updateStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJobCard(
            @PathVariable Long id) {
        jobCardService.deleteJobCard(id);
        return ResponseEntity.noContent().build();
    }
}
