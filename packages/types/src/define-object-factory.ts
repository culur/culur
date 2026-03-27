export const defineObjectFactory =
  <TBaseObject, TAutoComplete extends boolean = false>() =>
  <TActualObject extends TBaseObject>(
    object: TAutoComplete extends true
      ? TActualObject | TBaseObject
      : TActualObject,
  ) =>
    object;
