package org.auto.garage.dto;

public record CustomerResponse(
        Long id,
        String name,
        String phone,
        String email,
        String address
) {}