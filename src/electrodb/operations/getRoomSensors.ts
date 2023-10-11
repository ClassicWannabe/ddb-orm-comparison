import { table } from "../table";

export const getRoomSensors = async (roomId: string) => {
  return await table.entities.sensor.query.roomSensors({ roomId }).go();
};
