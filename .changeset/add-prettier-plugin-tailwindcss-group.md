---
'@culur/prettier-plugin-tailwindcss-group': minor
---

Initialize `@culur/prettier-plugin-tailwindcss-group` Prettier plugin.

- **Intelligent Tailwind CSS Class Grouping**: Automatically splits and groups long utility class strings into 14 logical CSS categories (Layout, Typography, Backgrounds, Borders, Effects, Transitions, Interactivity, SVG, etc.) based on `tailwind-merge` class groups and sorted by `prettier-plugin-tailwindcss` compiler order.
- **Category & Modifier Threshold Pipeline**: Separates base classes and modifier variants within each category, keeping compact variants on the same line (`≤ modifierThreshold`) or splitting into dedicated variant clusters (`> modifierThreshold`).
- **Comprehensive Target Support**:
  - **JSX/TSX Attributes**: Formats `className` and custom attributes ending with `ClassName` / `className` (e.g. `wrapperClassName`, `containerClassName`).
  - **Object Properties**: Formats helper calls within objects (e.g. `{ className: cn(...) }`), preserving the function call wrapper.
  - **Class Variance Authority (`cva`)**: Formats base classes, variant options, and compound variant definitions (`class` / `className`) across string, array, and function formats.
- **Short String Simplification**: Automatically simplifies redundant single-line expressions (e.g. `{"..."}`, `['...']`, or `cn('...')`) back to plain static strings when under `classNameThreshold`.
- **Dynamic Expression Organization**: Reorganizes static class strings to the front while preserving dynamic expressions, conditionals, and object arguments in `cn(...)`.
- **Comment Preservation (Bail-Out Strategy)**: Safely detects and preserves code comments (`//` and `/* ... */`) by bailing out on commented nodes, avoiding Prettier `"Comment was not printed"` errors.
- **Configurable Options**:
  - `classNameThreshold`: Threshold of class names to trigger wrapping (default: `10`).
  - `modifierThreshold`: Threshold of modifier classes per category before splitting into separate lines (default: `2`).
  - `tailwindFunctions`: List of custom helper function names to format (default: `['cn']`).
