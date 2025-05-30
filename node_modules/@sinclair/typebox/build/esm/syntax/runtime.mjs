import { Runtime } from '../parser/index.mjs';
import * as t from '../type/index.mjs';
// ------------------------------------------------------------------
// Tokens
// ------------------------------------------------------------------
const Newline = '\n';
const LBracket = '[';
const RBracket = ']';
const LParen = '(';
const RParen = ')';
const LBrace = '{';
const RBrace = '}';
const LAngle = '<';
const RAngle = '>';
const Question = '?';
const Colon = ':';
const Comma = ',';
const SemiColon = ';';
const SingleQuote = "'";
const DoubleQuote = '"';
const Tilde = '`';
const Equals = '=';
// ------------------------------------------------------------------
// DestructureRight
// ------------------------------------------------------------------
// prettier-ignore
function DestructureRight(values) {
    return (values.length > 0)
        ? [values.slice(0, values.length - 1), values[values.length - 1]]
        : [values, undefined];
}
// ------------------------------------------------------------------
// Dereference
// ------------------------------------------------------------------
const Dereference = (context, key) => {
    return key in context ? context[key] : t.Ref(key);
};
// ------------------------------------------------------------------
// GenericArgumentList
// ------------------------------------------------------------------
// prettier-ignore
const GenericArgumentListMapping = (results) => {
    return (results.length === 3 ? [results[0], ...results[2]] :
        results.length === 2 ? [results[0]] :
            results.length === 1 ? [results[0]] :
                []);
};
// prettier-ignore
const GenericArgumentList = Runtime.Union([
    Runtime.Tuple([Runtime.Ident(), Runtime.Const(Comma), Runtime.Ref('GenericArgumentList')]),
    Runtime.Tuple([Runtime.Ident(), Runtime.Const(Comma)]),
    Runtime.Tuple([Runtime.Ident()]),
    Runtime.Tuple([]),
], (results) => GenericArgumentListMapping(results));
// ------------------------------------------------------------------
// GenericArguments
// ------------------------------------------------------------------
// prettier-ignore
const GenericArgumentsContext = (args, context) => {
    return args.reduce((result, arg, index) => {
        return { ...result, [arg]: t.Argument(index) };
    }, context);
};
// prettier-ignore
const GenericArgumentsMapping = (results, context) => {
    return results.length === 3
        ? GenericArgumentsContext(results[1], context)
        : {};
};
// prettier-ignore
const GenericArguments = Runtime.Tuple([
    Runtime.Const(LAngle),
    Runtime.Ref('GenericArgumentList'),
    Runtime.Const(RAngle),
], (results, context) => GenericArgumentsMapping(results, context));
// ------------------------------------------------------------------
// GenericReference
// ------------------------------------------------------------------
function GenericReferenceMapping(results, context) {
    const type = Dereference(context, results[0]);
    const args = results[2];
    return t.Instantiate(type, args);
}
// prettier-ignore
const GenericReference = Runtime.Tuple([
    Runtime.Ident(),
    Runtime.Const(LAngle),
    Runtime.Ref('Elements'),
    Runtime.Const(RAngle)
], (results, context) => GenericReferenceMapping(results, context));
// ------------------------------------------------------------------
// Reference
// ------------------------------------------------------------------
function ReferenceMapping(result, context) {
    const target = Dereference(context, result);
    return target;
}
// prettier-ignore
const Reference = Runtime.Ident((result, context) => ReferenceMapping(result, context));
// ------------------------------------------------------------------
// Literal
// ------------------------------------------------------------------
// prettier-ignore
const Literal = Runtime.Union([
    Runtime.Union([Runtime.Const('true'), Runtime.Const('false')], value => t.Literal(value === 'true')),
    Runtime.Number(value => t.Literal(parseFloat(value))),
    Runtime.String([SingleQuote, DoubleQuote, Tilde], value => t.Literal(value))
]);
// ------------------------------------------------------------------
// Keyword
// ------------------------------------------------------------------
// prettier-ignore
const Keyword = Runtime.Union([
    Runtime.Const('any', Runtime.As(t.Any())),
    Runtime.Const('bigint', Runtime.As(t.BigInt())),
    Runtime.Const('boolean', Runtime.As(t.Boolean())),
    Runtime.Const('integer', Runtime.As(t.Integer())),
    Runtime.Const('never', Runtime.As(t.Never())),
    Runtime.Const('null', Runtime.As(t.Null())),
    Runtime.Const('number', Runtime.As(t.Number())),
    Runtime.Const('string', Runtime.As(t.String())),
    Runtime.Const('symbol', Runtime.As(t.Symbol())),
    Runtime.Const('undefined', Runtime.As(t.Undefined())),
    Runtime.Const('unknown', Runtime.As(t.Unknown())),
    Runtime.Const('void', Runtime.As(t.Void())),
]);
// ------------------------------------------------------------------
// KeyOf
// ------------------------------------------------------------------
// prettier-ignore
const KeyOfMapping = (values) => (values.length > 0);
// prettier-ignore
const KeyOf = Runtime.Union([
    Runtime.Tuple([Runtime.Const('keyof')]), Runtime.Tuple([])
], KeyOfMapping);
// ------------------------------------------------------------------
// IndexArray
// ------------------------------------------------------------------
// prettier-ignore
const IndexArrayMapping = (values) => (values.length === 4 ? [[values[1]], ...values[3]] :
    values.length === 3 ? [[], ...values[2]] :
        []);
