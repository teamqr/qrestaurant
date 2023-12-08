package com.qrestaurant.qrdashboard.configuration;

import com.qrestaurant.qrdashboard.model.dto.MealDTO;
import com.qrestaurant.qrdashboard.model.dto.MenuDTO;
import com.qrestaurant.qrdashboard.model.dto.RestaurantDTO;
import com.qrestaurant.qrdashboard.model.dto.TableDTO;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.KafkaTemplate;

@Configuration
public class KafkaTemplateConfiguration {
    private final KafkaProducerFactoryConfiguration kafkaProducerFactoryConfiguration;

    public KafkaTemplateConfiguration(KafkaProducerFactoryConfiguration kafkaProducerFactoryConfiguration) {
        this.kafkaProducerFactoryConfiguration = kafkaProducerFactoryConfiguration;
    }

    @Bean
    public KafkaTemplate<String, Long> deleteKafkaTemplate() {
        return new KafkaTemplate<>(kafkaProducerFactoryConfiguration.deleteProducerFactory());
    }

    @Bean
    public KafkaTemplate<String, RestaurantDTO> restaurantKafkaTemplate() {
        return new KafkaTemplate<>(kafkaProducerFactoryConfiguration.restaurantProducerFactory());
    }

    @Bean
    public KafkaTemplate<String, MenuDTO> menuKafkaTemplate() {
        return new KafkaTemplate<>(kafkaProducerFactoryConfiguration.menuProducerFactory());
    }

    @Bean
    public KafkaTemplate<String, MealDTO> mealKafkaTemplate() {
        return new KafkaTemplate<>(kafkaProducerFactoryConfiguration.mealProducerFactory());
    }

    @Bean
    public KafkaTemplate<String, TableDTO> tableKafkaTemplate() {
        return new KafkaTemplate<>(kafkaProducerFactoryConfiguration.tableProducerFactory());
    }
}
