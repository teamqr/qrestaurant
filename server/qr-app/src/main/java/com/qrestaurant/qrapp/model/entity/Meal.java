package com.qrestaurant.qrapp.model.entity;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "meals")
public class Meal {
    @Id
    private Long id;
    @NotNull
    private String name;
    private String description;
    @NotNull
    private BigDecimal price;
    @Lob
    private String image;
    @ManyToOne
    @JoinColumn(name = "menu_id")
    private Menu menu;
    @ManyToMany
    @JoinTable(name = "meal_category",
            joinColumns = @JoinColumn(name = "meal_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "category_id", referencedColumnName = "id"))
    private List<MealCategory> mealCategories;

    public Meal() {}

    public Meal(Long id, String name, String description, BigDecimal price, String image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Menu getMenu() {
        return menu;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }

    public List<MealCategory> getMealCategories() {
        return mealCategories;
    }

    public void setMealCategories(List<MealCategory> mealCategories) {
        this.mealCategories = mealCategories;
    }
}
