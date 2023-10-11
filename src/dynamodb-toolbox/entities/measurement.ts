import { Entity } from "dynamodb-toolbox";

import { table } from "../table";
import { DELIMITER, EntityType } from "../../constants";
import { extractValuesFromKey, getPrefix } from "../../helpers";

export type MeasurementItem = {
  pk: {
    sensorId: string;
    date: string; // YYYY-mm-DD
  };
  sk: string; // time
  entityType: EntityType.MEASUREMENT;
  value: number;
};

export type MeasurementCompositeKey = {
  pk: {
    sensorId: string;
    date: string; // YYYY-mm-DD
  };
  sk: string; // time
};

export const Measurement = new Entity<
  EntityType.MEASUREMENT,
  MeasurementItem,
  MeasurementCompositeKey,
  typeof table
>({
  name: EntityType.MEASUREMENT,
  attributes: {
    pk: {
      partitionKey: true,
      transform: (_, data: MeasurementItem): string => {
        // before sending to DDB
        const {
          pk: { sensorId, date },
        } = data;

        const sensor = `${getPrefix(EntityType.SENSOR)}${sensorId}`;
        const measurement = `${getPrefix(EntityType.MEASUREMENT)}${date}`;

        return `${sensor}${DELIMITER}${measurement}`;
      },
      format: (value: string): MeasurementItem["pk"] => {
        // after receiving from DDB
        const [sensorId, date] = extractValuesFromKey(value);
        return {
          date,
          sensorId,
        };
      },
    },
    sk: {
      sortKey: true,
      prefix: `time${DELIMITER}`,
    },
    entityType: {
      type: "string",
      required: false,
      default: EntityType.MEASUREMENT,
    },
    value: {
      type: "number",
      required: true,
      transform: (value: number) => {
        return Math.round(value);
      },
    },
  },
  table,
} as const);
