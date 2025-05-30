import * as t from '../type/index.mjs';
import { Static } from '../parser/index.mjs';
import { Type } from './static.mjs';
/** `[Experimental]` Parses a TypeScript annotation into a TypeBox type but does not infer schematics */
export declare function NoInfer<Context extends Record<PropertyKey, t.TSchema>, Code extends string>(context: Context, code: Code, options?: t.SchemaOptions): t.TSchema;
/** `[Experimental]` Parses a TypeScript annotation into a TypeBox type but does not infer schematics */
export declare function NoInfer<Code extends string>(code: Code, options?: t.SchemaOptions): t.TSchema;
/** `[Experimental]` Parses a TypeScript annotation into a TypeBox type */
export type TSyntax<Context extends Record<PropertyKey, t.TSchema>, Code extends string> = (Static.Parse<Type, Code, Context> extends [infer Type extends t.TSchema, string] ? Type : t.TNever);
/** `[Experimental]` Parses a TypeScript annotation into a TypeBox type */
export declare function Syntax<Context extends Record<PropertyKey, t.TSchema>, Annotation extends string>(context: Context, annotation: Annotation, options?: t.SchemaOptions): TSyntax<Context, Annotation>;
/** `[Experimental]` Parses a TypeScript annotation into a TypeBox type */
export declare function Syntax<Annotation extends string>(annotation: Annotation, options?: t.SchemaOptions): TSyntax<{}, Annotation>;
/**
 * @deprecated Use Syntax() function
 */
export declare function Parse<Context extends Record<PropertyKey, t.TSchema>, Annotation extends string>(context: Context, annotation: Annotation, options?: t.SchemaOptions): TSyntax<Context, Annotation>;
/**
 * @deprecated Use Syntax() function
 */
export declare function Parse<Annotation extends string>(annotation: Annotation, options?: t.SchemaOptions): TSyntax<{}, Annotation>;
/**
 * @deprecated Use NoInfer() function
 */
export declare function ParseOnly<Context extends Record<PropertyKey, t.TSchema>, Code extends string>(context: Context, code: Code, options?: t.SchemaOptions): t.TSchema | undefined;
/**
 * @deprecated Use NoInfer() function
 */
export declare function ParseOnly<Code extends string>(code: Code, options?: t.SchemaOptions): t.TSchema | undefined;
