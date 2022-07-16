import { Sequelize } from "sequelize-typescript"

let conn: Sequelize

const getConnection = () => {
  if(conn) {
    return conn
  }
  throw new Error("Connection not established")
}

const setConnection = (connectionInstance: Sequelize) => {
  console.log("setting connection")
  conn = connectionInstance
  return conn
}

export { getConnection, setConnection }