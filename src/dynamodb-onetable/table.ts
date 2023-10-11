import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Table } from "dynamodb-onetable";

import { DDB_LOCAL_ENDPOINT, TABLE_NAME } from "../constants";
import { schema } from "./entities";

const client = new DynamoDBClient({
  endpoint: DDB_LOCAL_ENDPOINT,
  region: "random",
  credentials: {
    accessKeyId: "random",
    secretAccessKey: "random",
  },
});

export const table = new Table({
  client,
  schema,
  name: TABLE_NAME,
  partial: true,
  logger: true,
});
