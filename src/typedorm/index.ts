import "reflect-metadata";
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

  // Next queries produce errors because of a bug. See the queries' contents
  try {
    await getBuildingSensors(building.id);
    await getFloorSensors(building.floors[0].id);
    await getRoomSensors(building.floors[0].rooms[0].id);
  } catch (error) {
    console.log(error);
  }

  const entityItems = await getEntityItems(EntityType.ROOM);

  const latestSensorMeasurement = await getLatestSensorMeasurement(
    building.floors[0].rooms[0].sensors[0].id
  );

  const results = {
    buildingInfo,
    buildingFloors,
    floorRooms,
    entityItems,
    latestSensorMeasurement,
    // buildingSensors,
    // floorSensors,
    // roomSensors,
  };

  fs.writeFileSync(
    `./src/typedorm/data/${RUN_OPERATIONS_FILE_NAME}`,
    JSON.stringify(results, null, 2)
  );
};

main();
