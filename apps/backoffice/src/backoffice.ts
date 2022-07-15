import { connectToDB } from "@warehouse/core";
import { Seeder } from "./domain";

connectToDB({
  database: "warehouse",
  username: "app-user",
  password: "app-pw",
})
  .then((meta) => {
    // get the flags from config
    return meta.syncTables(false, false);
  })
  .then(() => {
    Seeder.seedInventory();
    Seeder.seedProduct();
  })
  .catch((err) => {
    console.log(err);
  });
