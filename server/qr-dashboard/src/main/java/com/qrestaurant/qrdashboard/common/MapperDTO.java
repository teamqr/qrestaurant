package com.qrestaurant.qrdashboard.common;

import com.qrestaurant.qrdashboard.model.dto.*;
import com.qrestaurant.qrdashboard.model.entity.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Transactional
public class MapperDTO {
    public RestaurantDTO toRestaurantDTO(Restaurant restaurant) {
        Iterable<Long> userIds = restaurant.getUsers()
                .stream()
                .map(User::getId)
                .toList();

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

        Iterable<Long> orderIds = restaurant.getOrders()
                .stream()
                .map(Order::getId)
                .toList();

        return new RestaurantDTO(restaurant.getId(), restaurant.getName(), restaurant.getPrefix(), restaurant.getImage(),
                userIds, menuId, tableIds, mealCategoryIds, orderIds);
    }

    public UserDTO toUserDTO(User user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getRole(), user.getRestaurant().getId());
    }

    public Iterable<UserDTO> toUserDTOs(Iterable<User> users) {
        List<UserDTO> userDTOs = new ArrayList<>();

        users.forEach(user -> userDTOs.add(
                new UserDTO(user.getId(), user.getUsername(), user.getRole(), user.getRestaurant().getId())));

        return userDTOs;
    }

    public MenuDTO toMenuDTO(Menu menu) {
        Iterable<Long> mealIds = new ArrayList<>();

        if (menu.getMeals() != null) {
            mealIds = menu.getMeals()
                    .stream()
                    .map(Meal::getId)
                    .toList();
        }

        return new MenuDTO(menu.getId(), menu.getRestaurant().getId(), mealIds);
    }

    public MealDTO toMealDTO(Meal meal) {
        List<Long> mealCategoryIds = new ArrayList<>();

        if (meal.getMealCategories() != null) {
            mealCategoryIds = meal.getMealCategories()
                    .stream()
                    .map(MealCategory::getId)
                    .toList();
        }

        return new MealDTO(meal.getId(), meal.getName(), meal.getDescription(), meal.getPrice(), meal.getImage(),
                meal.getMenu().getId(), mealCategoryIds);
    }

    public Iterable<MealDTO> toMealDTOs(Iterable<Meal> meals) {
        List<MealDTO> mealDTOs = new ArrayList<>();

        meals.forEach(meal -> {
            List<Long> mealCategoryIds = new ArrayList<>();

            if (meal.getMealCategories() != null) {
                mealCategoryIds = meal.getMealCategories()
                        .stream()
                        .map(MealCategory::getId)
                        .toList();
            }

            mealDTOs.add(new MealDTO(meal.getId(), meal.getName(), meal.getDescription(), meal.getPrice(),
                    meal.getImage(), meal.getMenu().getId(), mealCategoryIds));
        });

        return mealDTOs;
    }

    public TableDTO toTableDTO(Table table) {
        List<Long> orderIds = new ArrayList<>();

        if (table.getOrders() != null) {
            orderIds = table.getOrders()
                    .stream()
                    .map(Order::getId)
                    .toList();
        }

        return new TableDTO(table.getId(), table.getNumber(), table.getPrefix(), table.getCode(),
                table.getRestaurant().getId(), orderIds);
    }

    public Iterable<TableDTO> toTableDTOs(Iterable<Table> tables) {
        List<TableDTO> tableDTOs = new ArrayList<>();

        tables.forEach(table -> {
            List<Long> orderIds = new ArrayList<>();

            if (table.getOrders() != null) {
                orderIds = table.getOrders()
                        .stream()
                        .map(Order::getId)
                        .toList();
            }

            tableDTOs.add(new TableDTO(table.getId(), table.getNumber(), table.getPrefix(), table.getCode(),
                    table.getRestaurant().getId(), orderIds));
        });

        return tableDTOs;
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
        Iterable<Long> mealOrderIds = order.getMealOrders()
                .stream()
                .map(MealOrder::getId)
                .toList();

        return new OrderDTO(order.getId(), order.getPrice(), order.getStatus(), order.getOrderDate(),
                order.getCompletionDate(), order.getTable().getId(), order.getRestaurant().getId(), mealOrderIds);
    }
    
    public Iterable<OrderDTO> toOrderDTOs(Iterable<Order> orders) {
        List<OrderDTO> orderDTOs = new ArrayList<>();

        orders.forEach(order -> {
            Iterable<Long> mealOrderIds = order.getMealOrders()
                    .stream()
                    .map(MealOrder::getId)
                    .toList();

            orderDTOs.add(new OrderDTO(order.getId(), order.getPrice(), order.getStatus(), order.getOrderDate(),
                    order.getCompletionDate(), order.getTable().getId(), order.getRestaurant().getId(), mealOrderIds));
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
}
