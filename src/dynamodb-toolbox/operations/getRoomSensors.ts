import { EntityType, GSI } from "../../constants";
import { getPrefix } from "../../helpers";
import { Sensor } from "../entities";

export const getRoomSensors = async (roomId: string) => {
  return await Sensor.query(`${getPrefix(EntityType.ROOM)}${roomId}`, {
    index: GSI.GSI3,
  });
};
