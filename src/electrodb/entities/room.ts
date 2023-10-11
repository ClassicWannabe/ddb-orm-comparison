import { Entity } from "electrodb";

import {
  EntityType,
  GSI,
  GSI_MAP,
  NESTED_DELIMITER,
  TABLE_NAME,
} from "../../constants";
import { getNestedPrefix, getPrefix } from "../../helpers";

export const Room = new Entity({
  model: {
    entity: EntityType.ROOM,
    version: "1",
    service: TABLE_NAME,
  },
  attributes: {
    id: {
      type: "string",
      required: true,
      readOnly: true,
    },
    buildingId: {
      type: "string",
      required: true,
      readOnly: true,
    },
    floorId: {
      type: "string",
      required: true,
      readOnly: true,
    },
    entityType: {
      type: "string",
      default: EntityType.ROOM,
      readOnly: true,
      set: () => EntityType.ROOM,
    },
    name: { type: "string", required: true },
  },
  indexes: {
    room: {
      pk: {
        field: "pk",
        composite: ["buildingId"],
        template: getPrefix(EntityType.BUILDING) + "${buildingId}",
      },
      sk: {
        field: "sk",
        composite: ["floorId", "id"],
        template:
          getNestedPrefix(EntityType.FLOOR) +
          "${floorId}" +
          NESTED_DELIMITER +
          getPrefix(EntityType.ROOM) +
          "${id}",
      },
    },
    all: {
      index: GSI.GSI4,
      pk: {
        field: GSI_MAP.GSI4.pk,
        composite: ["entityType"],
      },
    },
  },
});
