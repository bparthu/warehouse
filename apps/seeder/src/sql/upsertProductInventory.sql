INSERT INTO `ProductInventory` (`prd_id`, `inv_id`, `amount_of`) VALUES ? 
ON DUPLICATE KEY UPDATE `prd_id`=VALUES(`prd_id`), `inv_id`=VALUES(`inv_id`), `amount_of`=VALUES(`amount_of`);