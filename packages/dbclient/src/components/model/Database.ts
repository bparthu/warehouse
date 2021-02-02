import { Pool } from "mysql2";

class Database {
  pool: Pool;
  queryMap: any[];
  constructor(pool: Pool, queryMap: any) {
    this.pool = pool;
    this.queryMap = queryMap;
  }

  getQuery(queryName: string): string {
    return this.queryMap[queryName];
  }
}

export default Database;
