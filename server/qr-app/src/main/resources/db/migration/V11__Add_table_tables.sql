CREATE TABLE tables
(
    id            BIGINT     NOT NULL,
    number        INTEGER    NOT NULL,
    code          VARCHAR(6) NOT NULL,
    restaurant_id BIGINT,
    CONSTRAINT pk_tables PRIMARY KEY (id)
);

ALTER TABLE menus
    ADD CONSTRAINT uc_menus_restaurant UNIQUE (restaurant_id);

ALTER TABLE tables
    ADD CONSTRAINT FK_TABLES_ON_RESTAURANT FOREIGN KEY (restaurant_id) REFERENCES restaurants (id);