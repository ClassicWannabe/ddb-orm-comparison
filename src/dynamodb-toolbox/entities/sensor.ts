import { Entity } from "dynamodb-toolbox";

import { table } from "../table";
import {
  EntityType,
  GSI_MAP,
  SensorType,
  UnitOfMeasure,
} from "../../constants";
import { getPrefix } from "../../helpers";

export type SensorItem = {
  pk: string;
  sk: "info";
  entityType: EntityType.SENSOR;
  sensorType: SensorType;
  unitOfMeasure: UnitOfMeasure;
  buildingId: string;
  floorId: string;
  roomId: string;
};

export type SensorCompositeKey = {
  pk: string;
};

export const Sensor = new Entity<
  EntityType.SENSOR,
  SensorItem,
  SensorCompositeKey,
  typeof table
>({
  name: EntityType.SENSOR,
  attributes: {
    pk: {
      type: "string",
      partitionKey: true,
      prefix: getPrefix(EntityType.SENSOR),
    },
    sk: {
      type: "string",
      sortKey: true,
      default: "info",
    },
    entityType: {
      type: "string",
      required: false,
      default: EntityType.SENSOR,
    },
    buildingId: {
      type: "string",
      map: GSI_MAP.GSI1.pk,
      prefix: getPrefix(EntityType.BUILDING),
      required: true,
    },
    floorId: {
      type: "string",
      map: GSI_MAP.GSI2.pk,
      prefix: getPrefix(EntityType.FLOOR),
      required: true,
    },
    roomId: {
      type: "string",
      map: GSI_MAP.GSI3.pk,
      prefix: getPrefix(EntityType.ROOM),
      required: true,
    },
    // Had to duplicate sensor IDs for GSIs
    sensorId1: {
      type: "string",
      default: (data: SensorItem) => data.pk,
      prefix: getPrefix(EntityType.SENSOR),
      map: GSI_MAP.GSI1.sk,
    },
    sensorId2: {
      type: "string",
      default: (data: SensorItem) => data.pk,
      prefix: getPrefix(EntityType.SENSOR),
      map: GSI_MAP.GSI2.sk,
    },
    sensorId3: {
      type: "string",
      default: (data: SensorItem) => data.pk,
      prefix: getPrefix(EntityType.SENSOR),
      map: GSI_MAP.GSI3.sk,
    },
    sensorType: { type: "string", required: true },
    unitOfMeasure: { type: "string", required: true },
  },
  table,
} as const);
