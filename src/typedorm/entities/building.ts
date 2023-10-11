import { Attribute, Entity, INDEX_TYPE } from "@typedorm/common";

import { EntityType, GSI } from "../../constants";
import { getPrefix } from "../../helpers";

@Entity({
  name: EntityType.BUILDING,
  primaryKey: {
    partitionKey: `${getPrefix(EntityType.BUILDING)}{{id}}`,
    sortKey: "info",
  },
  indexes: {
    [GSI.GSI4]: {
      type: INDEX_TYPE.GSI,
      partitionKey: `{{entityType}}`,
      sortKey: "", // yells if not specified
    },
  },
})
export class Building {
  @Attribute()
  id: string;

  @Attribute()
  address: string;

  @Attribute()
  name: string;

  @Attribute()
  yearBuilt: number;

  @Attribute({ default: EntityType.BUILDING })
  entityType: EntityType;
}
