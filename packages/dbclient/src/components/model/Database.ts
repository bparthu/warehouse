import { Pool } from "mysql2/promise";

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

  async getConnection() {
    return this.pool.getConnection();
  }

  async execute(queryName: string, inputs: any[]) {
    const query = this.queryMap[queryName];
    return this.pool.query(query, inputs);
  }

  closeConnection() {
    this.pool.end();
  }
}

export default Database;
