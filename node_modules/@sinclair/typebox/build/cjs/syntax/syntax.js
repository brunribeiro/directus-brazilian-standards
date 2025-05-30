"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NoInfer = NoInfer;
exports.Syntax = Syntax;
exports.Parse = Parse;
exports.ParseOnly = ParseOnly;
const t = require("../type/index");
const runtime_1 = require("./runtime");
/** `[Experimental]` Parses a TypeScript annotation into a TypeBox type but does not infer schematics */
// prettier-ignore
function NoInfer(...args) {
    const withContext = typeof args[0] === 'string' ? false : true;
    const [context, code, options] = withContext ? [args[0], args[1], args[2] || {}] : [{}, args[0], args[1] || {}];
    const result = runtime_1.Module.Parse('Type', code, context)[0];
    return t.KindGuard.IsSchema(result)
        ? t.CloneType(result, options)
        : t.Never(options);
}
/** `[Experimental]` Parses a TypeScript annotation into a TypeBox type */
function Syntax(...args) {
    return NoInfer.apply(null, args);
}
/**
 * @deprecated Use Syntax() function
 */
function Parse(...args) {
    return NoInfer.apply(null, args);
}
/**
 * @deprecated Use NoInfer() function
 */
function ParseOnly(...args) {
    return NoInfer.apply(null, args);
}
