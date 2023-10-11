import { table } from "../table";

export const getLatestSensorMeasurement = async (sensorId: string) => {
  const datetimeISO = new Date(2023, 8, 26).toISOString();
  const date = datetimeISO.split("T")[0];

  return await table.entities.measurement.query
    .measurement({ sensorId, date })
    .go({ limit: 1, order: "desc" });
};
