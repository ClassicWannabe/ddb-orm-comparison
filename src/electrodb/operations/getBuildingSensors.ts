import { table } from "../table";

export const getBuildingSensors = async (buildingId: string) => {
  return await table.entities.sensor.query.buildingSensors({ buildingId }).go();
};
