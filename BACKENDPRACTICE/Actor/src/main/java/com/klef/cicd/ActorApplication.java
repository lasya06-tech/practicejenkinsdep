package com.klef.cicd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ActorApplication {

	public static void main(String[] args) {
		SpringApplication.run(ActorApplication.class, args);
		System.out.println("Project is running");
	}
}
