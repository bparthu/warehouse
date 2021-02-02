import { Pool } from "mysql2";

class Database {
  pool: Pool;
  queryMap: any[];
  constructor(pool: Pool, queryMap: any[]) {
    this.pool = pool;
    this.queryMap = queryMap;
  }
}

export default Database;
