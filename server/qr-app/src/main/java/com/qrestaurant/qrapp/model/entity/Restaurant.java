package com.qrestaurant.qrapp.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "restaurants")
public class Restaurant {
    @Id
    private Long id;
    @NotBlank(message = "{restaurant}")
    private String name;

    public Restaurant() {}

    public Restaurant(Long id, String name) {
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
}
