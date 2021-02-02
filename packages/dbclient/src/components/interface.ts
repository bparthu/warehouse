import { PoolOptions } from "mysql2/promise";

export type DBConfig = {
  connPoolOptions: PoolOptions;
  sqlFilesPath: string;
};
