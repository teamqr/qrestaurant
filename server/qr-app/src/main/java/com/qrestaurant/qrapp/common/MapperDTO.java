package com.qrestaurant.qrapp.common;

import com.qrestaurant.qrapp.model.dto.MealDTO;
import com.qrestaurant.qrapp.model.dto.MenuDTO;
import com.qrestaurant.qrapp.model.dto.RestaurantDTO;
import com.qrestaurant.qrapp.model.dto.UserDTO;
import com.qrestaurant.qrapp.model.entity.Meal;
import com.qrestaurant.qrapp.model.entity.Menu;
import com.qrestaurant.qrapp.model.entity.Restaurant;
import com.qrestaurant.qrapp.model.entity.User;
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

        return new RestaurantDTO(restaurant.getId(), restaurant.getName(), menuId);
    }

    public Iterable<RestaurantDTO> toRestaurantDTOs(Iterable<Restaurant> restaurants) {
        List<RestaurantDTO> restaurantDTOs = new ArrayList<>();

        restaurants.forEach(restaurant -> {
            Long menuId = null;

            if (restaurant.getMenu() != null) {
                menuId = restaurant.getMenu().getId();
            }

            restaurantDTOs.add(new RestaurantDTO(restaurant.getId(), restaurant.getName(), menuId));
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
        return new MealDTO(meal.getId(), meal.getName(), meal.getDescription(), meal.getPrice(), meal.getMenu().getId());
    }

    public Iterable<MealDTO> toMealDTOs(Iterable<Meal> meals) {
        List<MealDTO> mealDTOs = new ArrayList<>();

        meals.forEach(meal -> mealDTOs.add(new MealDTO(
                meal.getId(), meal.getName(), meal.getDescription(), meal.getPrice(), meal.getMenu().getId()
        )));

        return mealDTOs;
    }
}
