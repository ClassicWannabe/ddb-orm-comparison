import { purge as sdkPurge } from "../../sdk/operations";

export const purge = async () => {
  // since it is impossible to get all items with scan command, the sdk `purge` has to be used
  await sdkPurge();
};
