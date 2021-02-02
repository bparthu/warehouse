import { createPool, PoolOptions } from "mysql2/promise";
import Database from "./model/Database";
import { createQueryMap } from "./createQueryMap";
import { DBConfig } from "./interface";

const initializeDBClient = async ({
  connPoolOptions,
  sqlFilesPath,
}: DBConfig): Promise<Database> => {
  /*
    1. create connection pool
    2. load sql queries in memory
    3. create db instance and return
  */

  const pool = createPool(connPoolOptions);
  const queryMap = await createQueryMap(sqlFilesPath);
  return new Database(pool, queryMap);
};

export default initializeDBClient;
