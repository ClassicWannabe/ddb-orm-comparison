import { table } from "../table";

export const getFloorRooms = async (buildingId: string, floorId: string) => {
  return await table.entities.room.query.room({ buildingId, floorId }).go();
};
