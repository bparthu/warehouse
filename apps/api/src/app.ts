import * as express from "express";
import productRouter from "./router";
import { errorHandler } from "./handler";

const createApp = () => async () => {
  const app = express();
  app.use(productRouter);
  app.use(errorHandler);
  return app;
};

export default createApp;
