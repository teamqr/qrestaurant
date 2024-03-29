package com.qrestaurant.qrdashboard.configuration;

import com.qrestaurant.qrdashboard.model.dto.OrderDTO;
import com.qrestaurant.qrdashboard.model.dto.OrderMealOrderDTO;
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
    public ConcurrentKafkaListenerContainerFactory<String, OrderDTO> orderKafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, OrderDTO> factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(kafkaConsumerFactoryConfiguration.orderConsumerFactory());

        return factory;
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, OrderMealOrderDTO> orderMealOrderConcurrentKafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, OrderMealOrderDTO> factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(kafkaConsumerFactoryConfiguration.orderMealOrderConsumerFactory());

        return factory;
    }
}
