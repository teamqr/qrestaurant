package com.qrestaurant.qrapp.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@jakarta.persistence.Table(name = "tables")
public class Table {
    @Id
    private Long id;
    @NotNull
    @Min(value = 1)
    private Integer number;
    @NotNull
    @Size(min = 2, max = 2)
    private String prefix;
    @NotNull
    @Size(min = 6, max = 6)
    private String code;
    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    public Table() {}

    public Table(Long id, Integer number, String prefix, String code) {
        this.id = id;
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
}
