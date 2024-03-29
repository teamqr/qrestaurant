package com.qrestaurant.qrdashboard.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

@Entity
@jakarta.persistence.Table(name = "tables")
public class Table {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "{number.notnull}")
    @Min(value = 1, message = "{number.min}")
    private Integer number;
    @NotNull(message = "{prefix.notnull}")
    @Size(min = 2, max = 2, message = "{prefix.size}")
    private String prefix;
    @NotNull(message = "{code.notnull}")
    @Size(min = 6, max = 6, message = "{code.size}")
    private String code;
    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;
    @OneToMany(mappedBy = "table")
    private List<Order> orders;

    public Table() {}

    public Table(Integer number, String prefix, String code) {
        this.number = number;
        this.prefix = prefix;
        this.code = code;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    @PreRemove
    public void preRemove() {
        orders.forEach(order -> order.setTable(null));
    }
}
