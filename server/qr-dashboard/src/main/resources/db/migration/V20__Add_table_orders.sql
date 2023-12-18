CREATE TABLE meal_order
(
    meal_id  BIGINT NOT NULL,
    order_id BIGINT NOT NULL
);

CREATE TABLE orders
(
    id              BIGINT                   NOT NULL,
    price           DECIMAL                  NOT NULL,
    status          SMALLINT                 NOT NULL,
    order_date      TIMESTAMP WITH TIME ZONE NOT NULL,
    completion_date TIMESTAMP WITH TIME ZONE,
    table_id        BIGINT,
    restaurant_id   BIGINT,
    worker_id       BIGINT,
    CONSTRAINT pk_orders PRIMARY KEY (id)
);

ALTER TABLE orders
    ADD CONSTRAINT FK_ORDERS_ON_RESTAURANT FOREIGN KEY (restaurant_id) REFERENCES restaurants (id);

ALTER TABLE orders
    ADD CONSTRAINT FK_ORDERS_ON_TABLE FOREIGN KEY (table_id) REFERENCES tables (id);

ALTER TABLE orders
    ADD CONSTRAINT FK_ORDERS_ON_WORKER FOREIGN KEY (worker_id) REFERENCES users (id);

ALTER TABLE meal_order
    ADD CONSTRAINT fk_meaord_on_meal FOREIGN KEY (meal_id) REFERENCES meals (id);

ALTER TABLE meal_order
    ADD CONSTRAINT fk_meaord_on_order FOREIGN KEY (order_id) REFERENCES orders (id);