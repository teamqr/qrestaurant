package com.qrestaurant.qrapp.configuration;

import com.qrestaurant.qrapp.model.dto.MealDTO;
import com.qrestaurant.qrapp.model.dto.MenuDTO;
import com.qrestaurant.qrapp.model.dto.RestaurantDTO;
import com.qrestaurant.qrapp.model.dto.TableDTO;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;

@Configuration
public class KafkaListenerContainerFactoryConfiguration {
    private final KafkaConsumerFactoryConfiguration kafkaConsumerFactoryConfiguration;

    public KafkaListenerContainerFactoryConfiguration(
            KafkaConsumerFactoryConfiguration kafkaConsumerFactoryConfiguration) {
        this.kafkaConsumerFactoryConfiguration = kafkaConsumerFactoryConfiguration;
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, Long> deleteKafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, Long> factory = new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(kafkaConsumerFactoryConfiguration.deleteConsumerFactory());

        return factory;
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, RestaurantDTO> restaurantKafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, RestaurantDTO> factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(kafkaConsumerFactoryConfiguration.restaurantConsumerFactory());

        return factory;
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, MenuDTO> menuConcurrentKafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, MenuDTO> factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(kafkaConsumerFactoryConfiguration.menuConsumerFactory());

        return factory;
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, MealDTO> mealConcurrentKafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, MealDTO> factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(kafkaConsumerFactoryConfiguration.mealConsumerFactory());

        return factory;
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, TableDTO> tableConcurrentKafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, TableDTO> factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(kafkaConsumerFactoryConfiguration.tableConsumerFactory());

        return factory;
    }
}
