package com.qrestaurant.qrdashboard.model.entity;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "meals")
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "{name.notnull}")
    private String name;
    private String description;
    @NotNull(message = "{price.notnull}")
    @DecimalMin(value = "0.00", message = "{price.decimal.min}")
    private BigDecimal price;
    @Lob
    private String image;
    @OneToMany(mappedBy = "meal")
    private List<MealOrder> mealOrders;
    @ManyToOne
    @JoinColumn(name = "menu_id")
    private Menu menu;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "meal_category",
            joinColumns = @JoinColumn(name = "meal_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "category_id", referencedColumnName = "id"))
    private List<MealCategory> mealCategories;

    public Meal() {}

    public Meal(String name, String description, BigDecimal price, String image) {
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

    public List<MealOrder> getMealOrders() {
        return mealOrders;
    }

    public void setMealOrders(List<MealOrder> mealOrders) {
        this.mealOrders = mealOrders;
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
