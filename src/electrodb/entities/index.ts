export * from "./building";
export * from "./floor";
export * from "./room";
export * from "./sensor";
export * from "./measurement";

import { EntityType } from "../../constants";
import { Building } from "./building";
import { Floor } from "./floor";
import { Measurement } from "./measurement";
import { Room } from "./room";
import { Sensor } from "./sensor";

export const ENTITIES = {
  [EntityType.BUILDING]: Building,
  [EntityType.FLOOR]: Floor,
  [EntityType.ROOM]: Room,
  [EntityType.SENSOR]: Sensor,
  [EntityType.MEASUREMENT]: Measurement,
} as const;
