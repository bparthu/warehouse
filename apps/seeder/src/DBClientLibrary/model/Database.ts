import { Pool } from "mysql2"

class Database {
  pool: Pool
  constructor(pool: Pool) {
    this.pool = pool
  }
}

export default Database