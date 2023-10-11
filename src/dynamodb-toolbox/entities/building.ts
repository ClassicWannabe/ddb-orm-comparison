import { Entity } from "dynamodb-toolbox";

import { table } from "../table";
import { EntityType } from "../../constants";
import { getPrefix } from "../../helpers";

export type BuildingItem = {
  pk: string;
  sk: "info";
  entityType: EntityType.BUILDING;
  name: string;
  address: string;
  yearBuilt: number;
};

export type BuildingCompositeKey = {
  pk: string;
};

export const Building = new Entity<
  EntityType.BUILDING,
  BuildingItem,
  BuildingCompositeKey,
  typeof table
>({
  name: EntityType.BUILDING,
  attributes: {
    pk: {
      partitionKey: true,
      prefix: getPrefix(EntityType.BUILDING),
    },
    sk: { sortKey: true, default: "info" },
    entityType: {
      type: "string",
      required: false,
      default: EntityType.BUILDING,
    },
    name: { type: "string", required: true },
    address: { type: "string", required: true },
    yearBuilt: { type: "number", required: true },
  },
  table,
} as const);
