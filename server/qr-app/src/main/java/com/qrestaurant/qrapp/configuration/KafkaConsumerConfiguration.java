package com.qrestaurant.qrapp.configuration;

import com.qrestaurant.qrapp.model.dto.MealDTO;
import com.qrestaurant.qrapp.model.dto.MenuDTO;
import com.qrestaurant.qrapp.model.dto.RestaurantDTO;
import com.qrestaurant.qrapp.model.entity.Meal;
import com.qrestaurant.qrapp.model.entity.Menu;
import com.qrestaurant.qrapp.model.entity.Restaurant;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.Map;

@EnableKafka
@Configuration
public class KafkaConsumerConfiguration {
    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    private Map<String, Object> configs() {
        Map<String, Object> configs = new HashMap<>();

        configs.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        configs.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        configs.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);

        return configs;
    }

    @Bean
    public ConsumerFactory<String, RestaurantDTO> restaurantConsumerFactory() {
        return new DefaultKafkaConsumerFactory<>(configs(), new StringDeserializer(),
                new JsonDeserializer<>(RestaurantDTO.class, false));
    }

    @Bean
    public ConsumerFactory<String, MenuDTO> menuConsumerFactory() {
        return new DefaultKafkaConsumerFactory<>(configs(), new StringDeserializer(),
                new JsonDeserializer<>(MenuDTO.class, false));
    }

    @Bean
    public ConsumerFactory<String, MealDTO> mealConsumerFactory() {
        return new DefaultKafkaConsumerFactory<>(configs(), new StringDeserializer(),
                new JsonDeserializer<>(MealDTO.class, false));
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, RestaurantDTO> restaurantKafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, RestaurantDTO> factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(restaurantConsumerFactory());

        return factory;
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, MenuDTO> menuConcurrentKafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, MenuDTO> factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(menuConsumerFactory());

        return factory;
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, MealDTO> mealConcurrentKafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, MealDTO> factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(mealConsumerFactory());

        return factory;
    }
}
