import { EntityType, GSI } from "../../constants";
import { getPrefix } from "../../helpers";
import { Sensor } from "../entities";

export const getBuildingSensors = async (buildingId: string) => {
  return await Sensor.query(`${getPrefix(EntityType.BUILDING)}${buildingId}`, {
    index: GSI.GSI1,
  });
};
