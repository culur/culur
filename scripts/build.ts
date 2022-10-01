import { runScript } from "./utils";

const [packageName] = process.argv.slice(2);

switch (packageName) {
  case undefined:
    await runScript("config-typescript", "build");
    await runScript("config-prettier", "build");
    await runScript("cli", "build");
    break;
  case "config-typescript":
  case "config-prettier":
  case "cli":
    await runScript(packageName, "build");
    break;
  default:
    console.error(`Unknown package name: ${packageName}`);
}
