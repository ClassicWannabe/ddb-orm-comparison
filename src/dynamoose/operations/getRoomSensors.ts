import { GSI } from "../../constants";
import { Sensor } from "../entities";

export const getRoomSensors = async (roomId: string) => {
  return await Sensor.query("roomId").eq(roomId).using(GSI.GSI3).exec();
};
