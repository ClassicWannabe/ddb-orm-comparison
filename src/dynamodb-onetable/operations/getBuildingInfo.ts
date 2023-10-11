import { table } from "../table";

export const getBuildingInfo = async (buildingId: string) => {
  const model = table.getModel("Building");
  return await model.get({
    pk: buildingId,
  });
};
