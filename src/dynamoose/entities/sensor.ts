import dynamoose from "dynamoose";
import { Item } from "dynamoose/dist/Item";

import { table } from "../table";
import {
  EntityType,
  GSI,
  GSI_MAP,
  SensorType,
  TABLE_NAME,
  UnitOfMeasure,
} from "../../constants";
import { extractValuesFromKey, getPrefix } from "../../helpers";
import { ValueType } from "dynamoose/dist/Schema";

export class SensorItem extends Item {
  id: string;
  sensorType: SensorType;
  unitOfMeasure: UnitOfMeasure;
  buildingId: string;
  floorId: string;
  roomId: string;
}

export const sensorSchema = new dynamoose.Schema({
  pk: {
    type: String,
    hashKey: true,
    alias: "id",
    set: (value) => {
      // before sending to DDB
      return `${getPrefix(EntityType.SENSOR)}${value}`;
    },
    get: (value) => {
      // after receiving from DDB
      const [id] = extractValuesFromKey(value.toString());
      return id;
    },
  },
  sk: {
    type: dynamoose.type.CONSTANT("info"),
    default: "info",
    rangeKey: true,
  },
  entityType: {
    type: dynamoose.type.CONSTANT(EntityType.SENSOR),
    default: EntityType.SENSOR,
    index: {
      name: GSI.GSI4,
      type: "global",
    },
  },
  sensorType: {
    type: String,
    enum: Object.values(SensorType),
    required: true,
  },
  unitOfMeasure: {
    type: String,
    enum: Object.values(UnitOfMeasure),
    required: true,
  },
  [GSI_MAP.GSI1.pk]: {
    type: String,
    alias: "buildingId",
    set: (value) => {
      // before sending to DDB
      return `${getPrefix(EntityType.BUILDING)}${value}`;
    },
    get: (value: ValueType) => {
      // after receiving from DDB
      const [id] = extractValuesFromKey(value.toString());
      return id;
    },
    required: true,
    index: {
      name: GSI.GSI1,
      rangeKey: GSI_MAP.GSI1.sk,
      type: "global",
    },
  },
  [GSI_MAP.GSI1.sk]: {
    type: dynamoose.type.COMBINE(["pk"]),
    alias: "sensorId1",
    required: true,
    set: (value) => {
      // before sending to DDB
      return `${getPrefix(EntityType.SENSOR)}${value}`;
    },
    get: (value: ValueType) => {
      // after receiving from DDB
      const [id] = extractValuesFromKey(value.toString());
      return id;
    },
  },
  [GSI_MAP.GSI2.pk]: {
    type: String,
    alias: "floorId",
    set: (value) => {
      // before sending to DDB
      return `${getPrefix(EntityType.FLOOR)}${value}`;
    },
    get: (value: ValueType) => {
      // after receiving from DDB
      const [id] = extractValuesFromKey(value.toString());
      return id;
    },
    required: true,
    index: {
      name: GSI.GSI2,
      rangeKey: GSI_MAP.GSI2.sk,
      type: "global",
    },
  },
  [GSI_MAP.GSI2.sk]: {
    type: dynamoose.type.COMBINE(["pk"]),
    alias: "sensorId2",
    required: true,
    set: (value) => {
      // before sending to DDB
      return `${getPrefix(EntityType.SENSOR)}${value}`;
    },
    get: (value: ValueType) => {
      // after receiving from DDB
      const [id] = extractValuesFromKey(value.toString());
      return id;
    },
  },
  [GSI_MAP.GSI3.pk]: {
    type: String,
    alias: "roomId",
    set: (value) => {
      // before sending to DDB
      return `${getPrefix(EntityType.ROOM)}${value}`;
    },
    get: (value: ValueType) => {
      // after receiving from DDB
      const [id] = extractValuesFromKey(value.toString());
      return id;
    },
    required: true,
    index: {
      name: GSI.GSI3,
      rangeKey: GSI_MAP.GSI3.sk,
      type: "global",
    },
  },
  [GSI_MAP.GSI3.sk]: {
    type: dynamoose.type.COMBINE(["pk"]),
    alias: "sensorId3",
    required: true,
    set: (value) => {
      // before sending to DDB
      return `${getPrefix(EntityType.SENSOR)}${value}`;
    },
    get: (value: ValueType) => {
      // after receiving from DDB
      const [id] = extractValuesFromKey(value.toString());
      return id;
    },
  },
});

export const Sensor = dynamoose.model<SensorItem>(TABLE_NAME, sensorSchema, {
  create: false,
  update: false,
});
