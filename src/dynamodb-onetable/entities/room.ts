import { EntityType, NESTED_DELIMITER } from "../../constants";
import { getNestedPrefix, getPrefix } from "../../helpers";

export const Room = {
  pk: {
    type: String,
    value: getPrefix(EntityType.BUILDING) + "${buildingId}",
  },
  sk: {
    type: String,
    value:
      getNestedPrefix(EntityType.FLOOR) +
      "${floorId}" +
      NESTED_DELIMITER +
      getPrefix(EntityType.ROOM) +
      "${id}",
  },
  id: { type: String, required: true },
  buildingId: { type: String, required: true },
  floorId: { type: String, required: true },
  entityType: {
    type: String,
    value: EntityType.ROOM,
  },
  name: { type: String, required: true },
} as const;
