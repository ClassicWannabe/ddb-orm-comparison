import { Attribute, Entity, INDEX_TYPE } from "@typedorm/common";

import { getPrefix } from "../../helpers";
import { EntityType, GSI, SensorType, UnitOfMeasure } from "../../constants";

const prefixedSensorId = `${getPrefix(EntityType.SENSOR)}{{id}}`;

@Entity({
  name: EntityType.SENSOR,
  primaryKey: {
    partitionKey: prefixedSensorId,
    sortKey: "info",
  },
  indexes: {
    [GSI.GSI1]: {
      type: INDEX_TYPE.GSI,
      partitionKey: `${getPrefix(EntityType.BUILDING)}{{buildingId}}`,
      sortKey: prefixedSensorId,
    },
    [GSI.GSI2]: {
      type: INDEX_TYPE.GSI,
      partitionKey: `${getPrefix(EntityType.FLOOR)}{{floorId}}`,
      sortKey: prefixedSensorId,
    },
    [GSI.GSI3]: {
      type: INDEX_TYPE.GSI,
      partitionKey: `${getPrefix(EntityType.ROOM)}{{roomId}}`,
      sortKey: prefixedSensorId,
    },
    [GSI.GSI4]: {
      type: INDEX_TYPE.GSI,
      partitionKey: `{{entityType}}`,
      sortKey: "",
    },
  },
})
export class Sensor {
  @Attribute()
  id: string;

  @Attribute()
  buildingId: string;

  @Attribute()
  floorId: string;

  @Attribute()
  roomId: string;

  @Attribute({ default: EntityType.SENSOR })
  entityType: EntityType;

  @Attribute({ isEnum: true })
  sensorType: SensorType;

  @Attribute({ isEnum: true })
  unitOfMeasure: UnitOfMeasure;
}
