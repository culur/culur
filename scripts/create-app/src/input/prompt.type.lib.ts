export const getTypeLib = async ({ type }: { type: 'lib' }) => {
  return {
    type,
    framework: 'vanilla' as const,
    builder: 'vite' as const,
  };
};
