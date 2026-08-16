# `@culur/prettier-plugin-tailwindcss-group`

[![NPM Version](https://img.shields.io/npm/v/@culur/prettier-plugin-tailwindcss-group?logo=npm)](https://www.npmjs.com/package/@culur/prettier-plugin-tailwindcss-group)
[![NPM Download](https://img.shields.io/npm/dm/@culur/prettier-plugin-tailwindcss-group?logo=npm)](https://www.npmjs.com/package/@culur/prettier-plugin-tailwindcss-group)
[![NPM License](https://img.shields.io/npm/l/@culur/prettier-plugin-tailwindcss-group)](../../LICENSE)

[![CodeFactor](https://www.codefactor.io/repository/github/culur/culur/badge)](https://www.codefactor.io/repository/github/culur/culur)
[![Codecov](https://img.shields.io/codecov/c/github/culur/culur)](https://app.codecov.io/gh/culur/culur)
[![Build and release](https://github.com/culur/culur/actions/workflows/build-and-release.yml/badge.svg)](https://github.com/culur/culur/actions/workflows/build-and-release.yml)

> Prettier plugin to automatically group, format, and simplify Tailwind CSS class names across JSX attributes, object properties, and CVA variant definitions.

## ✨ Features

This plugin enforces a clean and consistent structure for Tailwind CSS classes. It provides:

- **Automatic Grouping:** Automatically breaks down long class strings into logically grouped arguments by utility category (Layout, Typography, Visuals, etc.).
- **Multi-Target Support:** Formats JSX attributes (`className`, `wrapperClassName`), object properties (`className`, `wrapperclassName`), and `cva()` parameters from `class-variance-authority` (commonly used in `shadcn/ui`).
- **Redundancy Simplification:** Flattens unnecessary wrapper functions into pure strings if they are under the threshold.
- **Comment Preservation:** Safely detects and preserves code comments (`//` and `/* ... */`) by bailing out on commented nodes to avoid Prettier `"Comment was not printed"` errors.
- **Idempotency & Compatibility:** Strictly manipulates the Prettier AST. The output is fully compliant with standard Prettier formatting and integrates flawlessly with `prettier-plugin-tailwindcss`.

## 💿 Installation

Add `@culur/prettier-plugin-tailwindcss-group` and `prettier-plugin-tailwindcss` to your project. `prettier-plugin-tailwindcss` is a required peer dependency used to resolve official Tailwind CSS compiler sorting and variant hierarchies.

> [!NOTE]
> **No need to install `tailwind-merge`:** The required `tailwind-merge` engine is already bundled directly inside `@culur/prettier-plugin-tailwindcss-group`. You do **not** need to install `tailwind-merge` as a separate dependency unless your application code directly imports utility functions like `twMerge()` or `cn()`.

```bash
# Using npm
npm install @culur/prettier-plugin-tailwindcss-group prettier-plugin-tailwindcss --save-dev

# Using pnpm
pnpm install @culur/prettier-plugin-tailwindcss-group prettier-plugin-tailwindcss --save-dev

# Using yarn
yarn add @culur/prettier-plugin-tailwindcss-group prettier-plugin-tailwindcss --dev

# Using bun
bun add @culur/prettier-plugin-tailwindcss-group prettier-plugin-tailwindcss --dev
```

_Note: You also need `prettier` (>=3.0.0) installed in your project._

## 📖 Usage & Integration

Add to your `.prettierrc` configuration:

```json
{
  "plugins": [
    "@culur/prettier-plugin-tailwindcss-group",
    "prettier-plugin-tailwindcss"
  ],
  "classNameThreshold": 10,
  "modifierThreshold": 2,
  "tailwindFunctions": ["cn"]
}
```

Both plugins share the `tailwindFunctions` configuration option, so helper functions like `cn()` or `clsx()` are sorted and grouped seamlessly.

## ⚙️ Options

| Option               | Type       | Default  | Description                                                                                                                                                                      |
| -------------------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `classNameThreshold` | `int`      | `10`     | Threshold of class names (split by whitespace) to trigger wrapping.                                                                                                              |
| `modifierThreshold`  | `int`      | `2`      | Threshold of modifier/variant classes within a category before splitting into separate lines.                                                                                    |
| `tailwindFunctions`  | `string[]` | `["cn"]` | List of helper function names. The first element is used as default wrapper function. **Note:** `tailwindFunctions` is also an official option of `prettier-plugin-tailwindcss`. |

## 📐 Formatting Rules & Concepts

This plugin inspects AST nodes to find valid styling targets and applies formatting rules.

### 🔠 Representation Modes

Depending on the target context and rule thresholds, class strings are represented in one of the following AST forms:

- **StringLiteral:** A raw static string literal `"class-1 class-2"`.

  ```tsx
  // JSX Attribute
  <div className="flex items-center" />;

  // CVA Parameter
  const button = cva('flex items-center');
  ```

- **ExpressionStringLiteral:** A JSX expression container wrapping a single string literal `{"class-1 class-2"}` (JSX Attributes only).

  ```tsx
  <div className={'flex items-center'} />
  ```

- **ExpressionCall:** A helper function call such as `{cn('class-1 class-2')}` (JSX Attributes) or `cn('class-1 class-2')` (Object Properties / CVA Parameters).

  ```tsx
  // JSX Attribute Expression Call
  <div className={cn('flex items-center')} />;

  // Object Property Expression Call
  const config = { className: cn('flex items-center') };
  ```

- **ExpressionArrayString:** An array literal containing string items `['class-1', 'class-2']` (used in CVA parameters).

  ```ts
  const button = cva([
    'flex items-center justify-center',
    'bg-white shadow-sm',
  ]);
  ```

---

### 🎯 Supported Targets

The plugin automatically identifies and formats the following targets in your codebase:

- **JSX Attributes:** Attributes named `className` or ending with a case-sensitive suffix `ClassName` (e.g. `wrapperClassName`, `containerClassName`, `headerClassName`).
  - **Attribute Pattern Matching:** Matched using strict suffix matching (`ends with 'ClassName'`). Exact names like `className`, `wrapperClassName`, and `containerClassName` match, whereas uppercase variants like `CLASSNAME` or unrelated attributes like `class` / `id` are ignored.
  - **Bypassed Cases:** Attributes with no value (e.g. `<div className />`) or empty strings (`className=""`) are safely bypassed without transformation.
  - **Generated Modes:** **StringLiteral** or **ExpressionCall** based on the class count threshold.

  ```tsx
  <button
    className="flex items-center p-4"
    containerClassName="bg-white shadow-sm"
  />
  ```

- **Object Properties:** Static properties named `className` or ending with `<prefix>ClassName` / `<prefix>className` (case-sensitive, e.g., `wrapperClassName`, `innerclassName`).
  - **Generated Modes:** **ExpressionCall** only.

  > **Note:** Formatted **only** when calling a helper function in `tailwindFunctions` (e.g. `cn(...)`) to avoid false positives on non-CSS properties. The `ExpressionCall` wrapper is intentionally preserved (never simplified to `StringLiteral`) so you can freely add classes later without manual re-wrapping, and sorting plugins continue to work seamlessly. Computed keys are not supported.

  ```ts
  const styles = {
    // Formatted because it calls cn(...)
    className: cn(
      'flex items-center text-sm font-bold',
      isActive && 'bg-blue-500',
    ),
    wrapperClassName: cn('bg-white shadow-sm'),
  };
  ```

- **CVA Function Calls:** Arguments inside `cva(...)` functions from `class-variance-authority` (commonly used in libraries like `shadcn/ui`):
  - Base classes: `params[0]`
  - Variant classes: `params[1]['variants'][<variant_name>][<option_name>]`
  - Compound variant classes: `params[1]['compoundVariants'][<index>]['class']` or `['className']`
  - **Ignored / Non-Class Keys:** Configuration objects like `defaultVariants` (which define variant option identifiers) and condition selector keys inside `compoundVariants` (such as `intent: 'primary'`, `size: 'small'`) are non-class properties and are strictly left untouched.
  - **Spread Elements:** When `cva` is called with a spread config (e.g. `cva(base, ...spreadConfig)`), the plugin formats `params[0]` (base classes) and safely skips `...spreadConfig` since dynamic objects cannot be statically grouped at format time.
  - **Generated Modes:** **StringLiteral**, **ExpressionArrayString**, or **ExpressionCall** based on the input node type and class count threshold.

  > **Note:** Matches direct `cva(...)` function calls. Aliased imports (e.g. `import { cva as createVariants }`) are intentionally not tracked to maintain high performance and simplicity without requiring complex AST scope analysis.

  ```ts
  import { cva } from 'class-variance-authority';

  const buttonVariants = cva(
    'flex items-center justify-center rounded-md text-sm font-medium', // params[0]
    {
      variants: {
        variant: {
          default: 'bg-primary text-primary-foreground hover:bg-primary/90', // params[1]['variants']['variant']['default']
          outline: ['border border-input bg-background hover:bg-accent'],
        },
      },
      compoundVariants: [
        {
          intent: 'primary',
          disabled: false,
          class: 'hover:bg-blue-600', // params[1]['compoundVariants'][0]['class']
        },
      ],
      defaultVariants: {
        intent: 'primary',
        size: 'medium',
        disabled: false,
      },
    },
  );
  ```

---

### ⚡ Core Rules

#### 1. Short String Simplification (`≤ classNameThreshold`)

Targets with class count `≤ classNameThreshold` are simplified back to **StringLiteral** format. Redundant expressions like `{"..."}`, `['...']`, or `cn('...')` containing a single static string under the threshold are simplified to plain strings.

<!-- test-case: rule-1-short-strings-jsx-expression -->

**Before:**

```jsx
<div className={'flex items-center'} />
```

**After:**

```jsx
<div className="flex items-center" />
```

<!-- test-case: rule-1-short-strings-function-call -->

**Before:**

```jsx
<div className={cn('flex', 'items-center')} />
```

**After:**

```jsx
<div className="flex items-center" />
```

---

#### 2. Automatic Grouping (`> classNameThreshold`)

When static classes exceed `classNameThreshold`, the string is automatically converted to grouped arguments based on target context:

- **JSX Attributes & Object Properties:** Converted to **ExpressionCall** format (`cn(...)`).
- **CVA Parameters (`params[0]`, `variants`, `compoundVariants`):** Converted to **ExpressionArrayString** format (`['group-1', 'group-2']`) for strings/arrays, or preserved as **ExpressionCall** (`cn('group-1', 'group-2', ...)`) with grouped arguments.

<!-- test-case: rule-2-automatic-grouping classNameThreshold=4 -->

**Before:**

```jsx
<div className="flex items-center justify-center text-sm font-bold bg-white shadow-md border-gray-200" />
```

**After:**

```jsx
<div
  className={cn(
    'flex items-center justify-center',
    'text-sm font-bold',
    'bg-white',
    'border-gray-200 shadow-md',
  )}
/>
```

---

#### 3. Argument Organization & CVA Handling

- **JSX Attributes & Object Properties:** In **ExpressionCall** formats like `cn(...)` containing dynamic arguments (conditionals, variables, objects), static class strings are grouped and moved to the **front**, while dynamic arguments remain at the **end**.
- **Supported Wrapper Argument Structure:**
  The plugin optimizes **flat argument lists** of the form `cn(string, string, dynamicExpression, ...)`. It does **not** unpack or recursively extract static class strings from complex nested static structures supported by libraries like `clsx`:

  ```ts
  // ❌ Complex / nested array syntax from clsx is NOT unpacked:
  clsx(['foo', 0, false, 'bar']);
  clsx(['foo'], ['', 0, false, 'bar'], [['baz', [['hello'], 'there']]]);
  ```

  Any argument that is not a direct static `StringLiteral` (such as an array literal `[...]` or object literal `{...}` passed into `cn(...)`) is treated as a dynamic argument and preserved at the end of the argument list.

- **CVA Parameters (`params[0]`, `variants`, `compoundVariants`):**
  CVA class values are transformed based on their node type:
  - **StringLiteral:**
    - `≤ classNameThreshold` ➔ **StringLiteral** (`"class-1 class-2"`)
    - `> classNameThreshold` ➔ **ExpressionArrayString** (`['group-1', 'group-2']`)
  - **ExpressionArrayString (`['...']`):**
    - `≤ classNameThreshold` ➔ **StringLiteral** (`"class-1 class-2"`) (if all static)
    - `> classNameThreshold` ➔ **ExpressionArrayString** (`['group-1', 'group-2']`) (static strings grouped)
  - **ExpressionCall (`cn(...)`):**
    - `≤ classNameThreshold` ➔ **StringLiteral** (`"class-1 class-2"`) (if all static)
    - `> classNameThreshold` ➔ **ExpressionCall** (`cn('group-1', 'group-2', ...)`) (arguments grouped and organized)
  - **Dynamic Expressions** (e.g. `[isActive && 'bg-blue-500']` without static strings) ➔ **Preserved**.

> [!WARNING]
> **Warning on `tailwind-merge` class precedence:** Moving static string arguments to the front changes argument evaluation order in `cn()` / `clsx()`. If you rely on `tailwind-merge` to resolve overlapping classes between static strings and dynamic expressions, dynamic arguments placed at the end will now override static classes placed at the front. Ensure there are no conflicting Tailwind utility classes between static and dynamic arguments.

<!-- test-case: rule-3-argument-organization classNameThreshold=4 -->

**Before:**

```tsx
<div
  className={cn(
    isActive && 'bg-blue-500',
    'flex items-center text-sm font-bold',
    { 'opacity-50': disabled },
    'p-4',
  )}
/>
```

**After:**

```tsx
<div
  className={cn(
    'flex items-center',
    'p-4',
    'text-sm font-bold',
    isActive && 'bg-blue-500',
    { 'opacity-50': disabled },
  )}
/>
```

---

#### 4. Comment Preservation (Bail-Out Strategy)

To prevent code corruption and avoid Prettier's `"Comment was not printed"` syntax errors, the plugin adopts a strict **Bail-Out Strategy** whenever comments (`//` or `/* ... */`) are detected inside class expressions or arguments being formatted:

- **Bail-Out Behavior:** If any static string literal or function argument contains attached leading, trailing, or inline comments (e.g. inside `className={cn(...)}`, `className=/* ... */"..."`, or `cva([...])`), the plugin immediately **skips transformation** for that target.
- **Comment Integrity:** The original AST structure is preserved untouched, ensuring Prettier and `prettier-plugin-tailwindcss` can safely print all comments in their exact intended positions.
- **Outside Comments:** Comments placed outside the formatted arguments (e.g. above JSX attributes or component declarations) do not trigger a bail-out and continue to format normally.

<!-- test-case: rule-4-comment-preservation -->

**Before:**

```tsx
<div
  className={cn(
    // Inner layout comment
    'flex items-center', // Trailing comment
    'bg-red-500 text-white font-bold p-4 shadow-md',
  )}
/>
```

**After (Preserved):**

```tsx
<div
  className={cn(
    // Inner layout comment
    'flex items-center', // Trailing comment
    'bg-red-500 p-4 font-bold text-white shadow-md',
  )}
/>
```

## 🏗️ Core Architecture & Engine Reuse

Under the hood, `@culur/prettier-plugin-tailwindcss-group` coordinates two battle-tested engines to provide zero-guesswork, 100% specification-compliant grouping and sorting:

```txt
                                    Input Classes
                                          │
                    ┌─────────────────────┴─────────────────────┐
                    ▼                                           ▼
      tailwind-merge (Parser Engine)             prettier-plugin-tailwindcss
   ┌───────────────────────────────────┐       ┌─────────────────────────────────────┐
   │ • Resolves base ClassGroup IDs    │       │ • Official Tailwind Compiler Engine │
   │ • Strips postfix modifiers (/50)  │       │ • AST Stylesheet order evaluation   │
   │ • Maps classes to 14 Categories   │       │ • Sorts modifiers (hover, dark, sm) │
   └─────────────────┬─────────────────┘       └──────────────────┬──────────────────┘
                     │                                            │
                     └────────────────────┬───────────────────────┘
                                          ▼
                         Category-First Modifier Pipeline
                     (Threshold Rule: modifierThreshold = 2)
                                          │
                         ┌────────────────┴────────────────┐
                         ▼                                 ▼
              Total Modifiers ≤ 2                 Total Modifiers > 2
         ┌───────────────────────────┐       ┌─────────────────────────────┐
         │ Merge into a single line  │       │ Line 1: Base classes        │
         │ with base classes.        │       │ Line 2..N: Modifier groups  │
         └───────────────────────────┘       └─────────────────────────────┘
```

1. **`tailwind-merge`**: Parses class groups, strips postfix modifiers (such as `group/button` or opacity modifiers `bg-red-500/50`), and reliably classifies utilities into corresponding CSS categories.
2. **`prettier-plugin-tailwindcss`**: Leverages the official Tailwind CSS Compiler AST order to sort all modifiers and variants (`group-hover`, `hover`, `focus`, `dark`, `sm`, `md`, `@container`, etc.) strictly according to Tailwind CSS specificity standards.

### 🔄 AST Traversal & Target Handler Priority

During Prettier AST preprocessing (`walkAst`), each node is checked against target handlers in a prioritized, short-circuiting pipeline:

$$\text{JSX Attributes} \longrightarrow \text{CVA Calls} \longrightarrow \text{Object Properties}$$

Once a target handler matches and formats a node, traversal stops for that node and moves on to child nodes. This deterministic hierarchy ensures no overlapping or conflicting AST transformations.

---

## 🧩 Class Grouping Strategy

When breaking a long `className` string into multiple arguments, the plugin uses a **Category-First + Modifier Threshold Pipeline**:

1. **Category Grouping**: Classes are partitioned into **14 primary categories** (plus 1 Unknown/Custom category for unrecognized or external classes). For the complete ordered category definition and Tailwind CSS utility mappings, see [src/orders/class-groups.ts](src/orders/class-groups.ts).
2. **Base vs. Modifiers**: Within each category, classes without modifiers (base classes) and classes with modifiers (`hover:`, `dark:`, `sm:`, etc.) are separated.
3. **Threshold Decision (`modifierThreshold`, default `2`)**:
   - **`≤ modifierThreshold` (≤ 2 modifiers)**: Modifiers are kept on the **same line** as the base classes for compactness (e.g. `'text-sm font-medium hover:text-blue-600'`).
   - **`> modifierThreshold` (> 2 modifiers)**: Base classes are placed on the **first line**, followed by each modifier variant cluster on its **own line**, sorted by Tailwind's official variant hierarchy.

## 💡 Examples

### Button - [shadcn/ui](https://ui.shadcn.com/docs/components/base/button)

Here is how `@culur/prettier-plugin-tailwindcss-group` automatically formats and groups complex Tailwind utility classes in a `Button` component from Button (using `cva` and `@base-ui/react`):

<!-- test-case: shadcn classNameThreshold=5 modifierThreshold=2 -->

<details>
<summary><strong>Before (Single-line unformatted string)</strong></summary>

```tsx
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
      },
      size: {
        default:
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        icon: 'size-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
```

</details>

<details>
<summary><strong>After (Formatted with Category & Modifier Grouping)</strong></summary>

```tsx
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'group/button',
    'inline-flex shrink-0 items-center justify-center [&_svg]:shrink-0',
    "[&_svg:not([class*='size-'])]:size-4",
    'text-sm font-medium whitespace-nowrap',
    'bg-clip-padding',
    'rounded-lg border border-transparent outline-none',
    'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
    'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
    'dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
    'disabled:opacity-50',
    'transition-all active:not-aria-[haspopup]:translate-y-px',
    'select-none disabled:pointer-events-none [&_svg]:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        outline: [
          'hover:text-foreground aria-expanded:text-foreground',
          'bg-background',
          'hover:bg-muted',
          'aria-expanded:bg-muted',
          'dark:bg-input/30',
          'dark:hover:bg-input/50',
          'border-border dark:border-input',
        ],
        destructive: [
          'text-destructive',
          'bg-destructive/10',
          'hover:bg-destructive/20',
          'dark:bg-destructive/20',
          'dark:hover:bg-destructive/30',
          'focus-visible:border-destructive/40 focus-visible:ring-destructive/20',
          'dark:focus-visible:ring-destructive/40',
        ],
      },
      size: {
        default:
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        sm: [
          'gap-1',
          'h-7 px-2.5',
          'has-data-[icon=inline-end]:pr-1.5',
          'has-data-[icon=inline-start]:pl-1.5',
          "[&_svg:not([class*='size-'])]:size-3.5",
          'text-[0.8rem]',
          'rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        ],
        icon: 'size-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
```

</details>

## 🗃️ Changelog

See [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## 🔒 License

See [LICENSE](../../LICENSE) for license rights and limitations (MIT).
