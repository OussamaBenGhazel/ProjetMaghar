package tn.esprit.user.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.user.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(Long id);

}
