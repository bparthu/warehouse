import { connectToDB, syncTables } from "@warehouse/core";
import { startSeeding, closeConnection } from "./domain/Seeder";
import config from "./config";

connectToDB({
  database: "warehouse",
  username: "app-user",
  password: "app-pw",
})
  .then(syncTables(false, false))
  .then(startSeeding(config.seederPath))
  .then(({ inventoriesCount, productsCount, productinventoriesCount }) => {
    console.log("successfully seeded", {
      inventoriesCount, productsCount, productinventoriesCount
    })
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(closeConnection());
