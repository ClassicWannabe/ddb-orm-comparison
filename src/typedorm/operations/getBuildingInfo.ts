import { Building } from "../entities";
import { entityManager } from "../table";

export const getBuildingInfo = async (buildingId: string) => {
  return await entityManager.findOne(Building, {
    id: buildingId,
  });
};
