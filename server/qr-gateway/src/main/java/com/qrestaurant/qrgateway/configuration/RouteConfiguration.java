package com.qrestaurant.qrgateway.configuration;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RouteConfiguration {
    @Bean
    public RouteLocator routeLocator(RouteLocatorBuilder routeLocatorBuilder) {
        return routeLocatorBuilder
                .routes()
                .route(predicateSpec -> predicateSpec
                        .path("/api/app/**")
                        .uri("http://qr-app:8081")
                )
                .route(predicateSpec -> predicateSpec
                        .path("/app/**")
                        .uri("http://qr-app:8081")
                )
                .route(predicateSpec -> predicateSpec
                        .path("/ws-app/**")
                        .uri("ws://qr-app:8081")
                )
                .route(predicateSpec -> predicateSpec
                        .path("/api/dashboard/**")
                        .uri("http://qr-dashboard:8082")
                )
                .route(predicateSpec -> predicateSpec
                        .path("/dashboard/**")
                        .uri("http://qr-dashboard:8082")
                )
                .route(predicateSpec -> predicateSpec
                        .path("/ws-dashboard/**")
                        .uri("ws://qr-dashboard:8082")
                )
                .build();
    }
}
