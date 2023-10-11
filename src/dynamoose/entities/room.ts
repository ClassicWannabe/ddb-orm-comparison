import dynamoose from "dynamoose";
import { Item } from "dynamoose/dist/Item";

import { EntityType, GSI, NESTED_DELIMITER, TABLE_NAME } from "../../constants";
import {
  extractValuesFromKey,
  getNestedPrefix,
  getPrefix,
} from "../../helpers";

export class RoomItem extends Item {
  buildingId: string;
  name: string;
  sk: {
    floorId: string;
    roomId: string;
  };
}

export const roomSchema = new dynamoose.Schema({
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
    type: [
      String, // validate as String when receiving from DDB
      Object, // validate as Object when creating an item
    ],
    rangeKey: true,
    schema: {
      floorId: String,
      roomId: String,
    },
    set: (value) => {
      // before sending to DDB
      const { floorId, roomId } = value as any;

      const floor = `${getNestedPrefix(EntityType.FLOOR)}${floorId}`;

      if (!roomId) {
        return floor;
      }

      const room = `${getPrefix(EntityType.ROOM)}${roomId}`;

      return `${floor}${NESTED_DELIMITER}${room}`;
    },
    get: (value) => {
      // after receiving from DDB
      const [floorId, roomId] = extractValuesFromKey(value.toString());

      return {
        roomId,
        floorId,
      };
    },
  },
  entityType: {
    type: dynamoose.type.CONSTANT(EntityType.ROOM),
    default: EntityType.ROOM,
    index: {
      name: GSI.GSI4,
      type: "global",
    },
  },
  name: { type: String, required: true },
});

export const Room = dynamoose.model<RoomItem>(TABLE_NAME, roomSchema, {
  create: false,
  update: false,
});