// prettier-ignore
const IndexArray = Runtime.Union([
    Runtime.Tuple([Runtime.Const(LBracket), Runtime.Ref('Type'), Runtime.Const(RBracket), Runtime.Ref('IndexArray')]),
    Runtime.Tuple([Runtime.Const(LBracket), Runtime.Const(RBracket), Runtime.Ref('IndexArray')]),
    Runtime.Tuple([])
], value => IndexArrayMapping(value));
// ------------------------------------------------------------------
// Extends
// ------------------------------------------------------------------
// prettier-ignore
const ExtendsMapping = (values) => {
    return values.length === 6
        ? [values[1], values[3], values[5]]
        : [];
};
// prettier-ignore
const Extends = Runtime.Union([
    Runtime.Tuple([Runtime.Const('extends'), Runtime.Ref('Type'), Runtime.Const(Question), Runtime.Ref('Type'), Runtime.Const(Colon), Runtime.Ref('Type')]),
    Runtime.Tuple([])
], ExtendsMapping);
// ------------------------------------------------------------------
// Base
// ------------------------------------------------------------------
// prettier-ignore
const BaseMapping = (values) => {
    return values.length === 3 ? values[1] : values[0];
};
// prettier-ignore
const Base = Runtime.Union([
    Runtime.Tuple([
        Runtime.Const(LParen),
        Runtime.Ref('Type'),
        Runtime.Const(RParen)
    ]),
    Runtime.Tuple([Runtime.Union([
            Runtime.Ref('Literal'),
            Runtime.Ref('Keyword'),
            Runtime.Ref('Object'),
            Runtime.Ref('Tuple'),
            Runtime.Ref('Constructor'),
            Runtime.Ref('Function'),
            Runtime.Ref('Mapped'),
            Runtime.Ref('AsyncIterator'),
            Runtime.Ref('Iterator'),
            Runtime.Ref('ConstructorParameters'),
            Runtime.Ref('FunctionParameters'),
            Runtime.Ref('InstanceType'),
            Runtime.Ref('ReturnType'),
            Runtime.Ref('Argument'),
            Runtime.Ref('Awaited'),
            Runtime.Ref('Array'),
            Runtime.Ref('Record'),
            Runtime.Ref('Promise'),
            Runtime.Ref('Partial'),
            Runtime.Ref('Required'),
            Runtime.Ref('Pick'),
            Runtime.Ref('Omit'),
            Runtime.Ref('Exclude'),
            Runtime.Ref('Extract'),
            Runtime.Ref('Uppercase'),
            Runtime.Ref('Lowercase'),
            Runtime.Ref('Capitalize'),
            Runtime.Ref('Uncapitalize'),
            Runtime.Ref('Date'),
            Runtime.Ref('Uint8Array'),
            Runtime.Ref('GenericReference'),
            Runtime.Ref('Reference')
        ])])
], BaseMapping);
// ------------------------------------------------------------------
// Factor
// ------------------------------------------------------------------
// prettier-ignore
const FactorExtends = (Type, Extends) => {
    return Extends.length === 3
        ? t.Extends(Type, Extends[0], Extends[1], Extends[2])
        : Type;
};
// prettier-ignore
const FactorIndexArray = (Type, IndexArray) => {
    const [Left, Right] = DestructureRight(IndexArray);
    return (!t.ValueGuard.IsUndefined(Right) ? (
    // note: Indexed types require reimplementation to replace `[number]` indexers
    Right.length === 1 ? t.Index(FactorIndexArray(Type, Left), Right[0]) :
        Right.length === 0 ? t.Array(FactorIndexArray(Type, Left)) :
            t.Never()) : Type);
};
// prettier-ignore
const FactorMapping = (KeyOf, Type, IndexArray, Extends) => {
    return KeyOf
        ? FactorExtends(t.KeyOf(FactorIndexArray(Type, IndexArray)), Extends)
        : FactorExtends(FactorIndexArray(Type, IndexArray), Extends);
};
// prettier-ignore
const Factor = Runtime.Tuple([
    Runtime.Ref('KeyOf'),
    Runtime.Ref('Base'),
    Runtime.Ref('IndexArray'),
    Runtime.Ref('Extends')
], values => FactorMapping(...values));
// ------------------------------------------------------------------
// Expr
// ------------------------------------------------------------------
// prettier-ignore
function ExprBinaryMapping(Left, Rest) {
    return (Rest.length === 3 ? (() => {
        const [Operator, Right, Next] = Rest;
        const Schema = ExprBinaryMapping(Right, Next);
        if (Operator === '&') {
            return t.TypeGuard.IsIntersect(Schema)
                ? t.Intersect([Left, ...Schema.allOf])
                : t.Intersect([Left, Schema]);
        }
        if (Operator === '|') {
            return t.TypeGuard.IsUnion(Schema)
                ? t.Union([Left, ...Schema.anyOf])
                : t.Union([Left, Schema]);
        }
        throw 1;
    })() : Left);
}
// prettier-ignore
const ExprTermTail = Runtime.Union([
    Runtime.Tuple([Runtime.Const('&'), Runtime.Ref('Factor'), Runtime.Ref('ExprTermTail')]),
    Runtime.Tuple([])
]);
// prettier-ignore
const ExprTerm = Runtime.Tuple([
    Runtime.Ref('Factor'), Runtime.Ref('ExprTermTail')
], value => ExprBinaryMapping(...value));
// prettier-ignore
const ExprTail = Runtime.Union([
    Runtime.Tuple([Runtime.Const('|'), Runtime.Ref('ExprTerm'), Runtime.Ref('ExprTail')]),
    Runtime.Tuple([])
]);
// prettier-ignore
const Expr = Runtime.Tuple([
    Runtime.Ref('ExprTerm'), Runtime.Ref('ExprTail')
], value => ExprBinaryMapping(...value));
// ------------------------------------------------------------------
// Type
// ------------------------------------------------------------------
// prettier-ignore
const Type = Runtime.Union([
    Runtime.Context(Runtime.Ref('GenericArguments'), Runtime.Ref('Expr')),
    Runtime.Ref('Expr')
]);
// ------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------
const PropertyKey = Runtime.Union([Runtime.Ident(), Runtime.String([SingleQuote, DoubleQuote])]);
const Readonly = Runtime.Union([Runtime.Tuple([Runtime.Const('readonly')]), Runtime.Tuple([])], (value) => value.length > 0);
const Optional = Runtime.Union([Runtime.Tuple([Runtime.Const(Question)]), Runtime.Tuple([])], (value) => value.length > 0);
// prettier-ignore
const PropertyMapping = (IsReadonly, Key, IsOptional, _, Type) => ({
    [Key]: (IsReadonly && IsOptional ? t.ReadonlyOptional(Type) :
        IsReadonly && !IsOptional ? t.Readonly(Type) :
            !IsReadonly && IsOptional ? t.Optional(Type) :
                Type)
});
// prettier-ignore
const Property = Runtime.Tuple([
    Runtime.Ref('Readonly'),
    Runtime.Ref('PropertyKey'),
    Runtime.Ref('Optional'),
    Runtime.Const(Colon),
    Runtime.Ref('Type'),
], value => PropertyMapping(...value));
// prettier-ignore
const PropertyDelimiter = Runtime.Union([
    Runtime.Tuple([Runtime.Const(Comma), Runtime.Const(Newline)]),
    Runtime.Tuple([Runtime.Const(SemiColon), Runtime.Const(Newline)]),
    Runtime.Tuple([Runtime.Const(Comma)]),
    Runtime.Tuple([Runtime.Const(SemiColon)]),
    Runtime.Tuple([Runtime.Const(Newline)]),
]);
// prettier-ignore
const Properties = Runtime.Union([
    Runtime.Tuple([Runtime.Ref('Property'), Runtime.Ref('PropertyDelimiter'), Runtime.Ref('Properties')]),
    Runtime.Tuple([Runtime.Ref('Property'), Runtime.Ref('PropertyDelimiter')]),
    Runtime.Tuple([Runtime.Ref('Property')]),
    Runtime.Tuple([])
], values => (values.length === 3 ? { ...values[0], ...values[2] } :
    values.length === 2 ? values[0] :
        values.length === 1 ? values[0] :
            {}));
