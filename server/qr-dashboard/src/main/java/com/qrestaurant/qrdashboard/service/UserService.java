package com.qrestaurant.qrdashboard.service;

import com.qrestaurant.qrdashboard.common.Role;
import com.qrestaurant.qrdashboard.exception.EntityAlreadyExistsException;
import com.qrestaurant.qrdashboard.exception.EntityNotFoundException;
import com.qrestaurant.qrdashboard.model.NewUserRequest;
import com.qrestaurant.qrdashboard.model.entity.Restaurant;
import com.qrestaurant.qrdashboard.model.entity.User;
import com.qrestaurant.qrdashboard.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private final RestaurantService restaurantService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(RestaurantService restaurantService, UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.restaurantService = restaurantService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Iterable<User> getWorkers() {
        return userRepository.findAllByRole(Role.WORKER);
    }

    public User saveUser(NewUserRequest newUserRequest, Role role) throws RuntimeException {
        if (userRepository.findByEmail(newUserRequest.email()).isPresent()) {
            throw new EntityAlreadyExistsException("User with email: " + newUserRequest.email() + " already exists.");
        }

        try {
            Restaurant restaurant = restaurantService.getRestaurant(newUserRequest.restaurantId());

            return userRepository.save(new User(newUserRequest.email(),
                    passwordEncoder.encode(newUserRequest.password()), role, restaurant));
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException(e.getMessage());
        }
    }

    public User deleteWorker(Long id) throws EntityNotFoundException {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            if (user.getRole() == Role.WORKER) {
                userRepository.deleteById(id);

                return user;
            } else {
                throw new EntityNotFoundException("Worker with id: " + id + " does not exist.");
            }
        } else {
            throw new EntityNotFoundException("User with id: " + id + " does not exist.");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository
                .findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Invalid email."));
    }
}
