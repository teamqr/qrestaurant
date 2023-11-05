package com.qrestaurant.qrdashboard.configuration;

import com.qrestaurant.qrdashboard.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTFilterBefore extends OncePerRequestFilter {
    private final JWTConfiguration jwtConfiguration;
    private final UserService userService;

    public JWTFilterBefore(JWTConfiguration jwtConfiguration, UserService userService) {
        this.jwtConfiguration = jwtConfiguration;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        if (!hasBearerAuthorizationHeader(request)) {
            filterChain.doFilter(request, response);

            return;
        }

        String token = getBearerToken(request);
        Jwt jwt = jwtConfiguration
                .jwtDecoder()
                .decode(token);

        String email = jwt.getClaimAsString("sub");
        UserDetails userDetails = userService.loadUserByUsername(email);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(email, null, userDetails.getAuthorities());

        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        filterChain.doFilter(request, response);
    }

    private boolean hasBearerAuthorizationHeader(HttpServletRequest request) {
        String header = request.getHeader("Authorization");

        if (header == null) {
            return false;
        }

        return header.startsWith("Bearer");
    }

    private String getBearerToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");

        return header.split(" ")[1].trim();
    }
}
