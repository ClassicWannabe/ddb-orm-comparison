import { table } from "../table";

export const getLatestSensorMeasurement = async (sensorId: string) => {
  const datetimeISO = new Date(2023, 8, 26).toISOString();
  const date = datetimeISO.split("T")[0];
  const model = table.getModel("Measurement");

  return await model.find(
    { sensorId, date },
    {
      reverse: true,
      limit: 1,
    }
  );
};
