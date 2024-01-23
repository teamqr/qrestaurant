package com.qrestaurant.qrdashboard.common;

import com.qrestaurant.qrdashboard.configuration.JWTConfiguration;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

@Component
public class JWTUtil {
    private final JWTConfiguration jwtConfiguration;

    public JWTUtil(JWTConfiguration jwtConfiguration) {
        this.jwtConfiguration = jwtConfiguration;
    }

    public Jwt getJWTToken(String authorizationHeader) {
        String bearerToken = getBearerToken(authorizationHeader);

        return jwtConfiguration.jwtDecoder()
                .decode(bearerToken);
    }

    private String getBearerToken(String authorizationHeader) {
        return authorizationHeader.split(" ")[1].trim();
    }
}
