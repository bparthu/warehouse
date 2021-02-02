import { Database } from "@warehouse/dbclient";
import { Upsertable, Type } from "./interface";

const initialize = (
  dbInstance: Database,
  ClassRef: Type<Upsertable>
): Promise<Upsertable> => Promise.resolve(new ClassRef(dbInstance));

export default initialize;
