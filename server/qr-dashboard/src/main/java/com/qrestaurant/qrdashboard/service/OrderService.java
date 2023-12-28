package com.qrestaurant.qrdashboard.service;

import com.qrestaurant.qrdashboard.common.JWTUtil;
import com.qrestaurant.qrdashboard.common.MapperDTO;
import com.qrestaurant.qrdashboard.common.OrderStatus;
import com.qrestaurant.qrdashboard.exception.EntityNotFoundException;
import com.qrestaurant.qrdashboard.model.dto.MealOrderDTO;
import com.qrestaurant.qrdashboard.model.dto.OrderDTO;
import com.qrestaurant.qrdashboard.model.dto.OrderMealOrderDTO;
import com.qrestaurant.qrdashboard.model.entity.*;
import com.qrestaurant.qrdashboard.model.request.UpdateOrderRequest;
import com.qrestaurant.qrdashboard.repository.*;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final RestaurantRepository restaurantRepository;
    private final TableRepository tableRepository;
    private final MealOrderRepository mealOrderRepository;
    private final MealRepository mealRepository;
    private final KafkaTemplate<String, OrderDTO> orderKafkaTemplate;
    private final SimpMessagingTemplate orderMessagingTemplate;
    private final JWTUtil jwtUtil;
    private final MapperDTO mapperDTO;

    public OrderService(OrderRepository orderRepository, RestaurantRepository restaurantRepository,
                        TableRepository tableRepository, MealOrderRepository mealOrderRepository,
                        MealRepository mealRepository, KafkaTemplate<String, OrderDTO> orderKafkaTemplate,
                        SimpMessagingTemplate orderMessagingTemplate, JWTUtil jwtUtil, MapperDTO mapperDTO) {
        this.orderRepository = orderRepository;
        this.restaurantRepository = restaurantRepository;
        this.tableRepository = tableRepository;
        this.mealOrderRepository = mealOrderRepository;
        this.mealRepository = mealRepository;
        this.orderKafkaTemplate = orderKafkaTemplate;
        this.orderMessagingTemplate = orderMessagingTemplate;
        this.jwtUtil = jwtUtil;
        this.mapperDTO = mapperDTO;
    }

    public Iterable<Order> getOrderHistory(String authorizationHeader) {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        Iterable<Order> completedOrders =
                orderRepository.getAllByStatusAndRestaurant_Id(OrderStatus.COMPLETED, restaurantId);
        Iterable<Order> canceledOrders =
                orderRepository.getAllByStatusAndRestaurant_Id(OrderStatus.CANCELED, restaurantId);

        return Stream.concat(
                StreamSupport.stream(completedOrders.spliterator(), false),
                StreamSupport.stream(canceledOrders.spliterator(), false)
        ).toList();
    }

    public Iterable<Order> getCurrentOrders(String authorizationHeader) {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        return orderRepository.getAllByStatusAndRestaurant_Id(OrderStatus.IN_PROGRESS, restaurantId);
    }

    public Order getOrder(String authorizationHeader, Long id) throws EntityNotFoundException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        return orderRepository
                .findByIdAndRestaurant_Id(id, restaurantId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Order with id: " + id + " does not exists in restaurant with id: " + restaurantId + '.'));
    }

    public Order updateOrder(String authorizationHeader, UpdateOrderRequest updateOrderRequest)
            throws EntityNotFoundException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        Optional<Order> optionalOrder = orderRepository.findByIdAndRestaurant_Id(updateOrderRequest.id(), restaurantId);

        if (optionalOrder.isEmpty()) {
            throw new EntityNotFoundException("Order with id: " + updateOrderRequest.id() +
                    " does not exists in restaurant with id: " + restaurantId + '.');
        }

        Order order = optionalOrder.get();

        order.setStatus(updateOrderRequest.status());
        order.setCompletionDate(updateOrderRequest.completionDate());

        order = orderRepository.save(order);

        orderKafkaTemplate.send("dashboard-order", mapperDTO.toOrderDTO(order));

        Iterable<Order> ordersInProgress =
                orderRepository.getAllByStatusAndRestaurant_Id(OrderStatus.IN_PROGRESS, restaurantId);

        Map<String, Iterable<OrderDTO>> wsOrders = new HashMap<>();
        wsOrders.put("orders", mapperDTO.toOrderDTOs(ordersInProgress));

        orderMessagingTemplate.convertAndSend("/topic/order/" + order.getRestaurant().getId(), wsOrders);

        return order;
    }

    @KafkaListener(topics = "app-order-meal-order", groupId = "qrestaurant",
            containerFactory = "orderMealOrderConcurrentKafkaListenerContainerFactory")
    public void orderMealOrderListener(OrderMealOrderDTO orderMealOrderDTO) {
        OrderDTO orderDTO = orderMealOrderDTO.orderDTO();

        Optional<Restaurant> optionalRestaurant = restaurantRepository.findById(orderDTO.restaurantId());

        if (optionalRestaurant.isPresent()) {
            Restaurant restaurant = optionalRestaurant.get();

            Optional<Table> optionalTable =
                    tableRepository.findByIdAndRestaurant_Id(orderDTO.tableId(), restaurant.getId());

            if (optionalTable.isPresent()) {
                Table table = optionalTable.get();

                Order order = new Order(orderDTO.id(), orderDTO.price(), orderDTO.status(), orderDTO.orderDate());
                order.setRestaurant(restaurant);
                order.setTable(table);

                Iterable<MealOrderDTO> mealOrderDTOs = orderMealOrderDTO.mealOrderDTOs();

                List<MealOrder> mealOrders = new ArrayList<>();

                mealOrderDTOs.forEach(mealOrderDTO -> {
                    Optional<Meal> optionalMeal =
                            mealRepository.findByIdAndMenu_Restaurant_Id(mealOrderDTO.mealId(), restaurant.getId());

                    if (optionalMeal.isPresent()) {
                        MealOrder mealOrder = new MealOrder(mealOrderDTO.id(), mealOrderDTO.amount());
                        mealOrder.setMeal(optionalMeal.get());
                        mealOrder.setOrder(order);

                        mealOrders.add(mealOrder);
                    }
                });

                orderRepository.save(order);
                mealOrderRepository.saveAll(mealOrders);

                Iterable<Order> ordersInProgress = orderRepository.getAllByStatusAndRestaurant_Id(
                        OrderStatus.IN_PROGRESS, order.getRestaurant().getId());

                Map<String, Iterable<OrderDTO>> wsOrders = new HashMap<>();
                wsOrders.put("orders", mapperDTO.toOrderDTOs(ordersInProgress));

                orderMessagingTemplate.convertAndSend(
                        "/topic/order/" + order.getRestaurant().getId(), wsOrders);
            }
        }
    }
}
