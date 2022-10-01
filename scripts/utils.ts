import { execa } from "execa";
import chalk from "chalk";

export const runScript = async (name: string, ...args: string[]) => {
  const packageName = `@culur/${name}`;

  console.log(
    chalk.yellow("RUN"),
    chalk.yellow.underline(packageName),
    chalk.blue(args.join(" "))
  );

  await execa("yarn", ["workspace", packageName, "run", ...args], {
    stdio: "inherit",
  });
};
