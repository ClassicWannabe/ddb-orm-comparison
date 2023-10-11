import dynamoose from "dynamoose";
import { Item } from "dynamoose/dist/Item";

import { DELIMITER, EntityType, GSI, TABLE_NAME } from "../../constants";
import { extractValuesFromKey, getPrefix } from "../../helpers";

export class MeasurementItem extends Item {
  pk: {
    sensorId: string;
    date: string; // YYYY-mm-DD
  };
  time: string;
  value: number;
}

export const measurementSchema = new dynamoose.Schema({
  pk: {
    type: [
      String, // validate as String when receiving from DDB
      Object, // validate as Object when creating an item
    ],
    hashKey: true,
    schema: {
      sensorId: String,
      date: String,
    },
    set: (value) => {
      // before sending to DDB
      const { sensorId, date } = value as any;
      const sensor = `${getPrefix(EntityType.SENSOR)}${sensorId}`;
      const measurement = `${getPrefix(EntityType.MEASUREMENT)}${date}`;

      return `${sensor}${DELIMITER}${measurement}`;
    },
    get: (value) => {
      // after receiving from DDB
      const [sensorId, date] = extractValuesFromKey(value.toString());
      return {
        date,
        sensorId,
      };
    },
  },
  sk: {
    type: String,
    alias: "time",
    set: (value) => {
      // before sending to DDB
      return `time${DELIMITER}${value}`;
    },
    get: (value) => {
      // after receiving from DDB
      const [id] = extractValuesFromKey(value.toString());
      return id;
    },
    rangeKey: true,
  },
  entityType: {
    type: dynamoose.type.CONSTANT(EntityType.MEASUREMENT),
    default: EntityType.MEASUREMENT,
    index: {
      name: GSI.GSI4,
      type: "global",
    },
  },
  value: {
    type: Number,
    required: true,
  },
});

export const Measurement = dynamoose.model<MeasurementItem>(
  TABLE_NAME,
  measurementSchema,
  {
    create: false,
    update: false,
  }
);
