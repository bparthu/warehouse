import { DBConfig } from "@warehouse/dbclient"
import { ServiceConfig } from "./interface"

const dbConfig: DBConfig = {
  connPoolOptions: {
    host: "localhost",
    user: "root",
    password: "mysql-pw",
    database: "warehouse",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
  sqlFilesPath: `${__dirname}/sql/`,
};

const serviceConfig: ServiceConfig = {
  port: 3000
}

export { dbConfig, serviceConfig }