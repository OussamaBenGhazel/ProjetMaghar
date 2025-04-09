package tn.esprit.Microservice_Rendezvous;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableEurekaClient
@EnableDiscoveryClient
@EnableScheduling
@SpringBootApplication
public class MicroserviceRendezvousApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceRendezvousApplication.class, args);
	}

}
