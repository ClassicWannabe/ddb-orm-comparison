import { EntityType } from "../../constants";
import { table } from "../table";

export const purge = async () => {
  // since `entity` is a required parameter in `table`, we have to implement this workaround to purge all data
  for (const entity of Object.values(EntityType)) {
    const result = await table.scan({
      parseAsEntity: entity,
    });
    const promises = result.Items?.map(async (item) => {
      await table.delete(entity, { pk: item.pk, sk: item.sk });
    });
    if (promises) {
      await Promise.all(promises);
    }
  }
};
