import { Upsertable, Type } from "./interface"

const initialize = (ClassRef: Type<Upsertable>): Promise<Upsertable> => Promise.resolve(new ClassRef())

export default initialize