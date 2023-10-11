import { EntityType, NESTED_DELIMITER } from "../../constants";
import { getNestedPrefix, getPrefix } from "../../helpers";
import { Room } from "../entities";
import { entityManager } from "../table";

export const getFloorRooms = async (buildingId: string, floorId: string) => {
  return await entityManager.find(
    Room,
    { buildingId },
    {
      keyCondition: {
        BEGINS_WITH: `${getNestedPrefix(
          EntityType.FLOOR
        )}${floorId}${NESTED_DELIMITER}${getPrefix(EntityType.ROOM)}`,
      },
    }
  );
};
