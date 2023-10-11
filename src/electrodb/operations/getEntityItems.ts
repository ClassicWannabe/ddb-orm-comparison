import { EntityType } from "../../constants";
import { ENTITIES } from "../entities";

export const getEntityItems = async <T extends EntityType>(entity: T) => {
  // `go` can't be called for some reason
  return await (ENTITIES[entity].query.all({ entityType: entity }) as any).go();
};
