import { Measurement } from "../entities";

export const getLatestSensorMeasurement = async (sensorId: string) => {
  const datetimeISO = new Date(2023, 8, 26).toISOString(); // 2023-09-25
  const date = datetimeISO.split("T")[0];

  return await Measurement.query("pk")
    .eq({ date, sensorId })
    .sort("descending")
    .limit(1)
    .exec();
};
