import { EntityType, NESTED_DELIMITER } from "../../constants";
import { getNestedPrefix, getPrefix } from "../../helpers";
import { Room } from "../entities";

export const getFloorRooms = async (buildingId: string, floorId: string) => {
  return await Room.query(`${getPrefix(EntityType.BUILDING)}${buildingId}`, {
    beginsWith: `${getNestedPrefix(
      EntityType.FLOOR
    )}${floorId}${NESTED_DELIMITER}${getPrefix(EntityType.ROOM)}`,
  });
};
