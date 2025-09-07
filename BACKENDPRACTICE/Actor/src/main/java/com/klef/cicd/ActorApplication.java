package com.klef.cicd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class ActorApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(ActorApplication.class, args);
        System.out.println("Project is running");
    }
}