import { QUERY_ORDER } from "@typedorm/common";

import { Measurement } from "../entities";
import { entityManager } from "../table";

export const getLatestSensorMeasurement = async (sensorId: string) => {
  const datetimeISO = new Date(2023, 8, 26).toISOString();
  const date = datetimeISO.split("T")[0];

  return await entityManager.find(
    Measurement,
    { date, sensorId },
    { orderBy: QUERY_ORDER.DESC, limit: 1 }
  );
};
