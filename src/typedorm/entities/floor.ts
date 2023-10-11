import { Attribute, Entity, INDEX_TYPE } from "@typedorm/common";

import { getPrefix } from "../../helpers";
import { EntityType, GSI } from "../../constants";

@Entity({
  name: EntityType.FLOOR,
  primaryKey: {
    partitionKey: `${getPrefix(EntityType.BUILDING)}{{buildingId}}`,
    sortKey: `${getPrefix(EntityType.FLOOR)}{{id}}`,
  },
  indexes: {
    [GSI.GSI4]: {
      type: INDEX_TYPE.GSI,
      partitionKey: `{{entityType}}`,
      sortKey: "",
    },
  },
})
export class Floor {
  @Attribute()
  id: string;

  @Attribute()
  buildingId: string;

  @Attribute()
  floorNumber: number;

  @Attribute({ default: EntityType.FLOOR })
  entityType: EntityType;
}
