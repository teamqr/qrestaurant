package com.qrestaurant.qrapp.configuration;

import com.qrestaurant.qrapp.model.dto.OrderDTO;
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
    public ProducerFactory<String, OrderDTO> orderProducerFactory() {
        return new DefaultKafkaProducerFactory<>(kafkaProducerConfiguration.configs());
    }
}
