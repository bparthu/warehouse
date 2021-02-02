import { Database, PoolConnection } from "@warehouse/dbclient";
import { Upsertable, Type } from "./interface";

const initializeApp = (ClassRef: Type<Upsertable>) => (
  dbInstance: Database
) => {
  return dbInstance.getConnection().then((conn) => {
    return new ClassRef(dbInstance, conn);
  });
};

const initializeTable = (upsertableInstance: Upsertable) => {
  return upsertableInstance
    .initTable()
    .then(() => upsertableInstance)
    .catch((err) => {
      upsertableInstance.dbInstance.closeConnectionPool();
      throw err;
    });
};

export { initializeApp, initializeTable };
