import { table } from "../table";

export const getBuildingInfo = async (buildingId: string) => {
  return await table.entities.building
    .get({
      id: buildingId,
      sk: "info",
    })
    .go();
};
