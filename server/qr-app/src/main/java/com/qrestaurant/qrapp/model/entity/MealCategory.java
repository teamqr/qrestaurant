package com.qrestaurant.qrapp.model.entity;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

@Entity
@Table(name = "meal_categories")
public class MealCategory {
    @Id
    private Long id;
    @NotBlank
    private String name;
    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;
    @ManyToMany(mappedBy = "mealCategories")
    private List<Meal> meals;

    public MealCategory() {}

    public MealCategory(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public List<Meal> getMeals() {
        return meals;
    }

    public void setMeals(List<Meal> meals) {
        this.meals = meals;
    }

    @PreRemove
    private void removeMealAssociations() {
        for (Meal meal : this.meals) {
            meal.getMealCategories().remove(this);
        }
    }
}
