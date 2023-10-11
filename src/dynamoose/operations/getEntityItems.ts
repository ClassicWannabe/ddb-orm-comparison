import { EntityType, GSI } from "../../constants";

import { table } from "../table";

export const getEntityItems = async <T extends EntityType>(entity: T) => {
  return await table.query("entityType").eq(entity).using(GSI.GSI4).exec();
};
