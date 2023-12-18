package com.qrestaurant.qrdashboard.configuration;

import com.qrestaurant.qrdashboard.model.dto.OrderDTO;
import com.qrestaurant.qrdashboard.model.dto.OrderMealOrderDTO;
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
    public ConsumerFactory<String, OrderDTO> orderConsumerFactory() {
        return new DefaultKafkaConsumerFactory<>(kafkaConsumerConfiguration.configs(), new StringDeserializer(),
                new JsonDeserializer<>(OrderDTO.class, false));
    }

    @Bean
    public ConsumerFactory<String, OrderMealOrderDTO> orderMealOrderConsumerFactory() {
        return new DefaultKafkaConsumerFactory<>(kafkaConsumerConfiguration.configs(), new StringDeserializer(),
                new JsonDeserializer<>(OrderMealOrderDTO.class, false));
    }
}
