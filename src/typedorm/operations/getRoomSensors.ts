import { GSI } from "../../constants";
import { Sensor } from "../entities";
import { entityManager } from "../table";

export const getRoomSensors = async (roomId: string) => {
  `
  Produces this command with a syntax error because of a hyphen:
  "ExpressionAttributeNames": {
    "#KY_CE_GSI3-pk": "GSI3-pk"
  }

  `;
  return await entityManager.find(
    Sensor,
    { roomId },
    {
      queryIndex: GSI.GSI3,
    }
  );
};
