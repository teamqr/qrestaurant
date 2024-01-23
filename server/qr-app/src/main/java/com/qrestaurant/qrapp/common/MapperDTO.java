package com.qrestaurant.qrapp.common;

import com.qrestaurant.qrapp.model.dto.*;
import com.qrestaurant.qrapp.model.entity.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
@Transactional
public class MapperDTO {
    public UserDTO toUserDTO(User user) {
        List<Long> orderIds = new ArrayList<>();

        if (user.getOrders() != null) {
            orderIds = user.getOrders()
                    .stream()
                    .map(Order::getId)
                    .toList();
        }

        return new UserDTO(user.getId(), user.getUsername(), user.getFirstname(), user.getLastname(), orderIds);
    }

    public RestaurantDTO toRestaurantDTO(Restaurant restaurant) {
        Long menuId = null;

        if (restaurant.getMenu() != null) {
            menuId = restaurant.getMenu().getId();
        }

        Iterable<Long> tableIds = restaurant.getTables()
                .stream()
                .map(Table::getId)
                .toList();

        Iterable<Long> mealCategoryIds = restaurant.getMealCategories()
                .stream()
                .map(MealCategory::getId)
                .toList();

        return new RestaurantDTO(restaurant.getId(), restaurant.getName(), restaurant.getPrefix(), restaurant.getImage(),
                restaurant.getFeatured(), menuId, tableIds, mealCategoryIds);
    }

    public Iterable<RestaurantDTO> toRestaurantDTOs(Iterable<Restaurant> restaurants) {
        List<RestaurantDTO> restaurantDTOs = new ArrayList<>();

        restaurants.forEach(restaurant -> {
            Long menuId = null;

            if (restaurant.getMenu() != null) {
                menuId = restaurant.getMenu().getId();
            }

            Iterable<Long> tableIds = restaurant.getTables()
                    .stream()
                    .map(Table::getId)
                    .toList();

            Iterable<Long> mealCategoryIds = restaurant.getMealCategories()
                    .stream()
                    .map(MealCategory::getId)
                    .toList();

            restaurantDTOs.add(new RestaurantDTO(restaurant.getId(), restaurant.getName(), restaurant.getPrefix(),
                    restaurant.getImage(), restaurant.getFeatured(), menuId, tableIds, mealCategoryIds));
        });

        return restaurantDTOs;
    }

    public MenuDTO toMenuDTO(Menu menu) {
        List<Long> mealIds = menu.getMeals()
                .stream()
                .map(Meal::getId)
                .toList();

        return new MenuDTO(menu.getId(), menu.getRestaurant().getId(), mealIds);
    }

    public MealDTO toMealDTO(Meal meal) {
        Iterable<Long> mealCategoryIds = meal.getMealCategories()
                .stream()
                .map(MealCategory::getId)
                .toList();

        return new MealDTO(meal.getId(), meal.getName(), meal.getDescription(), meal.getPrice(), meal.getImage(),
                meal.getMenu().getId(), mealCategoryIds);
    }

    public Iterable<MealDTO> toMealDTOs(Iterable<Meal> meals) {
        List<MealDTO> mealDTOs = new ArrayList<>();

        meals.forEach(meal -> {
            Iterable<Long> mealCategoryIds = meal.getMealCategories()
                    .stream()
                    .map(MealCategory::getId)
                    .toList();

            mealDTOs.add(new MealDTO(meal.getId(), meal.getName(), meal.getDescription(), meal.getPrice(),
                    meal.getImage(), meal.getMenu().getId(), mealCategoryIds));
        });

        return mealDTOs;
    }

    public TableDTO toTableDTO(Table table) {
        List<Long> orderIds =  new ArrayList<>();

        if (table.getOrders() != null) {
            orderIds = table.getOrders()
                    .stream()
                    .map(Order::getId)
                    .toList();
        }

        return new TableDTO(table.getId(), table.getNumber(), table.getPrefix(), table.getCode(),
                table.getRestaurant().getId(), orderIds);
    }

    public MealCategoryDTO toMealCategoryDTO(MealCategory mealCategory) {
        Iterable<Long> mealIds = new ArrayList<>();

        if (mealCategory.getMeals() != null) {
            mealIds = mealCategory.getMeals()
                    .stream()
                    .map(Meal::getId)
                    .toList();
        }

        return new MealCategoryDTO(
                mealCategory.getId(), mealCategory.getName(), mealCategory.getRestaurant().getId(), mealIds);
    }

