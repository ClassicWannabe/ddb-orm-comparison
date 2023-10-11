import { table } from "../table";

export const purge = async () => {
  const items = await table.scanItems();

  for (const item of items) {
    // could not parse the scanned items `{ parse: true }` because of a bug
    await table.deleteItem({ pk: item.pk.S, sk: item.sk.S });
  }
};
