package com.qrestaurant.qrdashboard.configuration;

import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.core.KafkaAdmin;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaTopicConfiguration {
    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    @Bean
    public KafkaAdmin kafkaAdmin() {
        Map<String, Object> configurations = new HashMap<>();
        configurations.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);

        return new KafkaAdmin(configurations);
    }

    @Bean
    public NewTopic restaurantTopic() {
        return TopicBuilder
                .name("dashboard-restaurant")
                .build();
    }

    @Bean
    public NewTopic menuTopic() {
        return TopicBuilder
                .name("dashboard-menu")
                .build();
    }

    @Bean
    public NewTopic mealTopic() {
        return TopicBuilder
                .name("dashboard-meal")
                .build();
    }

    @Bean
    public NewTopic mealDeleteTopic() {
        return TopicBuilder
                .name("dashboard-meal-delete")
                .build();
    }

    @Bean
    public NewTopic tableTopic() {
        return TopicBuilder
                .name("dashboard-table")
                .build();
    }

    @Bean
    public NewTopic tableDeleteTopic() {
        return TopicBuilder
                .name("dashboard-table-delete")
                .build();
    }

    @Bean
    public NewTopic mealCategoryTopic() {
        return TopicBuilder
                .name("dashboard-meal-category")
                .build();
    }

    @Bean
    public NewTopic mealCategoryDeleteTopic() {
        return TopicBuilder
                .name("dashboard-meal-category-delete")
                .build();
    }

    @Bean
    public NewTopic orderTopic() {
        return TopicBuilder
                .name("dashboard-order")
                .build();
    }
}
