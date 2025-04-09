package tn.esprit.Microservice_User.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthenticationRequest {
    @Email(message = "This format is not accepted")
    @NotEmpty(message = "email cannot be empty")
    @NotBlank(message = "email cannot be empty")
    private String email ;
    @NotEmpty(message = "password cannot be empty")
    @NotBlank(message = "password cannot be empty")
    @Size(min = 8, message = "Password should be more than 8 caracteres")
    private String password ;
}
