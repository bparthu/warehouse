CREATE TABLE IF NOT EXISTS `ProductInventory` (
    `id` int auto_increment,
    `prd_id` VARCHAR(100),
    `inv_id` int,
    `amount_of` int,
    primary key(`id`),
    foreign key(`prd_id`) references Product(`id`),
    foreign key(`inv_id`) references Inventory(`id`),
    UNIQUE KEY `prd_id_inv_id` (`prd_id`,`inv_id`)
) ENGINE=INNODB;