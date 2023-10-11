import { Entity } from "dynamodb-toolbox";

import { table } from "../table";
import { EntityType, NESTED_DELIMITER } from "../../constants";
import {
  extractValuesFromKey,
  getNestedPrefix,
  getPrefix,
} from "../../helpers";

export type RoomItem = {
  pk: string;
  sk: {
    roomId: string;
    floorId: string;
  };
  entityType: EntityType.ROOM;
  name: string;
};

export type RoomCompositeKey = {
  pk: string;
  sk: {
    roomId: string;
    floorId: string;
  };
};

export const Room = new Entity<
  EntityType.ROOM,
  RoomItem,
  RoomCompositeKey,
  typeof table
>({
  name: EntityType.ROOM,
  attributes: {
    pk: {
      partitionKey: true,
      prefix: getPrefix(EntityType.BUILDING),
    },
    sk: {
      sortKey: true,
      transform: (_, data: RoomItem): string => {
        // before sending to DDB
        const { floorId, roomId } = data.sk;

        const floor = `${getNestedPrefix(EntityType.FLOOR)}${floorId}`;
        const room = `${getPrefix(EntityType.ROOM)}${roomId}`;

        return `${floor}${NESTED_DELIMITER}${room}`;
      },
      format: (value: string): RoomItem["sk"] => {
        // after receiving from DDB
        const [floorId, roomId] = extractValuesFromKey(value);
        return {
          roomId,
          floorId,
        };
      },
    },
    entityType: {
      type: "string",
      required: false,
      default: EntityType.ROOM,
    },
    name: { type: "string", required: true },
  },
  table,
} as const);
