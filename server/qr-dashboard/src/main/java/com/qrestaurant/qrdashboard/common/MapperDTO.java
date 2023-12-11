package com.qrestaurant.qrdashboard.common;

import com.qrestaurant.qrdashboard.model.dto.*;
import com.qrestaurant.qrdashboard.model.entity.*;
import jakarta.transaction.Transactional;
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

        Iterable<Long> mealCategoryIds = restaurant.getMealCategories()
                .stream()
                .map(MealCategory::getId)
                .toList();

        return new RestaurantDTO(restaurant.getId(), restaurant.getName(), restaurant.getPrefix(), restaurant.getImage(),
                userIds, menuId, tableIds, mealCategoryIds);
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

    @Transactional
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
