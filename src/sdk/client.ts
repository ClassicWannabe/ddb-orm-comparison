import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import { DDB_LOCAL_ENDPOINT } from "../constants";

export const client = new DynamoDBClient({
  endpoint: DDB_LOCAL_ENDPOINT,
  region: "random",
  credentials: {
    accessKeyId: "random",
    secretAccessKey: "random",
  },
});
