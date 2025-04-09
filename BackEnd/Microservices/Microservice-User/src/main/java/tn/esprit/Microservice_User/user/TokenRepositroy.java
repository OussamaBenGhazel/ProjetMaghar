package tn.esprit.Microservice_User.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepositroy extends JpaRepository<Token, Integer> {


    Optional<Token> findByToken(String token);
}
