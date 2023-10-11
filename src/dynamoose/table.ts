import dynamoose from "dynamoose";

import { TABLE_NAME } from "../constants";
import {
  buildingSchema,
  floorSchema,
  roomSchema,
  sensorSchema,
  measurementSchema,
} from "./entities";

export const table = dynamoose.model(
  TABLE_NAME,
  [buildingSchema, floorSchema, roomSchema, sensorSchema, measurementSchema],
  {
    create: false,
    update: false,
  }
);
