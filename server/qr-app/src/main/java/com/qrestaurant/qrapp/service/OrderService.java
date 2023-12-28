package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.common.JWTUtil;
import com.qrestaurant.qrapp.common.MapperDTO;
import com.qrestaurant.qrapp.exception.EntityNotFoundException;
import com.qrestaurant.qrapp.model.dto.OrderDTO;
import com.qrestaurant.qrapp.model.dto.OrderMealOrderDTO;
import com.qrestaurant.qrapp.model.entity.*;
import com.qrestaurant.qrapp.model.request.NewOrderRequest;
import com.qrestaurant.qrapp.repository.*;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final TableRepository tableRepository;
    private final MealRepository mealRepository;
    private final MealOrderRepository mealOrderRepository;
    private final KafkaTemplate<String, OrderMealOrderDTO> orderMealOrderKafkaTemplate;
    private final SimpMessagingTemplate orderMessagingTemplate;
    private final JWTUtil jwtUtil;
    private final MapperDTO mapperDTO;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository,
                        RestaurantRepository restaurantRepository, TableRepository tableRepository,
                        MealRepository mealRepository, MealOrderRepository mealOrderRepository,
                        KafkaTemplate<String, OrderMealOrderDTO> orderMealOrderKafkaTemplate,
                        SimpMessagingTemplate orderMessagingTemplate, JWTUtil jwtUtil, MapperDTO mapperDTO) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.restaurantRepository = restaurantRepository;
        this.tableRepository = tableRepository;
        this.mealRepository = mealRepository;
        this.mealOrderRepository = mealOrderRepository;
        this.orderMealOrderKafkaTemplate = orderMealOrderKafkaTemplate;
        this.orderMessagingTemplate = orderMessagingTemplate;
        this.jwtUtil = jwtUtil;
        this.mapperDTO = mapperDTO;
    }

    public Iterable<Order> getOrders(String authorizationHeader) {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long id = jwtToken.getClaim("id");

        return orderRepository.getAllByUser_Id(id);
    }

    public Order getOrder(String authorizationHeader, Long id) throws EntityNotFoundException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long userId = jwtToken.getClaim("id");

        return orderRepository
                .findByIdAndUser_Id(id, userId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "User with id: " + userId + " does not have an order with id: " + id + '.'));
    }

    public Order createOrder(String authorizationHeader, NewOrderRequest newOrderRequest) throws EntityNotFoundException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long userId = jwtToken.getClaim("id");

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            throw new EntityNotFoundException("User with id: " + " does not exists.");
        }

        User user = optionalUser.get();

        Optional<Restaurant> optionalRestaurant = restaurantRepository.findById(newOrderRequest.restaurantId());

        if (optionalRestaurant.isEmpty()) {
            throw new EntityNotFoundException(
                    "Restaurant with id: " + newOrderRequest.restaurantId() + " does not exists.");
        }

        Restaurant restaurant = optionalRestaurant.get();

        Optional<Table> optionalTable =
                tableRepository.findByIdAndRestaurant_Id(newOrderRequest.tableId(), restaurant.getId());

        if (optionalTable.isEmpty()) {
            throw new EntityNotFoundException("Table with id: " + newOrderRequest.tableId() +
                    " does not exists in restaurant with id: " + restaurant.getId());
        }

        Table table = optionalTable.get();

        AtomicReference<BigDecimal> price = new AtomicReference<>(BigDecimal.ZERO);

        List<MealOrder> mealOrders = new ArrayList<>();

        newOrderRequest.orderProducts().forEach(orderProduct -> {
            Optional<Meal> optionalMeal =
                    mealRepository.findByIdAndMenu_Restaurant_Id(orderProduct.id(), restaurant.getId());

            if (optionalMeal.isEmpty()) {
                throw new EntityNotFoundException("Meal with id: " + orderProduct.id() +
                        " does not exists in restaurant with id: " + restaurant.getId());
            }

            Meal meal = optionalMeal.get();

            MealOrder mealOrder = new MealOrder();
            mealOrder.setMeal(meal);
            mealOrder.setAmount(orderProduct.amount());

            mealOrders.add(mealOrder);

            price.updateAndGet(bigDecimal ->
                    bigDecimal.add(meal.getPrice().multiply(BigDecimal.valueOf(orderProduct.amount()))));
        });

        Order order = new Order(price.get());
        order.setTable(table);
        order.setRestaurant(restaurant);
        order.setUser(user);

        order = orderRepository.save(order);

        List<MealOrder> insertedMealOrders = new ArrayList<>();

        Order finalOrder = order;
        mealOrders.forEach(mealOrder -> {
            mealOrder.setOrder(finalOrder);

            insertedMealOrders.add(mealOrderRepository.save(mealOrder));
        });

        OrderMealOrderDTO orderMealOrderDTO =
                new OrderMealOrderDTO(mapperDTO.toOrderDTO(order), mapperDTO.toMealOrderDTOs(insertedMealOrders));

        orderMealOrderKafkaTemplate.send("app-order-meal-order", orderMealOrderDTO);

        orderMessagingTemplate.convertAndSend(
                "/topic/order/" + order.getId(), mapperDTO.toOrderSummaryDTO(order));

        return order;
    }

    @KafkaListener(topics = "dashboard-order", groupId = "qrestaurant",
            containerFactory = "orderConcurrentKafkaListenerContainerFactory")
    public void orderListener(OrderDTO orderDTO) {
        Optional<Order> optionalOrder = orderRepository.findById(orderDTO.id());

        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();

            order.setStatus(orderDTO.status());
            order.setCompletionDate(orderDTO.completionDate());

            orderRepository.save(order);

            orderMessagingTemplate.convertAndSend(
                    "/topic/order/" + order.getId(), mapperDTO.toOrderSummaryDTO(order));
        }
    }
}
