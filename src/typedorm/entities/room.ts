import { Attribute, Entity, INDEX_TYPE } from "@typedorm/common";

import { getNestedPrefix, getPrefix } from "../../helpers";
import { EntityType, GSI, NESTED_DELIMITER } from "../../constants";

@Entity({
  name: EntityType.ROOM,
  primaryKey: {
    partitionKey: `${getPrefix(EntityType.BUILDING)}{{buildingId}}`,
    sortKey: `${getNestedPrefix(
      EntityType.FLOOR
    )}{{floorId}}${NESTED_DELIMITER}${getPrefix(EntityType.ROOM)}{{id}}`,
  },
  indexes: {
    [GSI.GSI4]: {
      type: INDEX_TYPE.GSI,
      partitionKey: `{{entityType}}`,
      sortKey: "",
    },
  },
})
export class Room {
  @Attribute()
  id: string;

  @Attribute()
  buildingId: string;

  @Attribute()
  floorId: string;

  @Attribute()
  name: string;

  @Attribute({ default: EntityType.ROOM })
  entityType: EntityType;
}
