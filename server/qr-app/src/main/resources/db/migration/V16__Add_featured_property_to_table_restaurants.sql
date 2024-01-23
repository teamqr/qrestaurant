ALTER TABLE restaurants
    ADD featured BOOLEAN DEFAULT FALSE;

ALTER TABLE restaurants
    ALTER COLUMN featured SET NOT NULL;