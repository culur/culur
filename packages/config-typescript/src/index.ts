import { defineConfig, Options } from "tsup";

const sharedConfig: Options = {
  sourcemap: true,
  clean: true,
  dts: true,
};

export const esm = defineConfig({
  ...sharedConfig,
  entry: ["./src/index.ts"],
  format: ["esm"],
  splitting: true,
  treeshake: true,
});

export const cjs = defineConfig({
  ...sharedConfig,
  entry: ["./src/index.ts"],
  format: ["cjs"],
});
