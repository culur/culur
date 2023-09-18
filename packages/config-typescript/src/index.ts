import { defineConfig, Options } from "tsup";

const sharedConfig: Options = {
  sourcemap: true,
  clean: true,
  dts: true,
  entry: ["./src/index.ts"],
};

export const esm = defineConfig({
  ...sharedConfig,
  format: ["esm"],
  splitting: true,
  treeshake: true,
});

export const cjs = defineConfig({
  ...sharedConfig,
  format: ["cjs"],
});
