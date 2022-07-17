import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500);
  res.json({ message: "Internal Server Error" });
};

export default errorHandler;
