import { Entity } from "dynamodb-toolbox";

import { table } from "../table";
import { EntityType } from "../../constants";
import { getPrefix } from "../../helpers";

export const Floor = new Entity({
  name: EntityType.FLOOR,
  attributes: {
    pk: {
      type: "string",
      partitionKey: true,
      prefix: getPrefix(EntityType.BUILDING),
    },
    sk: {
      type: "string",
      sortKey: true,
      prefix: getPrefix(EntityType.FLOOR),
    },
    entityType: {
      type: "string",
      required: false,
      default: EntityType.FLOOR,
    },
    floorNumber: { type: "number", required: true },
  },
  table,
} as const);
