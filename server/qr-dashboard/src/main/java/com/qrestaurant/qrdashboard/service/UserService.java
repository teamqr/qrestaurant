package com.qrestaurant.qrdashboard.service;

import com.qrestaurant.qrdashboard.common.JWTUtil;
import com.qrestaurant.qrdashboard.common.Role;
import com.qrestaurant.qrdashboard.exception.EntityAlreadyExistsException;
import com.qrestaurant.qrdashboard.exception.EntityNotFoundException;
import com.qrestaurant.qrdashboard.model.request.NewUserRequest;
import com.qrestaurant.qrdashboard.model.entity.Restaurant;
import com.qrestaurant.qrdashboard.model.entity.User;
import com.qrestaurant.qrdashboard.repository.RestaurantRepository;
import com.qrestaurant.qrdashboard.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final JWTUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RestaurantRepository restaurantRepository, JWTUtil jwtUtil,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.restaurantRepository = restaurantRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public Iterable<User> getWorkers(String authorizationHeader) {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        return userRepository.getAllByRoleAndRestaurant_Id(Role.WORKER, restaurantId);
    }

    public User saveUser(String authorizationHeader, NewUserRequest newUserRequest, Role role) throws RuntimeException {
        if (userRepository.findByEmail(newUserRequest.email()).isPresent()) {
            throw new EntityAlreadyExistsException("User with email: " + newUserRequest.email() + " already exists.");
        }

        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        Optional<Restaurant> optionalRestaurant = restaurantRepository.findById(restaurantId);

        if (optionalRestaurant.isPresent()) {
            return userRepository.save(new User(newUserRequest.email(), passwordEncoder.encode(newUserRequest.password()),
                    role, optionalRestaurant.get()));
        } else {
            throw new EntityNotFoundException("Restaurant with id: " + restaurantId + " does not exists.");
        }
    }

    public User deleteWorker(String authorizationHeader, Long id) throws EntityNotFoundException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        Optional<User> optionalUser = userRepository.findByIdAndRoleAndRestaurant_Id(id, Role.WORKER, restaurantId);

        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {
            throw new EntityNotFoundException("Worker with id: " + id + " does not exist.");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository
                .findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Invalid email."));
    }
}
