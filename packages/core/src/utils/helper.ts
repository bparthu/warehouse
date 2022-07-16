import { Sequelize } from "sequelize-typescript";

let conn: Sequelize;

const getConnection = () => {
  if (conn) {
    return conn;
  }
  throw new Error("Connection not established");
};

const setConnection = (connectionInstance: Sequelize) => {
  conn = connectionInstance;
  return conn;
};

const closeConnection = () => async () => {
  return conn.close();
};

export { getConnection, setConnection, closeConnection };
