package tn.esprit.Microservice_User.security;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import tn.esprit.Microservice_User.user.UserRepository;

@Service
@RequiredArgsConstructor

public class UserDetailsServiceImpl implements UserDetailsService {


    private final UserRepository repository;


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        return repository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException(" User Not Found "));

    }
}
