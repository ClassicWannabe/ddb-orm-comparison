export * from "./building";
export * from "./floor";
export * from "./room";
export * from "./sensor";
export * from "./measurement";

import { GSI, GSI_MAP } from "../../constants";
import { Building } from "./building";
import { Floor } from "./floor";
import { Measurement } from "./measurement";
import { Room } from "./room";
import { Sensor } from "./sensor";

export const schema = {
  format: "onetable:1.1.0",
  version: "0.0.1",
  indexes: {
    primary: {
      hash: "pk",
      sort: "sk",
    },
    [GSI.GSI1]: {
      hash: GSI_MAP.GSI1.pk,
      sort: GSI_MAP.GSI1.sk,
    },
    [GSI.GSI2]: {
      hash: GSI_MAP.GSI2.pk,
      sort: GSI_MAP.GSI2.sk,
    },
    [GSI.GSI3]: {
      hash: GSI_MAP.GSI3.pk,
      sort: GSI_MAP.GSI3.sk,
    },
    [GSI.GSI4]: {
      hash: "entityType",
    },
  },
  models: { Building, Floor, Room, Sensor, Measurement } as const,
};
