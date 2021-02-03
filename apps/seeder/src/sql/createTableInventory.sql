CREATE TABLE IF NOT EXISTS `Inventory` (
    `id` int,
    `name` text,
    `stock` int,
    primary key(`id`),
    CONSTRAINT `stock_column_positive` CHECK (`stock` > 0)
) ENGINE=INNODB;