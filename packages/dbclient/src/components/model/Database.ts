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

  async execute(queryName: string, inputs: any[]) {
    const query = this.queryMap[queryName];
    return this.pool.promise().query(query, inputs);
  }

  closeConnection() {
    this.pool.end();
  }
}

export default Database;
