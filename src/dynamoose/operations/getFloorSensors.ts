import { GSI } from "../../constants";
import { Sensor } from "../entities";

export const getFloorSensors = async (floorId: string) => {
  return await Sensor.query("floorId").eq(floorId).using(GSI.GSI2).exec();
};
