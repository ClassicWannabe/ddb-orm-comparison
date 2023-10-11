export const TABLE_NAME = "sensor-management";

export const DDB_LOCAL_ENDPOINT = "http://localhost:8000";

export const INITIAL_DATA_FILE_NAME = "scannedIntialData.json";

export const RUN_OPERATIONS_FILE_NAME = "runOperations.json";

export enum EntityType {
  BUILDING = "Building",
  FLOOR = "Floor",
  ROOM = "Room",
  SENSOR = "Sensor",
  MEASUREMENT = "Measurement",
}

export const DELIMITER = "#";

export const NESTED_DELIMITER = "@";

export enum GSI {
  GSI1 = "GSI1",
  GSI2 = "GSI2",
  GSI3 = "GSI3",
  GSI4 = "GSI4",
}

export const GSI_MAP = {
  [GSI.GSI1]: {
    pk: "GSI1-pk",
    sk: "GSI1-sk",
  },
  [GSI.GSI2]: {
    pk: "GSI2-pk",
    sk: "GSI2-sk",
  },
  [GSI.GSI3]: {
    pk: "GSI3-pk",
    sk: "GSI3-sk",
  },
  [GSI.GSI4]: {
    pk: "entityType",
  },
} as const;

export enum SensorType {
  TEMPERATURE = "temperature",
  PRESSURE = "pressure",
}

export enum UnitOfMeasure {
  CELSIUS = "celsius",
  MILLIBAR = "millibar",
}

export const ENTITY_HIERARCHY = {
  building: {
    id: "b-1",
    entityType: EntityType.BUILDING,
    name: "Discovery",
    yearBuilt: 1997,
    address: "Aktau, Kazakhstan",
    floors: [
      {
        id: "f-1",
        entityType: EntityType.FLOOR,
        floorNumber: 1,
        rooms: [
          {
            id: "r-1",
            entityType: EntityType.ROOM,
            name: "Server room",
            sensors: [
              {
                id: "s-1",
                entityType: EntityType.SENSOR,
                sensorType: SensorType.TEMPERATURE,
                unitOfMeasure: UnitOfMeasure.CELSIUS,
                measurements: [
                  {
                    entityType: EntityType.MEASUREMENT,
                    date: "2023-09-25",
                    time: "23:30:00",
                    value: 25,
                  },
                  {
                    entityType: EntityType.MEASUREMENT,
                    date: "2023-09-25",
                    time: "23:31:00",
                    value: 23,
                  },
                ],
              },
              {
                id: "s-3",
                entityType: EntityType.SENSOR,
                sensorType: SensorType.PRESSURE,
                unitOfMeasure: UnitOfMeasure.MILLIBAR,
                measurements: [],
              },
            ],
          },
        ],
      },
      {
        id: "f-2",
        entityType: EntityType.FLOOR,
        floorNumber: 2,
        rooms: [
          {
            id: "r-2",
            entityType: EntityType.ROOM,
            name: "Kitchen",
            sensors: [
              {
                id: "s-2",
                entityType: EntityType.SENSOR,
                sensorType: SensorType.TEMPERATURE,
                unitOfMeasure: UnitOfMeasure.CELSIUS,
                measurements: [],
              },
            ],
          },
        ],
      },
    ],
  },
} as const;
