package com.qrestaurant.qrdashboard.controller;

import com.qrestaurant.qrdashboard.service.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard/user")
@PreAuthorize(value = "hasAuthority('SCOPE_ADMIN')")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

}
