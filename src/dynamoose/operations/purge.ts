import { table } from "../table";
import { Building, Floor, Room, Sensor, Measurement } from "../entities";

export const purge = async () => {
  // have to implement this workaround because of wrong schema match on `table`
  const models = [Building, Floor, Room, Sensor, Measurement];
  const items = await table.scan().exec();

  await Promise.allSettled(
    items.map(async (item) => {
      return await Promise.allSettled(
        models.map(async (model) => model.delete(item))
      );
    })
  );
};
