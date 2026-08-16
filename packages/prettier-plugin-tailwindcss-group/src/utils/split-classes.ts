export function splitClasses(classString: string): string[] {
  return classString.trim().split(/\s+/).filter(Boolean);
}
