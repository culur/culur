export const defineObject =
  <TBaseObject>() =>
  <TActualObject extends TBaseObject>(object: TActualObject) =>
    object;
