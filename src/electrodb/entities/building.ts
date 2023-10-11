import { Entity } from "electrodb";

import { EntityType, GSI, GSI_MAP, TABLE_NAME } from "../../constants";
import { getPrefix } from "../../helpers";

export const Building = new Entity({
  model: {
    entity: EntityType.BUILDING,
    version: "1",
    service: TABLE_NAME,
  },
  attributes: {
    id: {
      type: "string",
      required: true,
      readOnly: true,
    },
    sk: {
      type: "string",
      default: "info",
      readOnly: true,
      validate: (value) => value !== "info",
    },
    entityType: {
      type: "string",
      default: EntityType.BUILDING,
      readOnly: true,
      set: () => EntityType.BUILDING,
    },
    name: { type: "string", required: true },
    address: { type: "string", required: true },
    yearBuilt: {
      type: "number",
      required: true,
      validate: (value) => value < 1900,
    },
  },
  indexes: {
    building: {
      pk: {
        field: "pk",
        composite: ["id"],
        template: getPrefix(EntityType.BUILDING) + "${id}",
      },
      sk: {
        field: "sk",
        composite: ["sk"],
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
