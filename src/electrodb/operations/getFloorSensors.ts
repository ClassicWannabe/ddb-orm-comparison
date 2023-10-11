import { table } from "../table";

export const getFloorSensors = async (floorId: string) => {
  return await table.entities.sensor.query.floorSensors({ floorId }).go();
};
