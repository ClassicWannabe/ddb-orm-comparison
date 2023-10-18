import { table } from "../table";

export const getBuildingFloors = async (buildingId: string) => {
  const floor = table.entities.floor;

  return await floor.query.floor({ buildingId }).go();
};
