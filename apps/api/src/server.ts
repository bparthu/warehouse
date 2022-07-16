import { Express } from "express";

const startServer = (port: number) => async (app: Express) => {
  return new Promise((resolve, reject) => {
    app.listen(port).once("listening", resolve).once("error", reject);
  });
};

export default startServer;
