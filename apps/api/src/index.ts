import { connectToDB } from "@warehouse/core";
import createApp from "./app";
import startServer from "./server";

const PORT = 3000;

connectToDB({
  database: "warehouse",
  username: "app-user",
  password: "app-pw",
})
  .then(createApp())
  .then(startServer(PORT))
  .then(() => {
    console.log(`API server listening in port - ${PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });
