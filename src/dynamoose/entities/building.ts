import dynamoose from "dynamoose";
import { Item } from "dynamoose/dist/Item";

import { EntityType, GSI, TABLE_NAME } from "../../constants";
import { extractValuesFromKey, getPrefix } from "../../helpers";

export class BuildingItem extends Item {
  id: string;
  name: string;
  address: string;
  yearBuilt: number;
}

export const buildingSchema = new dynamoose.Schema({
  pk: {
    type: String,
    hashKey: true,
    alias: "id",
    set: (value) => {
      // before sending to DDB
      return `${getPrefix(EntityType.BUILDING)}${value}`;
    },
    get: (value) => {
      // after receiving from DDB
      const [id] = extractValuesFromKey(value.toString());
      return id;
    },
  },
  sk: {
    type: dynamoose.type.CONSTANT("info"),
    default: "info",
    rangeKey: true,
  },
  entityType: {
    type: dynamoose.type.CONSTANT(EntityType.BUILDING),
    default: EntityType.BUILDING,
    index: {
      name: GSI.GSI4,
      type: "global",
    },
  },
  name: { type: String, required: true },
  address: { type: String, required: true },
  yearBuilt: {
    type: Number,
    required: true,
    validate: (value) => +value > 1900,
  },
});

export const Building = dynamoose.model<BuildingItem>(
  TABLE_NAME,
  buildingSchema,
  {
    create: false,
    update: false,
  }
);
