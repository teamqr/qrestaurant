ALTER TABLE users
    ADD restaurant_id BIGINT;

ALTER TABLE users
    ADD CONSTRAINT FK_USERS_ON_RESTAURANT FOREIGN KEY (restaurant_id) REFERENCES restaurants (id);