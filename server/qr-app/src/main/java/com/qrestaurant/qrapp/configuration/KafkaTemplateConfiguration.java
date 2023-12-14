package com.qrestaurant.qrapp.configuration;

import com.qrestaurant.qrapp.model.dto.OrderDTO;
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
    public KafkaTemplate<String, OrderDTO> orderKafkaTemplate() {
        return new KafkaTemplate<>(kafkaProducerFactoryConfiguration.orderProducerFactory());
    }
}
