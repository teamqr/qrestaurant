package com.qrestaurant.qrgateway.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class CORSConfiguration {
    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration appCorsConfiguration = new CorsConfiguration();
        appCorsConfiguration.setAllowedMethods(List.of("*"));
        appCorsConfiguration.setAllowedHeaders(List.of("*"));
        appCorsConfiguration.setAllowedOrigins(List.of("*"));

        CorsConfiguration dashboardCorsConfiguration = new CorsConfiguration();
        dashboardCorsConfiguration.setAllowedMethods(List.of("*"));
        dashboardCorsConfiguration.setAllowedHeaders(List.of("*"));
        dashboardCorsConfiguration.setAllowedOrigins(List.of("http://localhost:3000"));

        CorsConfiguration swaggerCorsConfiguration = new CorsConfiguration();
        swaggerCorsConfiguration.setAllowedMethods(List.of("*"));
        swaggerCorsConfiguration.setAllowedHeaders(List.of("*"));
        swaggerCorsConfiguration.setAllowedOrigins(List.of("http://localhost"));

        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/api/app/**", appCorsConfiguration);
        urlBasedCorsConfigurationSource
                .registerCorsConfiguration("/api/dashboard/**", dashboardCorsConfiguration);
        urlBasedCorsConfigurationSource.registerCorsConfiguration("**/swagger-ui/**", swaggerCorsConfiguration);
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/app/**", swaggerCorsConfiguration);
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/ws-app/**", appCorsConfiguration);
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/dashboard/**", swaggerCorsConfiguration);
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/ws-dashboard/**", dashboardCorsConfiguration);

        return new CorsWebFilter(urlBasedCorsConfigurationSource);
    }
}
