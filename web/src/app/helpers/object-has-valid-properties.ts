export const objectHasValidProperties = (obj: Object) =>
  Object.values(obj).some(
    (value) => value !== '' || value !== null || value !== undefined,
  );
