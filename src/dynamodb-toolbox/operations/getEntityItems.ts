import { EntityType, GSI } from "../../constants";
import { ENTITIES } from "../entities";

export const getEntityItems = async <T extends EntityType>(entity: T) => {
  return await ENTITIES[entity].query(entity, {
    index: GSI.GSI4,
  });
};