    public Iterable<MealCategoryDTO> toMealCategoryDTOs(Iterable<MealCategory> mealCategories) {
        List<MealCategoryDTO> mealCategoryDTOs = new ArrayList<>();

        mealCategories.forEach(mealCategory -> {
            Iterable<Long> mealIds = mealCategory.getMeals()
                    .stream()
                    .map(Meal::getId)
                    .toList();

            mealCategoryDTOs.add(new MealCategoryDTO(mealCategory.getId(), mealCategory.getName(),
                    mealCategory.getRestaurant().getId(), mealIds));
        });

        return mealCategoryDTOs;
    }

    public OrderDTO toOrderDTO(Order order) {
        List<Long> mealOrderIds = new ArrayList<>();

        if (order.getMealOrders() != null) {
            mealOrderIds = order.getMealOrders()
                    .stream()
                    .map(MealOrder::getId)
                    .toList();
        }

        Long tableId = null;

        if (order.getTable() != null) {
            tableId = order.getTable().getId();
        }

        return new OrderDTO(order.getId(), order.getPrice(), order.getStatus(), order.getOrderDate(),
                order.getCompletionDate(), tableId, order.getRestaurant().getId(), order.getUser().getId(), mealOrderIds);
    }

    public Iterable<OrderDTO> toOrderDTOs(Iterable<Order> orders) {
        List<OrderDTO> orderDTOs = new ArrayList<>();

        orders.forEach(order -> {
            List<Long> mealOrderIds = new ArrayList<>();

            if (order.getMealOrders() != null) {
                mealOrderIds = order.getMealOrders()
                        .stream()
                        .map(MealOrder::getId)
                        .toList();
            }

            Long tableId = null;

            if (order.getTable() != null) {
                tableId = order.getTable().getId();
            }

            orderDTOs.add(new OrderDTO(order.getId(), order.getPrice(), order.getStatus(), order.getOrderDate(),
                    order.getCompletionDate(), tableId, order.getRestaurant().getId(), order.getUser().getId(),
                    mealOrderIds));
        });

        return orderDTOs;
    }

    public MealOrderDTO toMealOrderDTO(MealOrder mealOrder) {
        return new MealOrderDTO(
                mealOrder.getId(), mealOrder.getMeal().getId(), mealOrder.getOrder().getId(), mealOrder.getAmount());
    }

    public Iterable<MealOrderDTO> toMealOrderDTOs(Iterable<MealOrder> mealOrders) {
        List<MealOrderDTO> mealOrderDTOs = new ArrayList<>();

        mealOrders.forEach(mealOrder -> mealOrderDTOs.add(new MealOrderDTO(mealOrder.getId(),
                mealOrder.getMeal().getId(), mealOrder.getOrder().getId(), mealOrder.getAmount())));

        return mealOrderDTOs;
    }

    public OrderSummaryDTO toOrderSummaryDTO(Order order) {
        List<MealSummaryDTO> meals = new ArrayList<>();

        if (order.getMealOrders() != null) {
            order.getMealOrders().forEach(mealOrder -> {
                Meal meal = mealOrder.getMeal();

                meals.add(new MealSummaryDTO(meal.getId(), meal.getName(), meal.getDescription(),
                        meal.getPrice().multiply(new BigDecimal(mealOrder.getAmount())), mealOrder.getAmount()));
            });
        }

        Long tableId = null;

        if (order.getTable() != null) {
            tableId = order.getTable().getId();
        }

        return new OrderSummaryDTO(order.getId(), order.getPrice(), order.getStatus(), order.getOrderDate(),
                order.getCompletionDate(), tableId, order.getRestaurant().getId(), order.getUser().getId(), meals);
    }

    public Iterable<OrderSummaryDTO> toOrderSummaryDTOs(Iterable<Order> orders) {
        List<OrderSummaryDTO> orderSummaryDTOs = new ArrayList<>();

        orders.forEach(order -> {
            List<MealSummaryDTO> meals = new ArrayList<>();

            if (order.getMealOrders() != null) {
                order.getMealOrders().forEach(mealOrder -> {
                    Meal meal = mealOrder.getMeal();

                    meals.add(new MealSummaryDTO(meal.getId(), meal.getName(), meal.getDescription(),
                            meal.getPrice().multiply(new BigDecimal(mealOrder.getAmount())), mealOrder.getAmount()));
                });
            }

            Long tableId = null;

            if (order.getTable() != null) {
                tableId = order.getTable().getId();
            }

            orderSummaryDTOs.add(new OrderSummaryDTO(order.getId(), order.getPrice(), order.getStatus(),
                    order.getOrderDate(), order.getCompletionDate(), tableId, order.getRestaurant().getId(),
                    order.getUser().getId(), meals));
        });

        return orderSummaryDTOs;
    }
}
