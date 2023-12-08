ALTER TABLE restaurants
    ADD prefix VARCHAR(2);

ALTER TABLE restaurants
    ALTER COLUMN prefix SET NOT NULL;

ALTER TABLE tables
    ADD prefix VARCHAR(2);

ALTER TABLE tables
    ALTER COLUMN prefix SET NOT NULL;

ALTER TABLE menus
    ADD CONSTRAINT uc_menus_restaurant UNIQUE (restaurant_id);