package com.qrestaurant.qrdashboard.common;

import com.qrestaurant.qrdashboard.model.dto.MealDTO;
import com.qrestaurant.qrdashboard.model.dto.MenuDTO;
import com.qrestaurant.qrdashboard.model.dto.RestaurantDTO;
import com.qrestaurant.qrdashboard.model.dto.UserDTO;
import com.qrestaurant.qrdashboard.model.entity.Meal;
import com.qrestaurant.qrdashboard.model.entity.Menu;
import com.qrestaurant.qrdashboard.model.entity.Restaurant;
import com.qrestaurant.qrdashboard.model.entity.User;
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

        return new RestaurantDTO(restaurant.getId(), restaurant.getName(), userIds, restaurant.getMenu().getId());
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
        Iterable<Long> mealIds = menu.getMeals()
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

        meals.forEach(meal -> mealDTOs.add(
                new MealDTO(meal.getId(), meal.getName(), meal.getDescription(), meal.getPrice(),
                        meal.getMenu().getId()))
        );

        return mealDTOs;
    }
}
