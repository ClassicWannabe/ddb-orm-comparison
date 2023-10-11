import { EntityType, GSI } from "../../constants";
import { getPrefix } from "../../helpers";
import { Sensor } from "../entities";

export const getFloorSensors = async (floorId: string) => {
  return await Sensor.query(`${getPrefix(EntityType.FLOOR)}${floorId}`, {
    index: GSI.GSI2,
  });
};
