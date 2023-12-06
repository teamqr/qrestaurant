package com.qrestaurant.qrdashboard.common;

import com.qrestaurant.qrdashboard.model.dto.*;
import com.qrestaurant.qrdashboard.model.entity.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
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

        return new RestaurantDTO(
                restaurant.getId(), restaurant.getName(), restaurant.getPrefix(), userIds, menuId, tableIds);
    }

    public UserDTO toUserDTO(User user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getRole(), user.getRestaurant().getId());
    }

    public Iterable<UserDTO> toUserDTOs(Iterable<User> users) {
        List<UserDTO> userDTOs = new ArrayList<>();

        users.forEach(user -> userDTOs.add(
                new UserDTO(user.getId(), user.getUsername(), user.getRole(), user.getRestaurant().getId()))
        );

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
        return new MealDTO(meal.getId(), meal.getName(), meal.getDescription(), meal.getPrice(), meal.getMenu().getId());
    }

    public Iterable<MealDTO> toMealDTOs(Iterable<Meal> meals) {
        List<MealDTO> mealDTOs = new ArrayList<>();

        meals.forEach(meal -> mealDTOs.add(
                new MealDTO(meal.getId(), meal.getName(), meal.getDescription(), meal.getPrice(),
                        meal.getMenu().getId()))
        );

        return mealDTOs;
    }

    public TableDTO toTableDTO(Table table) {
        return new TableDTO(
                table.getId(), table.getNumber(), table.getPrefix(), table.getCode(), table.getRestaurant().getId());
    }

    public Iterable<TableDTO> toTableDTOs(Iterable<Table> tables) {
        List<TableDTO> tableDTOs = new ArrayList<>();

        tables.forEach(table -> tableDTOs.add(
                new TableDTO(table.getId(), table.getNumber(), table.getPrefix(), table.getCode(),
                        table.getRestaurant().getId())));

        return tableDTOs;
    }
}
