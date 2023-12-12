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

    @Transactional
    public MenuDTO toMenuDTO(Menu menu) {
        List<Long> mealIds = menu.getMeals()
                .stream()
                .map(Meal::getId)
                .toList();

        return new MenuDTO(menu.getId(), menu.getRestaurant().getId(), mealIds);
    }

    @Transactional
    public MealDTO toMealDTO(Meal meal) {
        Iterable<Long> mealCategoryIds = meal.getMealCategories()
                .stream()
                .map(MealCategory::getId)
                .toList();

        return new MealDTO(meal.getId(), meal.getName(), meal.getDescription(), meal.getPrice(), meal.getImage(),
                meal.getMenu().getId(), mealCategoryIds);
    }

    @Transactional
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
}
