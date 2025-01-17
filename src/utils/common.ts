/**
 * Retrieves the key of an enum object by its value.
 * @param enumObj The enum object to search for the key.
 * @param value The value of the enum to find the corresponding key.
 * @returns The key of the enum object if found, otherwise undefined.
 */
export function getEnumKeyByValue<T extends Record<string, string>>(
  enumObj: T,
  value: string
): keyof T | undefined {
  const entries = Object.entries(enumObj) as [keyof T, string][];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const foundEntry = entries.find(([key, enumValue]) => {
    return enumValue === value;
  });
  return foundEntry ? foundEntry[0] : undefined;
}
