import { table } from "../table";

export const getBuildingFloors = async (buildingId: string) => {
  return await table.entities.floor.query.floor({ buildingId }).go();
};
