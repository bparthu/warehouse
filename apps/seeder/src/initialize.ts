import { Database } from "@warehouse/dbclient";
import { Upsertable, Type } from "./interface";

const initialize = (
  dbInstance: Database,
  ClassRef: Type<Upsertable>
): Promise<Upsertable> => {
  const instance = new ClassRef(dbInstance);
  return instance.init().catch((err) => {
    dbInstance.closeConnectionPool();
    throw err;
  });
};

export default initialize;
