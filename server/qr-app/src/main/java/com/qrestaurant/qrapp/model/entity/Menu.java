package com.qrestaurant.qrapp.model.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "menus")
public class Menu {
    @Id
    private Long id;
    @OneToOne(mappedBy = "menu")
    private Restaurant restaurant;
    @OneToMany(mappedBy = "menu", cascade = CascadeType.REMOVE)
    private List<Meal> meals;

    public Menu() {}

    public Menu(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}
