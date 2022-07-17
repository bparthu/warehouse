import { Sequelize } from "@warehouse/core";
import * as express from "express";
import productRouter from "./router";
import { errorHandler } from "./handler";

const createApp = () => async (conn?: Sequelize) => {
  const app = express();
  app.use(productRouter);
  app.use(errorHandler);
  return app;
};

export default createApp;
