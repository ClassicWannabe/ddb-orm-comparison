import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Table } from "dynamodb-toolbox";

import { DDB_LOCAL_ENDPOINT, GSI, GSI_MAP, TABLE_NAME } from "../constants";

const DocumentClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    endpoint: DDB_LOCAL_ENDPOINT,
    region: "random",
    credentials: {
      accessKeyId: "random",
      secretAccessKey: "random",
    },
  })
);

export const table = new Table({
  name: TABLE_NAME,
  partitionKey: "pk",
  sortKey: "sk",
  DocumentClient,
  attributes: {
    pk: "string",
    sk: "string",
    entityType: "string",
  },
  indexes: {
    [GSI.GSI1]: { partitionKey: GSI_MAP.GSI1.pk, sortKey: GSI_MAP.GSI1.sk },
    [GSI.GSI2]: { partitionKey: GSI_MAP.GSI2.pk, sortKey: GSI_MAP.GSI2.sk },
    [GSI.GSI3]: { partitionKey: GSI_MAP.GSI3.pk, sortKey: GSI_MAP.GSI3.sk },
    [GSI.GSI4]: { partitionKey: GSI_MAP.GSI4.pk },
  },
} as const);
