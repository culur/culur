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

/** Processes `compoundVariants[*].class` and `compoundVariants[*].className` in `cva(...)`. */
export function handleTargetCvaCompoundVariants(
  config: ObjectExpression,
  options: PluginOptions,
): void {
  // Find the 'compoundVariants' property on the cva config object
  const cvProp = config.properties.find(property =>
    isStaticProperty(property, 'compoundVariants'),
  );

  // Return early if 'compoundVariants' is missing or not an array
  if (!cvProp || !isArrayExpression(cvProp.value)) return;

  // Process each compound variant object entry
  for (const element of cvProp.value.elements) {
    if (!element || !isObjectExpression(element)) continue;

    for (const prop of element.properties) {
      // Only target 'class' or 'className' properties containing transformable class expressions
      if (
        (!isStaticProperty(prop, 'class') &&
          !isStaticProperty(prop, 'className')) ||
        (!isStringLiteral(prop.value) &&
          !isCallExpression(prop.value) &&
          !isArrayExpression(prop.value))
      ) {
        continue;
      }

      // Transform class value (string literal, function call, or array)
      prop.value = handleCvaClassValue(prop.value, options);
    }
  }
}
