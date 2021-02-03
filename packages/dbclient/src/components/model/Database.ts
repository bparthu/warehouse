import { Pool, PoolConnection } from "mysql2/promise";

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

  async execute(queryName: string, inputs: any[], conn?: PoolConnection) {
    let queryCtx: Pool | PoolConnection = this.pool
    if (conn) {
      queryCtx = conn;
    }
    const query = this.queryMap[queryName];
    return queryCtx.query(query, inputs);
  }

  closeConnectionPool() {
    this.pool.end();
  }
}

export default Database;
