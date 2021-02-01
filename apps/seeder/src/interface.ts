// generic type to represent any class
export interface Type<T> extends Function {
  new (...args: any[]): T;
}

// define interface to implement
export interface Upsertable {
  upsert: () => void;
}

export type DBConfig = {
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
