package org.auto.garage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AutoGarageApplication {

    public static void main(String[] args) {
        SpringApplication.run(AutoGarageApplication.class, args);
    }
}