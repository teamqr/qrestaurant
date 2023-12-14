package com.qrestaurant.qrdashboard.model.entity;

import com.qrestaurant.qrdashboard.common.OrderStatus;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    private Long id;
    @NotNull
    private BigDecimal price;
    @NotNull
    private OrderStatus status;
    @Column(columnDefinition = "TIMESTAMP WITH TIME ZONE NOT NULL")
    @NotNull
    @Temporal(value = TemporalType.TIMESTAMP)
    private Date orderDate;
    @Column(columnDefinition = "TIMESTAMP WITH TIME ZONE")
    @Temporal(value = TemporalType.TIMESTAMP)
    private Date completionDate;
    @ManyToOne
    @JoinColumn(name = "table_id")
    private com.qrestaurant.qrdashboard.model.entity.Table table;
    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;
    @ManyToOne
    @JoinColumn(name = "worker_id")
    private User worker;
    @ManyToMany(mappedBy = "orders")
    private List<Meal> meals;

    public Order() {}

    public Order(Long id, BigDecimal price, Date orderDate) {
        this.id = id;
        this.price = price;
        this.status = OrderStatus.CREATED;
        this.orderDate = orderDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public Date getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(Date completionDate) {
        this.completionDate = completionDate;
    }

    public com.qrestaurant.qrdashboard.model.entity.Table getTable() {
        return table;
    }

    public void setTable(com.qrestaurant.qrdashboard.model.entity.Table table) {
        this.table = table;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public User getWorker() {
        return worker;
    }

    public void setWorker(User worker) {
        this.worker = worker;
    }

    public List<Meal> getMeals() {
        return meals;
    }

    public void setMeals(List<Meal> meals) {
        this.meals = meals;
    }
}
