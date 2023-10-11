import fs from "fs";

import {
  ENTITY_HIERARCHY,
  EntityType,
  RUN_OPERATIONS_FILE_NAME,
} from "../constants";
import {
  populate,
  purge,
  getBuildingInfo,
  getBuildingFloors,
  getFloorRooms,
  getBuildingSensors,
  getFloorSensors,
  getRoomSensors,
  getEntityItems,
  getLatestSensorMeasurement,
} from "./operations";

const main = async () => {
  await purge();
  await populate();

  const { building } = ENTITY_HIERARCHY;

  const buildingInfo = await getBuildingInfo(building.id);
  const buildingFloors = await getBuildingFloors(building.id);
  const floorRooms = await getFloorRooms(building.id, building.floors[0].id);

  const buildingSensors = await getBuildingSensors(building.id);
  const floorSensors = await getFloorSensors(building.floors[0].id);
  const roomSensors = await getRoomSensors(building.floors[0].rooms[0].id);

  const entityItems = await getEntityItems(EntityType.ROOM);

  const latestSensorMeasurement = await getLatestSensorMeasurement(
    building.floors[0].rooms[0].sensors[0].id
  );

  const results = {
    buildingInfo,
    buildingFloors,
    floorRooms,
    buildingSensors,
    floorSensors,
    roomSensors,
    entityItems,
    latestSensorMeasurement,
  };

  fs.writeFileSync(
    `./src/dynamodb-toolbox/data/${RUN_OPERATIONS_FILE_NAME}`,
    JSON.stringify(results, null, 2)
  );
};

main();
