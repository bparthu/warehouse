import { Sequelize } from "@warehouse/core";
import * as express from "express";
import productRouter from "./router";

const createApp = () => async (conn?: Sequelize) => {
  const app = express();
  app.use(productRouter);
  return app;
};

export default createApp;
