package tn.esprit.Microservice_Assurance.feign;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private Long id;
    private String nom;
    private String email;
}
