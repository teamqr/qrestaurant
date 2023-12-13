package com.qrestaurant.qrdashboard.model.entity;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

@Entity
@Table(name = "restaurants")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String name;
    @NotNull
    @Size(min = 2, max = 2)
    private String prefix;
    @Lob
    private String image;
    @NotNull
    @Column(columnDefinition = "boolean default false")
    private Boolean featured;
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.REMOVE)
    private List<User> users;
    @OneToOne(mappedBy = "restaurant", cascade = CascadeType.REMOVE)
    private Menu menu;
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.REMOVE)
    private List<com.qrestaurant.qrdashboard.model.entity.Table> tables;
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.REMOVE)
    private List<MealCategory> mealCategories;

    public Restaurant() {}

    public Restaurant(String name, String prefix, String image) {
        this.name = name;
        this.prefix = prefix;
        this.image = image;
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

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Boolean getFeatured() {
        return featured;
    }

    public void setFeatured(Boolean featured) {
        this.featured = featured;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public Menu getMenu() {
        return menu;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }

    public List<com.qrestaurant.qrdashboard.model.entity.Table> getTables() {
        return tables;
    }

    public void setTables(List<com.qrestaurant.qrdashboard.model.entity.Table> tables) {
        this.tables = tables;
    }

    public List<MealCategory> getMealCategories() {
        return mealCategories;
    }

    public void setMealCategories(List<MealCategory> mealCategories) {
        this.mealCategories = mealCategories;
    }
}
