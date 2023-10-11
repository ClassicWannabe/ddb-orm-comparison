import { EntityType, GSI } from "../../constants";
import { table } from "../table";

export const getEntityItems = async <T extends EntityType>(entity: T) => {
  return await table.find(
    entity,
    { entityType: entity },
    {
      index: GSI.GSI4,
    }
  );
};
