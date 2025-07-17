# `@culur/generate-zod`

[![NPM Version](https://img.shields.io/npm/v/@culur/generate-zod?logo=npm)](https://www.npmjs.com/package/@culur/generate-zod)
[![NPM Download](https://img.shields.io/npm/dm/@culur/generate-zod?logo=npm)](https://www.npmjs.com/package/@culur/generate-zod)
[![NPM License](https://img.shields.io/npm/l/@culur/generate-zod)](../../LICENSE)

[![CodeFactor](https://www.codefactor.io/repository/github/culur/culur/badge)](https://www.codefactor.io/repository/github/culur/culur)
[![Codecov](https://img.shields.io/codecov/c/github/culur/culur)](https://app.codecov.io/gh/culur/culur)
[![Build and release](https://github.com/culur/culur/actions/workflows/build-and-release.yml/badge.svg)](https://github.com/culur/culur/actions/workflows/build-and-release.yml)

> An enhanced wrapper around `ts-to-zod`

## ✨ Features

This library acts as an enhanced wrapper around `ts-to-zod`, offering a streamlined and highly configurable way to generate Zod schemas from your TypeScript types, interfaces, and enums.

The primary export is the `generateZod` function, designed for flexibility. Here's an overview of its signature:

```ts
declare function generateZod(
  files: {
    [outputFile: string]: {
      customImport?: string;
      inputFiles: {
        [filename: string]: (
          | string
          | [declarationName: string, declarationOutputName: string]
        )[];
      };
      validateTypes?: string[];
    };
  },
  options?: {
    loggerProps?: IRootObject['props'];
    cwd?: string;
    zodImportValue?: GenerateZodSchemaProps['zodImportValue'];
    skipParseJSDoc?: GenerateZodSchemaProps['skipParseJSDoc'];
    getDependencyName?: GenerateZodSchemaProps['getDependencyName'];
    customJSDocFormatTypes?: CustomJSDocFormatTypes;
    postCommands?: (outputFile: string) => string[];
  },
): Promise<void>;
```

Key capabilities of the `generateZod` function include:

- **Flexible File Organization (`files` object):**
  - Configure multiple `outputFile` destinations. Each output can be assembled from various `inputFiles`, allowing for granular control over your generated schema structure.

  - Precisely choose which interfaces, types, or enums from each `inputFile` (specified in `inputFiles: { [filename: string]: string[] }`) should be converted into Zod schemas. This is ideal for generating schemas only for specific parts of your codebase.

- **Custom Import Management (`customImport` property):** Prepend your own `customImport` at the beginning of generated files. This gives you full control over dependencies, as the library intentionally bypasses `ts-to-zod`'s default import generation.

- **Automatic Type Predicates (`validateTypes` property):** For a specified list of `validateTypes` (which must be among the types selected for generation), the library automatically generates `isYourType` type predicate functions, simplifying runtime data validation with ready-to-use type guards.

- **Comprehensive Configuration via `options` Object:** The optional `options` object allows for fine-grained control over the generation process:
  - **`cwd` (string):** a string used to specify the current working directory. You would usually use `__dirname` or `import.meta.dirname` here with the `path.resolve` function.

  - **`loggerProps` (object):** This is the second parameter when you call `new Logger(title, props)` of the `@culur/logger` library. See the library for more details.

  - **`ts-to-zod` Passthrough Options:** The following properties are passed directly to the underlying `ts-to-zod` library, allowing you to leverage its full feature set:
    - `zodImportValue`
    - `skipParseJSDoc`
    - `getDependencyName`
    - `customJSDocFormatTypes`

  - **`postCommands` (function):**
    - A function that accepts the `outputFile` path (string) as an argument and should return an array of command strings.
    - These commands are executed sequentially after each TypeScript file is successfully generated.
    - Each command is run individually, and errors during a command's execution will not halt the processing of subsequent commands or files.
    - Defaults to a function that returns:

      ```ts
      (outputFile: string) => [
        `eslint "${outputFile}" --fix`,
        `prettier "${outputFile}" --write`,
      ];
      ```

    - This is extremely useful for automatically linting and formatting the generated Zod schema files.

- **Convenient `ts` Helper:** Provides a `ts` template literal tag (an alias for `dedent`) to simplify the declaration of multi-line strings, especially useful for crafting `customImport`.

## 💿 Installation

Add `@culur/generate-zod` dependency to your project.

```bash
# Using npm
npm install @culur/generate-zod --save-dev

# Using pnpm
pnpm install @culur/generate-zod --dev

# Using yarn
yarn add @culur/generate-zod --dev
```

## 📖 Usage

This section demonstrates how to use `@culur/generate-zod` to generate Zod schemas from your TypeScript types.

### 1. Define Your TypeScript Types

First, you need your TypeScript types, interfaces, or enums defined in `.ts` files. For example:

**`src/types/credentials.ts`**

```ts
// src/types/credentials.ts

export interface Credentials {
  access_token: string;
  scope: string;
  token_type: string;
  expiry_date: number;
}
```

This file defines a `Credentials` interface that we want to generate a Zod schema for.

### 2. Create a Generation Script

Next, create a script (e.g., `scripts/gen.ts` or `scripts/gen.js`) that will use the `generateZod` function.

**`scripts/gen.ts` (or `scripts/gen.js`)**

```ts
// scripts/gen.ts or scripts/gen.js

import { generateZod, ts } from '@culur/generate-zod'; // Or use require for .js files

async function main() {
  // Wrap in an async function if using top-level await isn't supported in your Node version/setup for .js
  await generateZod(
    {
      // Define the output file path as a key
      'src/types/credentials.zod.ts': {
        // Specify the input files and the types/interfaces to process from them
        inputFiles: {
          'src/types/credentials.ts': ['Credentials'], // Process 'Credentials' from 'src/types/credentials.ts'
        },
        // Optionally, specify types for which to generate 'isYourType' predicate functions
        validateTypes: ['Credentials'],
        // Optionally, add custom import lines at the top of the generated file
        // The `ts` helper is useful for multi-line strings.
        customImport: ts` import type { Credentials } from './credentials'; `,
      },
      // You can define more output files here
    } /*, {
    // Optional: pass custom options here, e.g.:
    // postCommands: (outputFile) => [`echo "Generated ${outputFile}"`]
  }*/,
  );

  console.log('Zod schemas generated successfully!');
}

main().catch(console.error); // Call the main function and catch errors
```

**Explanation of the `generateZod` configuration:**

- **`'src/types/credentials.zod.ts'`**: This is the _output file path_ where the generated Zod schema will be saved.
- **`inputFiles`**: An object where:
  - Keys are paths to your _input TypeScript files_ (e.g., `'src/types/credentials.ts'`).
  - Values are arrays of strings, specifying the _names of the interfaces, types, or enums_ you want to generate schemas for from that input file (e.g., `['Credentials']`).
- **`validateTypes`**: An array of type names (which must be among those listed in `inputFiles`) for which you want to generate `isYourType` helper functions (e.g., `isCredentials`).
- **`customImport`**: A string (often using the `ts` template literal for readability) to prepend custom import statements to the generated file. This is useful for importing the original TypeScript types if needed for type annotations in the generated `isYourType` functions or for other utility types.
- The `ts` helper (an alias for `dedent`) is provided for conveniently writing multi-line strings, especially for `customImport`.

### 3. Run the Generation Script

You typically run this script using Node.js. It's common practice to add it to the `scripts` section of your `package.json`:

**`package.json`**

```json
{
  "name": "your-project",
  "version": "1.0.0",
  "scripts": {
    "gen:zod": "tsx scripts/gen.ts"
    // or if using a .js file and plain Node.js:
    // "gen:zod": "node scripts/gen.js"
  },
  "devDependencies": {
    "@culur/generate-zod": "latest", // ensure it's installed
    "tsx": "latest", // if using TypeScript for your script
    "typescript": "latest" // if using TypeScript
    // ... other dependencies
  }
}
```

- If your script is a TypeScript file (`.ts`), you'll need a runner like `tsx` or `ts-node`. `tsx` is a modern, fast option.
- If your script is a JavaScript file (`.js`), you can run it directly with `node`.

Now, you can execute the script from your terminal:

```bash
npm run gen:zod
# or
yarn gen:zod
# or
pnpm gen:zod
```

### 4. Generated Output

After running the script, the specified output file will be created (or overwritten). Based on the example above, `src/types/credentials.zod.ts` would look like this:

**`src/types/credentials.zod.ts` (Generated File)**

```ts
// src/types/credentials.zod.ts
import type { Credentials } from './credentials'; // From your customImport
import { isValidAgainstSchema } from '@culur/generate-zod'; // Default import for predicate helper
import { z } from 'zod'; // Default Zod import

// Generated Zod schema for the Credentials interface
export const credentialsSchema = z.object({
  access_token: z.string(),
  scope: z.string(),
  token_type: z.string(),
  expiry_date: z.number(),
});

// Generated type predicate function because 'Credentials' was in 'validateTypes'
export const isCredentials =
  isValidAgainstSchema<Credentials>(credentialsSchema);
```

This generated file includes:

- The `credentialsSchema` Zod object.
- The `isCredentials` type predicate function, which uses the `isValidAgainstSchema` helper (imported by default) and the `Credentials` type (imported via your `customImport`).

You can now import and use `credentialsSchema` and `isCredentials` in your application for runtime data validation.

## 🗃️ Changelog

See [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## 🔒 License

See [LICENSE](../../LICENSE) for license rights and limitations (MIT).
