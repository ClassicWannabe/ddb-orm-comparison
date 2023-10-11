import { EntityType } from "../../constants";
import { getPrefix } from "../../helpers";

export const Floor = {
  pk: {
    type: String,
    value: getPrefix(EntityType.BUILDING) + "${buildingId}",
  },
  sk: {
    type: String,
    value: getPrefix(EntityType.FLOOR) + "${id}",
  },
  id: { type: String, required: true },
  buildingId: { type: String, required: true },
  entityType: {
    type: String,
    value: EntityType.FLOOR,
  },
  floorNumber: { type: Number, required: true },
} as const;
