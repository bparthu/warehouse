INSERT INTO `Product` (`id`, `name`) VALUES (?, ?) 
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);