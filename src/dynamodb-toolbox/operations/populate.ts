import fs from "fs";

import {
  ENTITY_HIERARCHY,
  EntityType,
  INITIAL_DATA_FILE_NAME,
} from "../../constants";
import { Building, Floor, Measurement, Room, Sensor } from "../entities";
import { table } from "../table";

export const populate = async () => {
  await createBuildings();
  await createFloors();
  await createRooms();
  await createSensors();
  await createMeasurements();
  await writeToLocal();
};

const createBuildings = async () => {
  const { building } = ENTITY_HIERARCHY;

  await Building.put({
    pk: building.id,
    sk: "info",
    entityType: EntityType.BUILDING,
    yearBuilt: building.yearBuilt,
    address: building.address,
    name: building.name,
  });
};

const createFloors = async () => {
  const { building } = ENTITY_HIERARCHY;
  await Promise.all(
    building.floors.map(async (floor) => {
      await Floor.put({
        pk: building.id,
        sk: floor.id,
        floorNumber: floor.floorNumber,
      });
    })
  );
};

const createRooms = async () => {
  const { building } = ENTITY_HIERARCHY;

  await Promise.all(
    building.floors.map(async (floor) => {
      await Promise.all(
        floor.rooms.map(async (room) => {
          await Room.put({
            pk: building.id,
            sk: {
              roomId: room.id,
              floorId: floor.id,
            },
            name: room.name,
            entityType: EntityType.ROOM,
          });
        })
      );
    })
  );
};

const createSensors = async () => {
  const { building } = ENTITY_HIERARCHY;

  await Promise.all(
    building.floors.map(async (floor) => {
      for (const room of floor.rooms) {
        for (const sensor of room.sensors) {
          await Sensor.put({
            pk: sensor.id,
            sk: "info",
            entityType: EntityType.SENSOR,
            sensorType: sensor.sensorType,
            unitOfMeasure: sensor.unitOfMeasure,
            buildingId: building.id,
            floorId: floor.id,
            roomId: room.id,
          });
        }
      }
    })
  );
};

const createMeasurements = async () => {
  const { building } = ENTITY_HIERARCHY;

  await Promise.all(
    building.floors.map(async (floor) => {
      for (const room of floor.rooms) {
        for (const sensor of room.sensors) {
          for (const measurement of sensor.measurements) {
            await Measurement.put({
              pk: {
                sensorId: sensor.id,
                date: measurement.date,
              },
              sk: measurement.time,
              entityType: EntityType.MEASUREMENT,
              value: measurement.value,
            });
          }
        }
      }
    })
  );
};

const writeToLocal = async () => {
  const scanResult = await table.scan();
  const items = scanResult.Items;

  fs.writeFileSync(
    `./src/dynamodb-toolbox/data/${INITIAL_DATA_FILE_NAME}`,
    JSON.stringify(items, null, 2)
  );
};
