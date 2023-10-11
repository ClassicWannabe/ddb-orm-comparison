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
  const model = table.getModel("Building");
  const { building } = ENTITY_HIERARCHY;

  await model.create({
    id: building.id,
    yearBuilt: building.yearBuilt,
    address: building.address,
    name: building.name,
  });
};

const createFloors = async () => {
  const model = table.getModel("Floor");
  const { building } = ENTITY_HIERARCHY;

  await Promise.all(
    building.floors.map(async (floor) => {
      await model.create({
        buildingId: building.id,
        id: floor.id,
        floorNumber: floor.floorNumber,
      });
    })
  );
};

const createRooms = async () => {
  const model = table.getModel("Room");
  const { building } = ENTITY_HIERARCHY;

  await Promise.all(
    building.floors.map(async (floor) => {
      await Promise.all(
        floor.rooms.map(async (room) => {
          await model.create({
            buildingId: building.id,
            id: room.id,
            floorId: floor.id,
            name: room.name,
          });
        })
      );
    })
  );
};

const createSensors = async () => {
  const model = table.getModel("Sensor");
  const { building } = ENTITY_HIERARCHY;

  await Promise.all(
    building.floors.map(async (floor) => {
      for (const room of floor.rooms) {
        for (const sensor of room.sensors) {
          await model.create({
            id: sensor.id,
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
  const model = table.getModel("Measurement");
  const { building } = ENTITY_HIERARCHY;

  await Promise.all(
    building.floors.map(async (floor) => {
      for (const room of floor.rooms) {
        for (const sensor of room.sensors) {
          for (const measurement of sensor.measurements) {
            await model.create({
              sensorId: sensor.id,
              date: measurement.date,
              time: measurement.time,
              value: measurement.value,
            });
          }
        }
      }
    })
  );
};

const writeToLocal = async () => {
  const items = await table.scanItems();

  fs.writeFileSync(
    `./src/dynamodb-onetable/data/${INITIAL_DATA_FILE_NAME}`,
    JSON.stringify(items, null, 2)
  );
};
