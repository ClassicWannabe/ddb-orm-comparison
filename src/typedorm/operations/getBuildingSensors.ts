import { GSI } from "../../constants";
import { Sensor } from "../entities";
import { entityManager } from "../table";

export const getBuildingSensors = async (buildingId: string) => {
  `
  Produces this command with a syntax error because of a hyphen:
  "ExpressionAttributeNames": {
    "#KY_CE_GSI1-pk": "GSI1-pk"
  }

  `;
  return await entityManager.find(
    Sensor,
    { buildingId },
    {
      queryIndex: GSI.GSI1,
    }
  );
};
