import {
  PoolOptions,
  Database,
  OkPacket,
  ResultSetHeader,
  RowDataPacket,
} from "@warehouse/dbclient";

// generic type to represent any class
export interface Type<T> extends Function {
  new (...args: any[]): T;
}

// define interface to implement
export interface Upsertable {
  dbInstance: Database;
  init: () => Promise<Upsertable>;
  upsert: (row: any) => Promise<Rows>;
}

export type DBConfig = {
  connPoolOptions: PoolOptions;
  sqlFilesPath: string;
};

// type to represent allowed input type
export type AllowedInput = "inventory" | "products";

// type to represent config map
export type ConfigMap = {
  [key in AllowedInput]: {
    filePath: string;
    jsonPath: string;
    ClassRef: Type<Upsertable>;
  };
};

export type InventoryRow = {
  art_id: string;
  name: string;
  stock: string;
};

export type ContainArticles = {
  art_id: string;
  amount_of: string;
};

export type ProductRow = {
  name: string;
  contain_articles: ContainArticles[];
};

export type Rows =
  | OkPacket
  | ResultSetHeader
  | RowDataPacket[]
  | RowDataPacket[][]
  | OkPacket[];
