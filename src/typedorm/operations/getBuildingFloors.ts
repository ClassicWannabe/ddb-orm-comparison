import { EntityType } from "../../constants";
import { getPrefix } from "../../helpers";
import { Floor } from "../entities";
import { entityManager } from "../table";

export const getBuildingFloors = async (buildingId: string) => {
  return await entityManager.find(
    Floor,
    {
      buildingId,
    },
    {
      keyCondition: {
        BEGINS_WITH: getPrefix(EntityType.FLOOR),
      },
    }
  );
};
