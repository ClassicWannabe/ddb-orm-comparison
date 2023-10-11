import { Entity } from "electrodb";

import { EntityType, GSI, GSI_MAP, TABLE_NAME } from "../../constants";
import { getPrefix } from "../../helpers";

export const Floor = new Entity({
  model: {
    entity: EntityType.FLOOR,
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
    entityType: {
      type: "string",
      default: EntityType.FLOOR,
      readOnly: true,
      set: () => EntityType.FLOOR,
    },
    floorNumber: { type: "number", required: true },
  },
  indexes: {
    floor: {
      pk: {
        field: "pk",
        composite: ["buildingId"],
        template: getPrefix(EntityType.BUILDING) + "${buildingId}",
      },
      sk: {
        field: "sk",
        composite: ["id"],
        template: getPrefix(EntityType.FLOOR) + "${id}",
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
