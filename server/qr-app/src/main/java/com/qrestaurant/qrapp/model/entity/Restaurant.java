package com.qrestaurant.qrapp.model.entity;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

@Entity
@Table(name = "restaurants")
public class Restaurant {
    @Id
    private Long id;
    @NotNull(message = "{name.notnull}")
    private String name;
    @NotNull(message = "{prefix.notnull}")
    @Size(min = 2, max = 2, message = "{prefix.size}")
    private String prefix;
    @Lob
    private String image;
    @NotNull(message = "{featured.notnull}")
    @Column(columnDefinition = "boolean default false")
    private Boolean featured;
    @OneToOne(mappedBy = "restaurant", cascade = CascadeType.REMOVE)
    private Menu menu;
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.REMOVE)
    private List<com.qrestaurant.qrapp.model.entity.Table> tables;
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.REMOVE)
    private List<MealCategory> mealCategories;
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.REMOVE)
    private List<Order> orders;

    public Restaurant() {}

    public Restaurant(Long id, String name, String prefix, String image, Boolean featured) {
        this.id = id;
        this.name = name;
        this.prefix = prefix;
        this.image = image;
        this.featured = featured;
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

    public Menu getMenu() {
        return menu;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }

    public List<com.qrestaurant.qrapp.model.entity.Table> getTables() {
        return tables;
    }

    public void setTables(List<com.qrestaurant.qrapp.model.entity.Table> tables) {
        this.tables = tables;
    }

    public List<MealCategory> getMealCategories() {
        return mealCategories;
    }

    public void setMealCategories(List<MealCategory> mealCategories) {
        this.mealCategories = mealCategories;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }
}
