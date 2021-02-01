// define interface to implement
export interface Upsertable {
  upsert: () => void
}

// type to represent allowed input type
export type AllowedInput = "inventory" | "products"

// type to represent config map
export type ConfigMap = {
  [key in AllowedInput]: {
    filePath: string,
    jsonPath: string
  }
}

export type ClassMap = {
  [key in AllowedInput]: Upsertable
}
