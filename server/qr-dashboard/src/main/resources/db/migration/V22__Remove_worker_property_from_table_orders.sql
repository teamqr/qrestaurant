ALTER TABLE orders
DROP
CONSTRAINT fk_orders_on_worker;

ALTER TABLE orders
DROP
COLUMN worker_id;