package tn.esprit.user.Services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.user.Repository.UserRepository;
import tn.esprit.user.entity.User;


import java.util.List;
import java.util.Optional;


@Service
public class UserService {

    @Autowired
    private  UserRepository userRepository;

    // Ajouter un utilisateur
    public User addUser(User user) {
        return userRepository.save(user);
    }

    // Récupérer un utilisateur par ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id); // Utilise findById() pour récupérer l'utilisateur
    }


    // Récupérer tous les utilisateurs
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
