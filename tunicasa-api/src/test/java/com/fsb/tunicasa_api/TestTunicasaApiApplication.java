package com.fsb.tunicasa_api;

import org.springframework.boot.SpringApplication;

public class TestTunicasaApiApplication {

	public static void main(String[] args) {
		SpringApplication.from(TunicasaApiApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
