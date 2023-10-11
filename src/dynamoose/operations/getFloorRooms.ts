import { Room } from "../entities";

export const getFloorRooms = async (buildingId: string, floorId: string) => {
  return await Room.query("pk")
    .eq(buildingId)
    .and()
    .where("sk")
    .beginsWith({ floorId })
    .exec();
};
