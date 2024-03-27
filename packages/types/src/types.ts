export const defineObject =
  <Q>() =>
  <T extends Q>(object: T) =>
    object;
