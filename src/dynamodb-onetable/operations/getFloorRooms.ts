import { table } from "../table";

export const getFloorRooms = async (buildingId: string, floorId: string) => {
  const model = table.getModel("Room");

  return await model.find({ buildingId, floorId });
};
