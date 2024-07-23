export const defineObject =
  <TBaseObject, TAutoComplete extends boolean = false>() =>
  <TActualObject extends TBaseObject>(
    object: TAutoComplete extends true
      ? TActualObject | TBaseObject
      : TActualObject,
  ) =>
    object;
