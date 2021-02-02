import { Upsertable, Type } from "./interface";
import Database from "./DBClientLibrary/model/Database";

const initialize = (
  dbInstance: Database,
  ClassRef: Type<Upsertable>
): Promise<Upsertable> => Promise.resolve(new ClassRef(dbInstance));

export default initialize;
