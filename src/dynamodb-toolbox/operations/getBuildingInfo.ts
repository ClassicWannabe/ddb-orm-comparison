import { Building } from "../entities";

export const getBuildingInfo = async (buildingId: string) => {
  return await Building.get({
    pk: buildingId,
  });
};
