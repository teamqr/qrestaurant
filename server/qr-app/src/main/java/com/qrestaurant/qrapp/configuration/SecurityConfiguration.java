package com.qrestaurant.qrapp.configuration;

import com.qrestaurant.qrapp.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    private final UserService userService;
    private final PasswordConfiguration passwordConfiguration;

    public SecurityConfiguration(UserService userService, PasswordConfiguration passwordConfiguration) {
        this.userService = userService;
        this.passwordConfiguration = passwordConfiguration;
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userService);
        daoAuthenticationProvider.setPasswordEncoder(passwordConfiguration.passwordEncoder());

        return new ProviderManager(daoAuthenticationProvider);
    }

    @Bean
    public SecurityFilterChain apiSecurityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry ->
                        authorizationManagerRequestMatcherRegistry
                                .requestMatchers("/api/app/auth/login")
                                .permitAll()
                                .requestMatchers("/api/app/auth/register")
                                .permitAll()
                                .anyRequest()
                                .authenticated()
                )
                .sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .oauth2ResourceServer(httpSecurityOAuth2ResourceServerConfigurer ->
                        httpSecurityOAuth2ResourceServerConfigurer.jwt(Customizer.withDefaults())
                )
                .exceptionHandling(httpSecurityExceptionHandlingConfigurer ->
                        httpSecurityExceptionHandlingConfigurer
                                .authenticationEntryPoint(new BearerTokenAuthenticationEntryPoint())
                                .accessDeniedHandler(new BearerTokenAccessDeniedHandler())
                )
                .userDetailsService(userService)
                .headers(httpSecurityHeadersConfigurer -> httpSecurityHeadersConfigurer
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)
                )
                .build();
    }
}
