import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";

import { TABLE_NAME } from "../../constants";
import { client } from "../client";
import { scan } from "./scan";

export const purge = async () => {
  const response = await scan();
  const items = response.Items ?? [];

  for (const item of items) {
    const deleteItemCommand = new DeleteItemCommand({
      TableName: TABLE_NAME,
      Key: {
        pk: item.pk,
        sk: item.sk,
      },
    });

    await client.send(deleteItemCommand);
  }
};
