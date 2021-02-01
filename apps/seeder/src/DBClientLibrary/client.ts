import { createPool, PoolOptions, Pool } from "mysql2";
import Database from "./model/Database";
import { promises as fsp, readFileSync } from "fs";
import { parse, join } from "path";
import { pathToFileURL } from "url";

/*
const initializeDBClient = async (options: PoolOptions, sqlPath: string): Promise<Database>  => {
  
    1. create connection pool
    2. load sql queries in memory
    3. create db instance and return
  
  const pool = createPool(options)
  const queryMap = await createQueryMap(sqlFilesPath)
  return new Database(pool)
}
*/
