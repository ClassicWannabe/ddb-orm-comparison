import { Entity } from "electrodb";

import {
  DELIMITER,
  EntityType,
  GSI,
  GSI_MAP,
  TABLE_NAME,
} from "../../constants";
import { getPrefix } from "../../helpers";

export const Measurement = new Entity({
  model: {
    entity: EntityType.MEASUREMENT,
    version: "1",
    service: TABLE_NAME,
  },
  attributes: {
    date: {
      type: "string",
      required: true,
      readOnly: true,
    },
    time: {
      type: "string",
      required: true,
    },
    sensorId: {
      type: "string",
      required: true,
      readOnly: true,
    },
    entityType: {
      type: "string",
      default: EntityType.MEASUREMENT,
      readOnly: true,
      set: () => EntityType.MEASUREMENT,
    },
    value: {
      type: "number",
      required: true,
    },
  },
  indexes: {
    measurement: {
      pk: {
        field: "pk",
        composite: ["sensorId", "date"],
        template:
          getPrefix(EntityType.SENSOR) +
          "${sensorId}" +
          DELIMITER +
          getPrefix(EntityType.MEASUREMENT) +
          "${date}",
      },
      sk: {
        field: "sk",
        composite: ["time"],
        template: "time" + DELIMITER + "${time}",
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
