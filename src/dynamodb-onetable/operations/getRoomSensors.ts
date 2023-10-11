import { GSI } from "../../constants";
import { table } from "../table";

export const getRoomSensors = async (roomId: string) => {
  const model = table.getModel("Sensor");

  return await model.find({ roomId }, { index: GSI.GSI3 });
};
