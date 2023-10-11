import dynamoose from "dynamoose";
import { Item } from "dynamoose/dist/Item";

import { EntityType, GSI, TABLE_NAME } from "../../constants";
import { extractValuesFromKey, getPrefix } from "../../helpers";

export class FloorItem extends Item {
  id: string;
  buildingId: string;
  floorNumber: number;
}

export const floorSchema = new dynamoose.Schema({
  pk: {
    type: String,
    hashKey: true,
    alias: "buildingId",
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
    type: String,
    rangeKey: true,
    alias: "id",
    set: (value) => {
      // before sending to DDB
      return `${getPrefix(EntityType.FLOOR)}${value}`;
    },
    get: (value) => {
      // after receiving from DDB
      const [id] = extractValuesFromKey(value.toString());
      return id;
    },
  },
  entityType: {
    type: dynamoose.type.CONSTANT(EntityType.FLOOR),
    default: EntityType.FLOOR,
    index: {
      name: GSI.GSI4,
      type: "global",
    },
  },
  floorNumber: { type: Number, required: true },
});

export const Floor = dynamoose.model<FloorItem>(TABLE_NAME, floorSchema, {
  create: false,
  update: false,
});
