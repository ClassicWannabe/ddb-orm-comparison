import { GSI } from "../../constants";
import { entityManager } from "../table";
import { Sensor } from "../entities";

export const getFloorSensors = async (floorId: string) => {
  `
  Produces this command with a syntax error because of a hyphen:
  "ExpressionAttributeNames": {
    "#KY_CE_GSI2-pk": "GSI2-pk"
  }

  `;
  return await entityManager.find(
    Sensor,
    { floorId },
    {
      queryIndex: GSI.GSI2,
    }
  );
};
