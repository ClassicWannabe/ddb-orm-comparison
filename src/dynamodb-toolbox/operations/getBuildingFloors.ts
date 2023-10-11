import { EntityType } from "../../constants";
import { getPrefix } from "../../helpers";
import { Floor } from "../entities";

export const getBuildingFloors = async (buildingId: string) => {
  return await Floor.query(`${getPrefix(EntityType.BUILDING)}${buildingId}`, {
    beginsWith: getPrefix(EntityType.FLOOR),
  });
};
