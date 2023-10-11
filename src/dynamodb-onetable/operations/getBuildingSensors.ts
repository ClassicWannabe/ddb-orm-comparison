import { GSI } from "../../constants";
import { table } from "../table";

export const getBuildingSensors = async (buildingId: string) => {
  const model = table.getModel("Sensor");

  return await model.find({ buildingId }, { index: GSI.GSI1 });
};
