package com.qrestaurant.qrapp.configuration;

import com.qrestaurant.qrapp.model.dto.*;
import org.apache.kafka.common.serialization.LongDeserializer;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

@Configuration
public class KafkaConsumerFactoryConfiguration {
    private final KafkaConsumerConfiguration kafkaConsumerConfiguration;

    public KafkaConsumerFactoryConfiguration(KafkaConsumerConfiguration kafkaConsumerConfiguration) {
        this.kafkaConsumerConfiguration = kafkaConsumerConfiguration;
    }

    @Bean
    public ConsumerFactory<String, Long> deleteConsumerFactory() {
        return new DefaultKafkaConsumerFactory<>(
                kafkaConsumerConfiguration.deleteConfigs(), new StringDeserializer(), new LongDeserializer());
    }

    @Bean
    public ConsumerFactory<String, RestaurantDTO> restaurantConsumerFactory() {
        return new DefaultKafkaConsumerFactory<>(kafkaConsumerConfiguration.configs(), new StringDeserializer(),
                new JsonDeserializer<>(RestaurantDTO.class, false));
    }

    @Bean
    public ConsumerFactory<String, MenuDTO> menuConsumerFactory() {
        return new DefaultKafkaConsumerFactory<>(kafkaConsumerConfiguration.configs(), new StringDeserializer(),
                new JsonDeserializer<>(MenuDTO.class, false));
    }

    @Bean
    public ConsumerFactory<String, MealDTO> mealConsumerFactory() {
        return new DefaultKafkaConsumerFactory<>(kafkaConsumerConfiguration.configs(), new StringDeserializer(),
                new JsonDeserializer<>(MealDTO.class, false));
    }

    @Bean
    public ConsumerFactory<String, TableDTO> tableConsumerFactory() {
        return new DefaultKafkaConsumerFactory<>(kafkaConsumerConfiguration.configs(), new StringDeserializer(),
                new JsonDeserializer<>(TableDTO.class, false));
    }

    @Bean
    public ConsumerFactory<String, MealCategoryDTO> mealCategoryConsumerFactory() {
        return new DefaultKafkaConsumerFactory<>(kafkaConsumerConfiguration.configs(), new StringDeserializer(),
                new JsonDeserializer<>(MealCategoryDTO.class, false));
    }

    @Bean
    public ConsumerFactory<String, OrderDTO> orderConsumerFactory() {
        return new DefaultKafkaConsumerFactory<>(kafkaConsumerConfiguration.configs(), new StringDeserializer(),
                new JsonDeserializer<>(OrderDTO.class, false));
    }
}
