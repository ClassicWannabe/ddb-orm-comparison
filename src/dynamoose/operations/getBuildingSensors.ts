import { GSI } from "../../constants";
import { Sensor } from "../entities";

export const getBuildingSensors = async (buildingId: string) => {
  return await Sensor.query("buildingId").eq(buildingId).using(GSI.GSI1).exec();
};
