package com.qrestaurant.qrdashboard.configuration;

import com.qrestaurant.qrdashboard.model.dto.MealDTO;
import com.qrestaurant.qrdashboard.model.dto.MenuDTO;
import com.qrestaurant.qrdashboard.model.dto.RestaurantDTO;
import com.qrestaurant.qrdashboard.model.dto.TableDTO;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.ProducerFactory;

@Configuration
public class KafkaProducerFactoryConfiguration {
    private final KafkaProducerConfiguration kafkaProducerConfiguration;

    public KafkaProducerFactoryConfiguration(KafkaProducerConfiguration kafkaProducerConfiguration) {
        this.kafkaProducerConfiguration = kafkaProducerConfiguration;
    }

    @Bean
    public ProducerFactory<String, Long> deleteProducerFactory() {
        return new DefaultKafkaProducerFactory<>(kafkaProducerConfiguration.deleteConfigs());
    }

    @Bean
    public ProducerFactory<String, RestaurantDTO> restaurantProducerFactory() {
        return new DefaultKafkaProducerFactory<>(kafkaProducerConfiguration.configs());
    }

    @Bean
    public ProducerFactory<String, MenuDTO> menuProducerFactory() {
        return new DefaultKafkaProducerFactory<>(kafkaProducerConfiguration.configs());
    }

    @Bean
    public ProducerFactory<String, MealDTO> mealProducerFactory() {
        return new DefaultKafkaProducerFactory<>(kafkaProducerConfiguration.configs());
    }

    @Bean
    public ProducerFactory<String, TableDTO> tableProducerFactory() {
        return new DefaultKafkaProducerFactory<>(kafkaProducerConfiguration.configs());
    }
}
