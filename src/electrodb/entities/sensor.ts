import { CustomAttributeType, Entity } from "electrodb";

import {
  EntityType,
  GSI,
  GSI_MAP,
  SensorType,
  TABLE_NAME,
  UnitOfMeasure,
} from "../../constants";
import { getPrefix } from "../../helpers";

export const Sensor = new Entity({
  model: {
    entity: EntityType.SENSOR,
    version: "1",
    service: TABLE_NAME,
  },
  attributes: {
    id: {
      type: "string",
      required: true,
      readOnly: true,
    },
    sk: {
      type: "string",
      default: "info",
      readOnly: true,
      validate: (value) => value !== "info",
    },
    buildingId: {
      type: "string",
      required: true,
      readOnly: true,
    },
    floorId: {
      type: "string",
      required: true,
      readOnly: true,
    },
    roomId: {
      type: "string",
      required: true,
      readOnly: true,
    },
    entityType: {
      type: "string",
      default: EntityType.SENSOR,
      readOnly: true,
      set: () => EntityType.SENSOR,
    },
    sensorType: {
      type: CustomAttributeType<SensorType>("string"),
      required: true,
      validate: (value: SensorType) =>
        !Object.values(SensorType).includes(value),
    },
    unitOfMeasure: {
      type: CustomAttributeType<UnitOfMeasure>("string"),
      required: true,
      validate: (value: UnitOfMeasure) =>
        !Object.values(UnitOfMeasure).includes(value),
    },
  },
  indexes: {
    sensor: {
      pk: {
        field: "pk",
        composite: ["id"],
        template: getPrefix(EntityType.SENSOR) + "${id}",
      },
      sk: {
        field: "sk",
        composite: ["sk"],
      },
    },
    buildingSensors: {
      index: GSI.GSI1,
      pk: {
        field: GSI_MAP.GSI1.pk,
        composite: ["buildingId"],
        template: getPrefix(EntityType.BUILDING) + "${buildingId}",
      },
      sk: {
        field: GSI_MAP.GSI1.sk,
        composite: ["id"],
        template: getPrefix(EntityType.SENSOR) + "${id}",
      },
    },
    floorSensors: {
      index: GSI.GSI2,
      pk: {
        field: GSI_MAP.GSI2.pk,
        composite: ["floorId"],
        template: getPrefix(EntityType.FLOOR) + "${floorId}",
      },
      sk: {
        field: GSI_MAP.GSI2.sk,
        composite: ["id"],
        template: getPrefix(EntityType.SENSOR) + "${id}",
      },
    },
    roomSensors: {
      index: GSI.GSI3,
      pk: {
        field: GSI_MAP.GSI3.pk,
        composite: ["roomId"],
        template: getPrefix(EntityType.ROOM) + "${roomId}",
      },
      sk: {
        field: GSI_MAP.GSI3.sk,
        composite: ["id"],
        template: getPrefix(EntityType.SENSOR) + "${id}",
      },
    },
    all: {
      index: GSI.GSI4,
      pk: {
        field: GSI_MAP.GSI4.pk,
        composite: ["entityType"],
      },
    },
  },
});
