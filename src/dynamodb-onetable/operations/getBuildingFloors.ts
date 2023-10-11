import { table } from "../table";

export const getBuildingFloors = async (buildingId: string) => {
  const model = table.getModel("Floor");

  return await model.find({
    buildingId,
  });
};
