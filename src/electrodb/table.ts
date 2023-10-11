import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Service } from "electrodb";

import { DDB_LOCAL_ENDPOINT, TABLE_NAME } from "../constants";
import { Building, Floor, Measurement, Room, Sensor } from "./entities";

export const client = new DynamoDBClient({
  endpoint: DDB_LOCAL_ENDPOINT,
  region: "random",
  credentials: {
    accessKeyId: "random",
    secretAccessKey: "random",
  },
});

export const table = new Service(
  {
    building: Building,
    floor: Floor,
    room: Room,
    sensor: Sensor,
    measurement: Measurement,
  },
  {
    client,
    table: TABLE_NAME,
  }
);
