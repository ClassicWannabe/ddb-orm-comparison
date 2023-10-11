import fs from "fs";

import { ENTITY_HIERARCHY, INITIAL_DATA_FILE_NAME } from "../../constants";
import { table } from "../table";
import { scan } from "../../sdk/operations";

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

  await table.entities.building
    .create({
      id: building.id,
      yearBuilt: building.yearBuilt,
      address: building.address,
      name: building.name,
    })
    .go();
};

const createFloors = async () => {
  const { building } = ENTITY_HIERARCHY;
  await Promise.all(
    building.floors.map(async (floor) => {
      await table.entities.floor
        .create({
          buildingId: building.id,
          id: floor.id,
          floorNumber: floor.floorNumber,
        })
        .go();
    })
  );
};

const createRooms = async () => {
  const { building } = ENTITY_HIERARCHY;

  await Promise.all(
    building.floors.map(async (floor) => {
      await Promise.all(
        floor.rooms.map(async (room) => {
          await table.entities.room
            .create({
              buildingId: building.id,
              id: room.id,
              floorId: floor.id,
              name: room.name,
            })
            .go();
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
          await table.entities.sensor
            .create({
              id: sensor.id,
              sensorType: sensor.sensorType,
              unitOfMeasure: sensor.unitOfMeasure,
              buildingId: building.id,
              floorId: floor.id,
              roomId: room.id,
            })
            .go();
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
            await table.entities.measurement
              .create({
                sensorId: sensor.id,
                date: measurement.date,
                time: measurement.time,
                value: measurement.value,
              })
              .go();
          }
        }
      }
    })
  );
};

const writeToLocal = async () => {
  // can't scan all items using electrodb because of added prefixes and filters
  const scanResult = await scan();
  const items = scanResult.Items;

  fs.writeFileSync(
    `./src/dynamodb-toolbox/data/${INITIAL_DATA_FILE_NAME}`,
    JSON.stringify(items, null, 2)
  );
};
