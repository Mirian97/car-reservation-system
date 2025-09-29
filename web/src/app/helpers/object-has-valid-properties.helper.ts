export const objectHasValidProperties = (obj: object) =>
  Object.values(obj).some(
    (value) => value !== null && value !== undefined && value !== '',
  );