// ------------------------------------------------------------------
// Object
// ------------------------------------------------------------------
// prettier-ignore
const ObjectMapping = (_0, Properties, _2) => t.Object(Properties);
// prettier-ignore
const _Object = Runtime.Tuple([
    Runtime.Const(LBrace),
    Runtime.Ref('Properties'),
    Runtime.Const(RBrace)
], values => ObjectMapping(...values));
// ------------------------------------------------------------------
// Tuple
// ------------------------------------------------------------------
// prettier-ignore
const Elements = Runtime.Union([
    Runtime.Tuple([Runtime.Ref('Type'), Runtime.Const(Comma), Runtime.Ref('Elements')]),
    Runtime.Tuple([Runtime.Ref('Type'), Runtime.Const(Comma)]),
    Runtime.Tuple([Runtime.Ref('Type')]),
    Runtime.Tuple([]),
], value => (value.length === 3 ? [value[0], ...value[2]] :
    value.length === 2 ? [value[0]] :
        value.length === 1 ? [value[0]] :
            []));
// prettier-ignore
const Tuple = Runtime.Tuple([
    Runtime.Const(LBracket),
    Runtime.Ref('Elements'),
    Runtime.Const(RBracket)
], value => t.Tuple(value[1]));
// ------------------------------------------------------------------
// Parameters
// ------------------------------------------------------------------
// prettier-ignore
const Parameter = Runtime.Tuple([
    Runtime.Ident(), Runtime.Const(Colon), Runtime.Ref('Type')
], value => value[2]);
// prettier-ignore
const Parameters = Runtime.Union([
    Runtime.Tuple([Runtime.Ref('Parameter'), Runtime.Const(Comma), Runtime.Ref('Parameters')]),
    Runtime.Tuple([Runtime.Ref('Parameter'), Runtime.Const(Comma)]),
    Runtime.Tuple([Runtime.Ref('Parameter')]),
    Runtime.Tuple([]),
], value => (value.length === 3 ? [value[0], ...value[2]] :
    value.length === 2 ? [value[0]] :
        value.length === 1 ? [value[0]] :
            []));
