import { DELIMITER, EntityType } from "../../constants";
import { getPrefix } from "../../helpers";

export const Measurement = {
  pk: {
    type: String,
    value:
      getPrefix(EntityType.SENSOR) +
      "${sensorId}" +
      DELIMITER +
      getPrefix(EntityType.MEASUREMENT) +
      "${date}",
  },
  sk: {
    type: String,
    value: "time" + DELIMITER + "${time}",
  },
  sensorId: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  entityType: {
    type: String,
    value: EntityType.MEASUREMENT,
  },
  value: { type: Number, required: true },
} as const;
