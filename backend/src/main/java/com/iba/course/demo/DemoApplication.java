package com.iba.course.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    static int i = 0;

    public static void main(String[] args) throws Throwable {
        SpringApplication.run(DemoApplication.class, args);
    }

}

