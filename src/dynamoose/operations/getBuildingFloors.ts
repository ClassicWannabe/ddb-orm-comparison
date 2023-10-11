import { Floor } from "../entities";

export const getBuildingFloors = async (buildingId: string) => {
  return await Floor.query("pk")
    .eq(buildingId)
    .and()
    .where("sk")
    .beginsWith("") //prefix is added at the schema level
    .exec();
};
