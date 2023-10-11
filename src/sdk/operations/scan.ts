import { ScanCommand } from "@aws-sdk/client-dynamodb";

import { TABLE_NAME } from "../../constants";
import { client } from "../client";

export const scan = async () => {
  const scanCommand = new ScanCommand({
    TableName: TABLE_NAME,
  });

  return await client.send(scanCommand);
};
