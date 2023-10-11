import { GSI } from "../../constants";
import { table } from "../table";

export const getFloorSensors = async (floorId: string) => {
  const model = table.getModel("Sensor");

  return await model.find({ floorId }, { index: GSI.GSI2 });
};
