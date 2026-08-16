import type { CallExpression } from 'estree-jsx';
import type { PluginOptions } from '../prettier';
import { handleCvaClassValue } from '../handle-node/handle-cva-class-value';

/** Processes base class value (params[0]) in a `cva(...)` call. */
export function handleTargetCvaBase(
  cva: CallExpression,
  options: PluginOptions,
): void {
  const base = cva.arguments[0];

  // Base argument does not exist or is a SpreadElement (...args)
  if (!base || base.type === 'SpreadElement') return;

  // Transform base class value (string literal, function call, or array)
  cva.arguments[0] = handleCvaClassValue(base, options);
}
