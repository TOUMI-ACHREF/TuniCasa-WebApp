package com.fsb.tunicasa_api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.fsb.tunicasa_api.business.services.FilesStorageService;

import lombok.extern.slf4j.Slf4j;
@SpringBootApplication
@Slf4j

public class TunicasaApiApplication implements CommandLineRunner {

	@Autowired
	FilesStorageService filesStorageService;

	public static void main(String[] args) {
		SpringApplication.run(TunicasaApiApplication.class, args);
	}

	// Storage initialisation
	@Override
	public void run(String... arg) throws Exception {
		log.info("Storage initialisation");
		filesStorageService.init();
	}
}
