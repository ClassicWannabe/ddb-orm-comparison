import {
  EntityType,
  GSI_MAP,
  SensorType,
  UnitOfMeasure,
} from "../../constants";
import { getPrefix } from "../../helpers";

export const Sensor = {
  pk: {
    type: String,
    value: getPrefix(EntityType.SENSOR) + "${id}",
  },
  sk: {
    type: String,
    value: "info",
  },
  id: { type: String, required: true },
  buildingId: { type: String, required: true },
  floorId: { type: String, required: true },
  roomId: { type: String, required: true },
  entityType: {
    type: String,
    value: EntityType.SENSOR,
  },
  sensorType: { type: String, enum: Object.values(SensorType), required: true },
  unitOfMeasure: {
    type: String,
    enum: Object.values(UnitOfMeasure),
    required: true,
  },
  [GSI_MAP.GSI1.pk]: {
    type: String,
    value: getPrefix(EntityType.BUILDING) + "${buildingId}",
  },
  [GSI_MAP.GSI1.sk]: {
    type: String,
    value: "${pk}",
  },
  [GSI_MAP.GSI2.pk]: {
    type: String,
    value: getPrefix(EntityType.FLOOR) + "${floorId}",
  },
  [GSI_MAP.GSI2.sk]: {
    type: String,
    value: "${pk}",
  },
  [GSI_MAP.GSI3.pk]: {
    type: String,
    value: getPrefix(EntityType.ROOM) + "${roomId}",
  },
  [GSI_MAP.GSI3.sk]: {
    type: String,
    value: "${pk}",
  },
} as const;
