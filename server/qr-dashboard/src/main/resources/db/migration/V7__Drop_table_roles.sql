ALTER TABLE users
    ADD role SMALLINT;

ALTER TABLE users
DROP
CONSTRAINT fk_users_on_role;

DROP TABLE roles CASCADE;

ALTER TABLE users
DROP
COLUMN role_id;