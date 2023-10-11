import { Building } from "../entities";

export const getBuildingInfo = async (buildingId: string) => {
  return await Building.get({ id: buildingId, sk: "info" });
};
