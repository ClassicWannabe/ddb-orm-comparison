import { ENTITIES } from "../entities";
import { entityManager, scanManager } from "../table";

export const purge = async () => {
  const scanResult = await scanManager.scan();
  const items = scanResult.items;

  for (const entity of Object.values(ENTITIES)) {
    const promises = items?.map(async (item) => {
      await entityManager.delete(entity, item);
    });
    if (promises) {
      await Promise.allSettled(promises);
    }
  }
};
