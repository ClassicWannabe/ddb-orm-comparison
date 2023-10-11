import { EntityType, GSI } from "../../constants";
import { ENTITIES } from "../entities";
import { entityManager } from "../table";

export const getEntityItems = async <T extends EntityType>(entity: T) => {
  return await entityManager.find(
    ENTITIES[entity],
    { entityType: entity },
    { queryIndex: GSI.GSI4 }
  );
};
