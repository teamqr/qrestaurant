ALTER TABLE users
    ADD firstname VARCHAR(255);

ALTER TABLE users
    ADD lastname VARCHAR(255);

ALTER TABLE users
DROP
CONSTRAINT fk_users_on_user_info;

DROP TABLE users_info CASCADE;

ALTER TABLE users
DROP
COLUMN user_info_id;