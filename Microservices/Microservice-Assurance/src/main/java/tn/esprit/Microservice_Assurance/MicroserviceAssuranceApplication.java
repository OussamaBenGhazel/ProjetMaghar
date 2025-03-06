package tn.esprit.Microservice_Assurance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class MicroserviceAssuranceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceAssuranceApplication.class, args);
	}

}
