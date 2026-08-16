import type { ObjectExpression } from 'estree-jsx';
import type { PluginOptions } from '../prettier';
import {
  isArrayExpression,
  isCallExpression,
  isObjectExpression,
  isStaticProperty,
  isStringLiteral,
} from '../ast';
import { handleCvaClassValue } from '../handle-node/handle-cva-class-value';

/** Processes `variants[*][*]` (all leaf option values) in `cva(...)`. */
export function handleTargetCvaVariants(
  config: ObjectExpression,
  options: PluginOptions,
): void {
  // Find the 'variants' property on the cva config object
  const variantsProp = config.properties.find(p =>
    isStaticProperty(p, 'variants'),
  );

  // Return early if 'variants' is missing or not an object
  if (!variantsProp || !isObjectExpression(variantsProp.value)) return;

  // Traverse each variant group (e.g. `intent: { primary: "...", secondary: "..." }`)
  for (const variantProp of variantsProp.value.properties) {
    if (
      !isStaticProperty(variantProp) ||
      !isObjectExpression(variantProp.value)
    ) {
      continue;
    }

    // Traverse each option within the variant (e.g. `primary: "..."`)
    for (const optionProp of variantProp.value.properties) {
      // Only process properties with valid static keys and transformable values
      if (
        !isStaticProperty(optionProp) ||
        (!isStringLiteral(optionProp.value) &&
          !isCallExpression(optionProp.value) &&
          !isArrayExpression(optionProp.value))
      ) {
        continue;
      }

      // Transform option class value (string literal, function call, or array)
      optionProp.value = handleCvaClassValue(optionProp.value, options);
    }
  }
}
