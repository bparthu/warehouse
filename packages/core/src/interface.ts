export interface WarehouseConnectOptions {
  database: string;
  username: string;
  password: string;
  force?: boolean; // This creates the table, dropping it first if it already existed
  alter?: boolean; // This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
}
