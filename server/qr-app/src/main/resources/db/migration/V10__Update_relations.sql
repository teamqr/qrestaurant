ALTER TABLE menus
    ADD restaurant_id BIGINT;

ALTER TABLE menus
    ADD CONSTRAINT FK_MENUS_ON_RESTAURANT FOREIGN KEY (restaurant_id) REFERENCES restaurants (id);

ALTER TABLE restaurants
DROP
CONSTRAINT fk_restaurants_on_menu;

ALTER TABLE restaurants
DROP
COLUMN menu_id;