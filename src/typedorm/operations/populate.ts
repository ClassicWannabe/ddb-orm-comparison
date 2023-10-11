import fs from "fs";

import {
  ENTITY_HIERARCHY,
  EntityType,
  INITIAL_DATA_FILE_NAME,
} from "../../constants";
import { Building, Floor, Room, Sensor, Measurement } from "../entities";
import { entityManager, scanManager, table } from "../table";

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

  const newBuilding = new Building();
  newBuilding.id = building.id;
  newBuilding.address = building.address;
  newBuilding.name = building.name;
  newBuilding.yearBuilt = building.yearBuilt;

  await entityManager.create(newBuilding);
};

const createFloors = async () => {
  const { building } = ENTITY_HIERARCHY;
  await Promise.all(
    building.floors.map(async (floor) => {
      const newFloor = new Floor();
      newFloor.id = floor.id;
      newFloor.buildingId = building.id;
      newFloor.floorNumber = floor.floorNumber;

      await entityManager.create(newFloor);
    })
  );
};

const createRooms = async () => {
  const { building } = ENTITY_HIERARCHY;

  await Promise.all(
    building.floors.map(async (floor) => {
      await Promise.all(
        floor.rooms.map(async (room) => {
          const newRoom = new Room();
          newRoom.id = room.id;
          newRoom.buildingId = building.id;
          newRoom.floorId = floor.id;
          newRoom.name = room.name;

          await entityManager.create(newRoom);
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
          const newSenor = new Sensor();
          newSenor.id = sensor.id;
          newSenor.buildingId = building.id;
          newSenor.floorId = floor.id;
          newSenor.roomId = room.id;
          newSenor.sensorType = sensor.sensorType;
          newSenor.unitOfMeasure = sensor.unitOfMeasure;

          await entityManager.create(newSenor);
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
            const newMeasurement = new Measurement();
            newMeasurement.date = measurement.date;
            newMeasurement.sensorId = sensor.id;
            newMeasurement.time = measurement.time;
            newMeasurement.value = measurement.value;

            await entityManager.create(newMeasurement);
          }
        }
      }
    })
  );
};

const writeToLocal = async () => {
  const scanResult = await scanManager.scan();
  const items = scanResult.items;

  fs.writeFileSync(
    `./src/typedorm/data/${INITIAL_DATA_FILE_NAME}`,
    JSON.stringify(items, null, 2)
  );
};
