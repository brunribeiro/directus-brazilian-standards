import * as t from '../type/index.mjs';
import { Module } from './runtime.mjs';
/** `[Experimental]` Parses a TypeScript annotation into a TypeBox type but does not infer schematics */
// prettier-ignore
export function NoInfer(...args) {
    const withContext = typeof args[0] === 'string' ? false : true;
    const [context, code, options] = withContext ? [args[0], args[1], args[2] || {}] : [{}, args[0], args[1] || {}];
    const result = Module.Parse('Type', code, context)[0];
    return t.KindGuard.IsSchema(result)
        ? t.CloneType(result, options)
        : t.Never(options);
}
/** `[Experimental]` Parses a TypeScript annotation into a TypeBox type */
export function Syntax(...args) {
    return NoInfer.apply(null, args);
}
/**
 * @deprecated Use Syntax() function
 */
export function Parse(...args) {
    return NoInfer.apply(null, args);
}
/**
 * @deprecated Use NoInfer() function
 */
export function ParseOnly(...args) {
    return NoInfer.apply(null, args);
}
