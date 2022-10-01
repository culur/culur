import { defineConfig } from "tsup";
import { cjs } from "@culur/config-typescript";

export default defineConfig({
  ...cjs,
  entry: ["./src/cli.ts"],
});