// ------------------------------------------------------------------
// Constructor
// ------------------------------------------------------------------
// prettier-ignore
const Constructor = Runtime.Tuple([
    Runtime.Const('new'),
    Runtime.Const(LParen),
    Runtime.Ref('Parameters'),
    Runtime.Const(RParen),
    Runtime.Const('=>'),
    Runtime.Ref('Type')
], value => t.Constructor(value[2], value[5]));
// ------------------------------------------------------------------
// Function
// ------------------------------------------------------------------
// prettier-ignore
const Function = Runtime.Tuple([
    Runtime.Const(LParen),
    Runtime.Ref('Parameters'),
    Runtime.Const(RParen),
    Runtime.Const('=>'),
    Runtime.Ref('Type')
], value => t.Function(value[1], value[4]));
// ------------------------------------------------------------------
// Mapped (requires deferred types)
// ------------------------------------------------------------------
// prettier-ignore
const MappedMapping = (values) => {
    return t.Literal('Mapped types not supported');
};
// prettier-ignore
const Mapped = Runtime.Tuple([
    Runtime.Const(LBrace),
    Runtime.Const(LBracket),
    Runtime.Ident(),
    Runtime.Const('in'),
    Runtime.Ref('Type'),
    Runtime.Const(RBracket),
    Runtime.Const(Colon),
    Runtime.Ref('Type'),
    Runtime.Const(RBrace)
], MappedMapping);
// ------------------------------------------------------------------
// AsyncIterator
// ------------------------------------------------------------------
// prettier-ignore
const AsyncIterator = Runtime.Tuple([
    Runtime.Const('AsyncIterator'),
    Runtime.Const(LAngle),
    Runtime.Ref('Type'),
    Runtime.Const(RAngle),
], value => t.AsyncIterator(value[2]));
// ------------------------------------------------------------------
// Iterator
// ------------------------------------------------------------------
// prettier-ignore
const Iterator = Runtime.Tuple([
    Runtime.Const('Iterator'),
    Runtime.Const(LAngle),
    Runtime.Ref('Type'),
    Runtime.Const(RAngle),
], value => t.Iterator(value[2]));
// ------------------------------------------------------------------
// ConstructorParameters
// ------------------------------------------------------------------
// prettier-ignore
const ConstructorParameters = Runtime.Tuple([
    Runtime.Const('ConstructorParameters'),
    Runtime.Const(LAngle),
    Runtime.Ref('Type'),
    Runtime.Const(RAngle),
], value => t.ConstructorParameters(value[2]));
// ------------------------------------------------------------------
// Parameters
// ------------------------------------------------------------------
// prettier-ignore
const FunctionParameters = Runtime.Tuple([
    Runtime.Const('Parameters'),
    Runtime.Const(LAngle),
    Runtime.Ref('Type'),
    Runtime.Const(RAngle),
], value => t.Parameters(value[2]));
// ------------------------------------------------------------------
// InstanceType
// ------------------------------------------------------------------
// prettier-ignore
const InstanceType = Runtime.Tuple([
    Runtime.Const('InstanceType'),
    Runtime.Const(LAngle),
    Runtime.Ref('Type'),
    Runtime.Const(RAngle),
], value => t.InstanceType(value[2]));
// ------------------------------------------------------------------
// ReturnType
// ------------------------------------------------------------------
// prettier-ignore
const ReturnType = Runtime.Tuple([
    Runtime.Const('ReturnType'),
    Runtime.Const(LAngle),
    Runtime.Ref('Type'),
    Runtime.Const(RAngle),
], value => t.ReturnType(value[2]));
// ------------------------------------------------------------------
// Argument
// ------------------------------------------------------------------
// prettier-ignore
const Argument = Runtime.Tuple([
    Runtime.Const('Argument'),
    Runtime.Const(LAngle),
    Runtime.Ref('Type'),
    Runtime.Const(RAngle),
], results => {
    return t.KindGuard.IsLiteralNumber(results[2])
        ? t.Argument(Math.trunc(results[2].const))
        : t.Never();
});
// ------------------------------------------------------------------
// Awaited
// ------------------------------------------------------------------
// prettier-ignore
const Awaited = Runtime.Tuple([
    Runtime.Const('Awaited'),
    Runtime.Const(LAngle),
    Runtime.Ref('Type'),
    Runtime.Const(RAngle),
], value => t.Awaited(value[2]));
// ------------------------------------------------------------------
// Array
// ------------------------------------------------------------------
// prettier-ignore
const Array = Runtime.Tuple([
    Runtime.Const('Array'),
    Runtime.Const(LAngle),
    Runtime.Ref('Type'),
    Runtime.Const(RAngle),
], value => t.Array(value[2]));
// ------------------------------------------------------------------
// Record
// ------------------------------------------------------------------
// prettier-ignore
const Record = Runtime.Tuple([
    Runtime.Const('Record'),
    Runtime.Const(LAngle),
    Runtime.Ref('Type'),
    Runtime.Const(Comma),
    Runtime.Ref('Type'),
    Runtime.Const(RAngle),
], value => t.Record(value[2], value[4]));
// ------------------------------------------------------------------
// Promise
// ------------------------------------------------------------------
// prettier-ignore
const Promise = Runtime.Tuple([
    Runtime.Const('Promise'),
    Runtime.Const(LAngle),
    Runtime.Ref('Type'),
    Runtime.Const(RAngle),
], value => t.Promise(value[2]));
// ------------------------------------------------------------------
// Partial
// ------------------------------------------------------------------
// prettier-ignore
const Partial = Runtime.Tuple([
    Runtime.Const('Partial'),
    Runtime.Const(LAngle),
    Runtime.Ref('Type'),
    Runtime.Const(RAngle),
], value => t.Partial(value[2]));
// ------------------------------------------------------------------
// Required
// ------------------------------------------------------------------
// prettier-ignore
const Required = Runtime.Tuple([
    Runtime.Const('Required'),
    Runtime.Const(LAngle),
    Runtime.Ref('Type'),
    Runtime.Const(RAngle),
], value => t.Required(value[2]));
// ------------------------------------------------------------------
// Pick
// ------------------------------------------------------------------
// prettier-ignore
const Pick = Runtime.Tuple([
    Runtime.Const('Pick'),
    Runtime.Const(LAngle),
    Runtime.Ref('Type'),
    Runtime.Const(Comma),
    Runtime.Ref('Type'),
    Runtime.Const(RAngle),
], value => t.Pick(value[2], value[4]));
// ------------------------------------------------------------------
// Omit
// ------------------------------------------------------------------
// prettier-ignore
const Omit = Runtime.Tuple([
    Runtime.Const('Omit'),
    Runtime.Const(LAngle),
    Runtime.Ref('Type'),
    Runtime.Const(Comma),
    Runtime.Ref('Type'),
    Runtime.Const(RAngle),
], value => t.Omit(value[2], value[4]));
// ------------------------------------------------------------------
// Exclude
// ------------------------------------------------------------------
// prettier-ignore
const Exclude = Runtime.Tuple([
    Runtime.Const('Exclude'),
    Runtime.Const(LAngle),
    Runtime.Ref('Type'),
    Runtime.Const(Comma),
    Runtime.Ref('Type'),
    Runtime.Const(RAngle),
], value => t.Exclude(value[2], value[4]));
// ------------------------------------------------------------------
// Extract
// ------------------------------------------------------------------
// prettier-ignore
const Extract = Runtime.Tuple([
    Runtime.Const('Extract'),
    Runtime.Const(LAngle),
    Runtime.Ref('Type'),
    Runtime.Const(Comma),
    Runtime.Ref('Type'),
    Runtime.Const(RAngle),
], value => t.Extract(value[2], value[4]));
// ------------------------------------------------------------------
// Uppercase
// ------------------------------------------------------------------
// prettier-ignore
const Uppercase = Runtime.Tuple([
    Runtime.Const('Uppercase'),
    Runtime.Const(LAngle),
    Runtime.Ref('Type'),
    Runtime.Const(RAngle),
], value => t.Uppercase(value[2]));
// ------------------------------------------------------------------
// Lowercase
// ------------------------------------------------------------------
// prettier-ignore
const Lowercase = Runtime.Tuple([
    Runtime.Const('Lowercase'),
    Runtime.Const(LAngle),
    Runtime.Ref('Type'),
    Runtime.Const(RAngle),
], value => t.Lowercase(value[2]));
// ------------------------------------------------------------------
// Capitalize
// ------------------------------------------------------------------
// prettier-ignore
const Capitalize = Runtime.Tuple([
    Runtime.Const('Capitalize'),
    Runtime.Const(LAngle),
    Runtime.Ref('Type'),
    Runtime.Const(RAngle),
], value => t.Capitalize(value[2]));
// ------------------------------------------------------------------
// Uncapitalize
// ------------------------------------------------------------------
// prettier-ignore
const Uncapitalize = Runtime.Tuple([
    Runtime.Const('Uncapitalize'),
    Runtime.Const(LAngle),
    Runtime.Ref('Type'),
    Runtime.Const(RAngle),
], value => t.Uncapitalize(value[2]));
// ------------------------------------------------------------------
// Date
// ------------------------------------------------------------------
const Date = Runtime.Const('Date', Runtime.As(t.Date()));
// ------------------------------------------------------------------
// Uint8Array
// ------------------------------------------------------------------
const Uint8Array = Runtime.Const('Uint8Array', Runtime.As(t.Uint8Array()));
// ------------------------------------------------------------------
// Module
// ------------------------------------------------------------------
// prettier-ignore
export const Module = new Runtime.Module({
    // ----------------------------------------------------------------
    // Generics
    // ----------------------------------------------------------------
    GenericArgumentList,
    GenericArguments,
    // ----------------------------------------------------------------
    // Type
    // ----------------------------------------------------------------
    Literal,
    Keyword,
    KeyOf,
    IndexArray,
    Extends,
    Base,
    Factor,
    ExprTermTail,
    ExprTerm,
    ExprTail,
    Expr,
    Type,
    PropertyKey,
    Readonly,
    Optional,
    Property,
    PropertyDelimiter,
    Properties,
    Object: _Object,
    Elements,
    Tuple,
    Parameter,
    Function,
    Parameters,
    Constructor,
    Mapped,
    AsyncIterator,
    Iterator,
    Argument,
    Awaited,
    Array,
    Record,
    Promise,
    ConstructorParameters,
    FunctionParameters,
    InstanceType,
    ReturnType,
    Partial,
    Required,
    Pick,
    Omit,
    Exclude,
    Extract,
    Uppercase,
    Lowercase,
    Capitalize,
    Uncapitalize,
    Date,
    Uint8Array,
    GenericReference,
    Reference,
});
