package tn.esprit.Microservice_User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(User user);
    User updateUser(Long id, User user);
    void deleteUser(Long id);
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
}
