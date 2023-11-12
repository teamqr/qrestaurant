package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.exception.EntityAlreadyExistsException;
import com.qrestaurant.qrapp.model.User;
import com.qrestaurant.qrapp.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User saveUser(User user) throws EntityAlreadyExistsException {
        if (userRepository.findByEmail(user.getUsername()).isPresent()) {
            throw new EntityAlreadyExistsException("User with this email already exists.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository
                .findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Invalid email."));
    }
}
