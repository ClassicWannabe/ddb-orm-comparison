import { DELIMITER, EntityType } from "../../constants";
import { getPrefix } from "../../helpers";
import { Measurement } from "../entities";

export const getLatestSensorMeasurement = async (sensorId: string) => {
  const datetimeISO = new Date(2023, 8, 26).toISOString();
  const date = datetimeISO.split("T")[0];

  return await Measurement.query(
    `${getPrefix(EntityType.SENSOR)}${sensorId}${DELIMITER}${getPrefix(
      EntityType.MEASUREMENT
    )}${date}`,
    {
      reverse: true,
      limit: 1,
    }
  );
};
