package com.qrestaurant.qrapp.common;

import com.qrestaurant.qrapp.model.dto.*;
import com.qrestaurant.qrapp.model.entity.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MapperDTO {
    public UserDTO toUserDTO(User user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getFirstname(), user.getLastname());
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

        return new RestaurantDTO(restaurant.getId(), restaurant.getName(), restaurant.getPrefix(), restaurant.getImage(),
                restaurant.getFeatured(), menuId, tableIds);
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

            restaurantDTOs.add(new RestaurantDTO(restaurant.getId(), restaurant.getName(), restaurant.getPrefix(),
                    restaurant.getImage(), restaurant.getFeatured(), menuId, tableIds));
        });

        return restaurantDTOs;
    }

    @Transactional
    public MenuDTO toMenuDTO(Menu menu) {
        List<Long> mealIds = menu.getMeals()
                .stream()
                .map(Meal::getId)
                .toList();

        return new MenuDTO(menu.getId(), menu.getRestaurant().getId(), mealIds);
    }

    public MealDTO toMealDTO(Meal meal) {
        return new MealDTO(meal.getId(), meal.getName(), meal.getDescription(), meal.getPrice(), meal.getImage(),
                meal.getMenu().getId());
    }

    public Iterable<MealDTO> toMealDTOs(Iterable<Meal> meals) {
        List<MealDTO> mealDTOs = new ArrayList<>();

        meals.forEach(meal -> mealDTOs.add(new MealDTO(meal.getId(), meal.getName(), meal.getDescription(),
                meal.getPrice(), meal.getImage(), meal.getMenu().getId()
        )));

        return mealDTOs;
    }

    public TableDTO toTableDTO(Table table) {
        return new TableDTO(
                table.getId(), table.getNumber(), table.getPrefix(), table.getCode(), table.getRestaurant().getId());
    }
}
