import { DELIMITER, EntityType, NESTED_DELIMITER } from "./constants";

export const getPrefix = (entity: EntityType): string => {
  return `${entity.toLowerCase()}${DELIMITER}`;
};

export const getNestedPrefix = (entity: EntityType): string => {
  return `${entity.toLowerCase()}${NESTED_DELIMITER}`;
};

export const extractValuesFromKey = (key: string): string[] => {
  let newKey = key;
  const removeKeys = [...Object.values(EntityType), "time"];
  for (const removeKey of removeKeys) {
    const delimiterPattern = `(${DELIMITER}|${NESTED_DELIMITER})`;
    const pattern = new RegExp(
      `${delimiterPattern}?${removeKey}${delimiterPattern}?`,
      "gi"
    );
    newKey = newKey.replace(pattern, " ");
  }
  return newKey.split(" ").filter((part) => part);
};
