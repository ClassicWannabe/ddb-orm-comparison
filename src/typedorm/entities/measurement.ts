import { Attribute, Entity, INDEX_TYPE } from "@typedorm/common";

import { getPrefix } from "../../helpers";
import { DELIMITER, EntityType, GSI } from "../../constants";

@Entity({
  name: EntityType.MEASUREMENT,
  primaryKey: {
    partitionKey: `${getPrefix(
      EntityType.SENSOR
    )}{{sensorId}}${DELIMITER}${getPrefix(EntityType.MEASUREMENT)}{{date}}`,
    sortKey: `time${DELIMITER}{{time}}`,
  },
  indexes: {
    [GSI.GSI4]: {
      type: INDEX_TYPE.GSI,
      partitionKey: `{{entityType}}`,
      sortKey: "",
    },
  },
})
export class Measurement {
  @Attribute()
  date: string;

  @Attribute()
  time: string;

  @Attribute()
  sensorId: string;

  @Attribute()
  value: number;

  @Attribute({ default: EntityType.MEASUREMENT })
  entityType: EntityType;
}
