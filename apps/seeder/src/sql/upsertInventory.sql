INSERT INTO `Inventory` (`id`, `name`, `stock`) VALUES (?, ?, ?) 
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`), `stock`=VALUES(`stock`);