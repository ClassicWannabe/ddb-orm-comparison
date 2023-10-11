import { Table, INDEX_TYPE } from "@typedorm/common";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { createConnection } from "@typedorm/core";
import { DocumentClientV3 } from "@typedorm/document-client";

import { ENTITIES } from "./entities";
import { TABLE_NAME, DDB_LOCAL_ENDPOINT, GSI_MAP } from "../constants";

export const table = new Table({
  name: TABLE_NAME,
  partitionKey: "pk",
  sortKey: "sk",
  indexes: {
    GSI1: {
      type: INDEX_TYPE.GSI,
      partitionKey: GSI_MAP.GSI1.pk,
      sortKey: GSI_MAP.GSI1.sk,
    },
    GSI2: {
      type: INDEX_TYPE.GSI,
      partitionKey: GSI_MAP.GSI2.pk,
      sortKey: GSI_MAP.GSI2.sk,
    },
    GSI3: {
      type: INDEX_TYPE.GSI,
      partitionKey: GSI_MAP.GSI3.pk,
      sortKey: GSI_MAP.GSI3.sk,
    },
    GSI4: {
      type: INDEX_TYPE.GSI,
      partitionKey: GSI_MAP.GSI4.pk,
      sortKey: "", // required for some reason
    },
  },
});

const documentClient = new DocumentClientV3(
  new DynamoDBClient({
    endpoint: DDB_LOCAL_ENDPOINT,
    region: "random",
    credentials: {
      accessKeyId: "random",
      secretAccessKey: "random",
    },
  })
);

const connection = createConnection({
  table,
  entities: Object.values(ENTITIES),
  documentClient,
});

export const entityManager = connection.entityManager;
export const scanManager = connection.scanManager;
