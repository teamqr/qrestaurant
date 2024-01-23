CREATE TABLE meals
(
    id          BIGINT       NOT NULL,
    name        VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    price       DECIMAL      NOT NULL,
    menu_id     BIGINT,
    CONSTRAINT pk_meals PRIMARY KEY (id)
);

ALTER TABLE meals
    ADD CONSTRAINT FK_MEALS_ON_MENU FOREIGN KEY (menu_id) REFERENCES menus (id);