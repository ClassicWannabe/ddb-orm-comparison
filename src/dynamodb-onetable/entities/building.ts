import { EntityType } from "../../constants";
import { getPrefix } from "../../helpers";

export const Building = {
  pk: {
    type: String,
    value: getPrefix(EntityType.BUILDING) + "${id}",
  },
  sk: { type: String, value: "info" },
  id: { type: String, required: true },
  entityType: {
    type: String,
    value: EntityType.BUILDING,
  },
  name: { type: String, required: true },
  address: { type: String, required: true },
  yearBuilt: { type: Number, required: true },
} as const;
