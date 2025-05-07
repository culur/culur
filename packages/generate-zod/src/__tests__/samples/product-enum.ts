// Basic enum with string values
export enum Status {
  New = 'NEW',
  Processing = 'PROCESSING',
  Completed = 'COMPLETED',
  Cancelled = 'CANCELLED',
}

// Enum without explicitly assigned values (defaults to 0, 1, 2, ...)
export enum PermissionLevel {
  Read,
  Write,
  Execute,
}
