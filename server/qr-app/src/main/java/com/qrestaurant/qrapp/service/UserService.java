package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.common.JWTUtil;
import com.qrestaurant.qrapp.exception.EntityAlreadyExistsException;
import com.qrestaurant.qrapp.exception.EntityNotFoundException;
import com.qrestaurant.qrapp.model.entity.User;
import com.qrestaurant.qrapp.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;

    public UserService(UserRepository userRepository, JWTUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public User getMe(String authorizationHeader) throws EntityNotFoundException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long id = jwtToken.getClaim("id");

        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {
            throw new EntityNotFoundException("User with id: " + id + "does not exists.");
        }
    }

    public User saveUser(User user) throws EntityAlreadyExistsException {
        if (userRepository.findByEmail(user.getUsername()).isPresent()) {
            throw new EntityAlreadyExistsException("User with this email already exists.");
        }

        return userRepository.save(user);
    }

    public User deleteUser(String authorizationHeader) throws EntityNotFoundException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long id = jwtToken.getClaim("id");

        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            userRepository.deleteById(id);

            return user;
        } else {
            throw new EntityNotFoundException("User with id: " + id + " does not exists.");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository
                .findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Invalid email."));
    }
}
