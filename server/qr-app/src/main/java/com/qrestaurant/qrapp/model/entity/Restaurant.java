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
    @NotNull
    private String name;
    @NotNull
    @Size(min = 2, max = 2)
    private String prefix;
    @OneToOne(mappedBy = "restaurant", cascade = CascadeType.REMOVE)
    private Menu menu;
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.REMOVE)
    private List<com.qrestaurant.qrapp.model.entity.Table> tables;

    public Restaurant() {}

    public Restaurant(Long id, String name, String prefix) {
        this.id = id;
        this.name = name;
        this.prefix = prefix;
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
}
