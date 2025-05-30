"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const index_1 = require("../parser/index");
const t = require("../type/index");
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
const GenericArgumentList = index_1.Runtime.Union([
    index_1.Runtime.Tuple([index_1.Runtime.Ident(), index_1.Runtime.Const(Comma), index_1.Runtime.Ref('GenericArgumentList')]),
    index_1.Runtime.Tuple([index_1.Runtime.Ident(), index_1.Runtime.Const(Comma)]),
    index_1.Runtime.Tuple([index_1.Runtime.Ident()]),
    index_1.Runtime.Tuple([]),
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
const GenericArguments = index_1.Runtime.Tuple([
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('GenericArgumentList'),
    index_1.Runtime.Const(RAngle),
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
const GenericReference = index_1.Runtime.Tuple([
    index_1.Runtime.Ident(),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Elements'),
    index_1.Runtime.Const(RAngle)
], (results, context) => GenericReferenceMapping(results, context));
// ------------------------------------------------------------------
// Reference
// ------------------------------------------------------------------
function ReferenceMapping(result, context) {
    const target = Dereference(context, result);
    return target;
}
// prettier-ignore
const Reference = index_1.Runtime.Ident((result, context) => ReferenceMapping(result, context));
// ------------------------------------------------------------------
// Literal
// ------------------------------------------------------------------
// prettier-ignore
const Literal = index_1.Runtime.Union([
    index_1.Runtime.Union([index_1.Runtime.Const('true'), index_1.Runtime.Const('false')], value => t.Literal(value === 'true')),
    index_1.Runtime.Number(value => t.Literal(parseFloat(value))),
    index_1.Runtime.String([SingleQuote, DoubleQuote, Tilde], value => t.Literal(value))
]);
// ------------------------------------------------------------------
// Keyword
// ------------------------------------------------------------------
// prettier-ignore
const Keyword = index_1.Runtime.Union([
    index_1.Runtime.Const('any', index_1.Runtime.As(t.Any())),
    index_1.Runtime.Const('bigint', index_1.Runtime.As(t.BigInt())),
    index_1.Runtime.Const('boolean', index_1.Runtime.As(t.Boolean())),
    index_1.Runtime.Const('integer', index_1.Runtime.As(t.Integer())),
    index_1.Runtime.Const('never', index_1.Runtime.As(t.Never())),
    index_1.Runtime.Const('null', index_1.Runtime.As(t.Null())),
    index_1.Runtime.Const('number', index_1.Runtime.As(t.Number())),
    index_1.Runtime.Const('string', index_1.Runtime.As(t.String())),
    index_1.Runtime.Const('symbol', index_1.Runtime.As(t.Symbol())),
    index_1.Runtime.Const('undefined', index_1.Runtime.As(t.Undefined())),
    index_1.Runtime.Const('unknown', index_1.Runtime.As(t.Unknown())),
    index_1.Runtime.Const('void', index_1.Runtime.As(t.Void())),
]);
// ------------------------------------------------------------------
// KeyOf
// ------------------------------------------------------------------
// prettier-ignore
const KeyOfMapping = (values) => (values.length > 0);
// prettier-ignore
const KeyOf = index_1.Runtime.Union([
    index_1.Runtime.Tuple([index_1.Runtime.Const('keyof')]), index_1.Runtime.Tuple([])
], KeyOfMapping);
// ------------------------------------------------------------------
// IndexArray
// ------------------------------------------------------------------
// prettier-ignore
const IndexArrayMapping = (values) => (values.length === 4 ? [[values[1]], ...values[3]] :
    values.length === 3 ? [[], ...values[2]] :
        []);
// prettier-ignore
const IndexArray = index_1.Runtime.Union([
    index_1.Runtime.Tuple([index_1.Runtime.Const(LBracket), index_1.Runtime.Ref('Type'), index_1.Runtime.Const(RBracket), index_1.Runtime.Ref('IndexArray')]),
    index_1.Runtime.Tuple([index_1.Runtime.Const(LBracket), index_1.Runtime.Const(RBracket), index_1.Runtime.Ref('IndexArray')]),
    index_1.Runtime.Tuple([])
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
const Extends = index_1.Runtime.Union([
    index_1.Runtime.Tuple([index_1.Runtime.Const('extends'), index_1.Runtime.Ref('Type'), index_1.Runtime.Const(Question), index_1.Runtime.Ref('Type'), index_1.Runtime.Const(Colon), index_1.Runtime.Ref('Type')]),
    index_1.Runtime.Tuple([])
], ExtendsMapping);
// ------------------------------------------------------------------
// Base
// ------------------------------------------------------------------
// prettier-ignore
const BaseMapping = (values) => {
    return values.length === 3 ? values[1] : values[0];
};
// prettier-ignore
const Base = index_1.Runtime.Union([
    index_1.Runtime.Tuple([
        index_1.Runtime.Const(LParen),
        index_1.Runtime.Ref('Type'),
        index_1.Runtime.Const(RParen)
    ]),
    index_1.Runtime.Tuple([index_1.Runtime.Union([
            index_1.Runtime.Ref('Literal'),
            index_1.Runtime.Ref('Keyword'),
            index_1.Runtime.Ref('Object'),
            index_1.Runtime.Ref('Tuple'),
            index_1.Runtime.Ref('Constructor'),
            index_1.Runtime.Ref('Function'),
            index_1.Runtime.Ref('Mapped'),
            index_1.Runtime.Ref('AsyncIterator'),
            index_1.Runtime.Ref('Iterator'),
            index_1.Runtime.Ref('ConstructorParameters'),
            index_1.Runtime.Ref('FunctionParameters'),
            index_1.Runtime.Ref('InstanceType'),
            index_1.Runtime.Ref('ReturnType'),
            index_1.Runtime.Ref('Argument'),
            index_1.Runtime.Ref('Awaited'),
            index_1.Runtime.Ref('Array'),
            index_1.Runtime.Ref('Record'),
            index_1.Runtime.Ref('Promise'),
            index_1.Runtime.Ref('Partial'),
            index_1.Runtime.Ref('Required'),
            index_1.Runtime.Ref('Pick'),
            index_1.Runtime.Ref('Omit'),
            index_1.Runtime.Ref('Exclude'),
            index_1.Runtime.Ref('Extract'),
            index_1.Runtime.Ref('Uppercase'),
            index_1.Runtime.Ref('Lowercase'),
            index_1.Runtime.Ref('Capitalize'),
            index_1.Runtime.Ref('Uncapitalize'),
            index_1.Runtime.Ref('Date'),
            index_1.Runtime.Ref('Uint8Array'),
            index_1.Runtime.Ref('GenericReference'),
            index_1.Runtime.Ref('Reference')
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
const Factor = index_1.Runtime.Tuple([
    index_1.Runtime.Ref('KeyOf'),
    index_1.Runtime.Ref('Base'),
    index_1.Runtime.Ref('IndexArray'),
    index_1.Runtime.Ref('Extends')
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
const ExprTermTail = index_1.Runtime.Union([
    index_1.Runtime.Tuple([index_1.Runtime.Const('&'), index_1.Runtime.Ref('Factor'), index_1.Runtime.Ref('ExprTermTail')]),
    index_1.Runtime.Tuple([])
]);
// prettier-ignore
const ExprTerm = index_1.Runtime.Tuple([
    index_1.Runtime.Ref('Factor'), index_1.Runtime.Ref('ExprTermTail')
], value => ExprBinaryMapping(...value));
// prettier-ignore
const ExprTail = index_1.Runtime.Union([
    index_1.Runtime.Tuple([index_1.Runtime.Const('|'), index_1.Runtime.Ref('ExprTerm'), index_1.Runtime.Ref('ExprTail')]),
    index_1.Runtime.Tuple([])
]);
// prettier-ignore
const Expr = index_1.Runtime.Tuple([
    index_1.Runtime.Ref('ExprTerm'), index_1.Runtime.Ref('ExprTail')
], value => ExprBinaryMapping(...value));
// ------------------------------------------------------------------
// Type
// ------------------------------------------------------------------
// prettier-ignore
const Type = index_1.Runtime.Union([
    index_1.Runtime.Context(index_1.Runtime.Ref('GenericArguments'), index_1.Runtime.Ref('Expr')),
    index_1.Runtime.Ref('Expr')
]);
// ------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------
const PropertyKey = index_1.Runtime.Union([index_1.Runtime.Ident(), index_1.Runtime.String([SingleQuote, DoubleQuote])]);
const Readonly = index_1.Runtime.Union([index_1.Runtime.Tuple([index_1.Runtime.Const('readonly')]), index_1.Runtime.Tuple([])], (value) => value.length > 0);
const Optional = index_1.Runtime.Union([index_1.Runtime.Tuple([index_1.Runtime.Const(Question)]), index_1.Runtime.Tuple([])], (value) => value.length > 0);
// prettier-ignore
const PropertyMapping = (IsReadonly, Key, IsOptional, _, Type) => ({
    [Key]: (IsReadonly && IsOptional ? t.ReadonlyOptional(Type) :
        IsReadonly && !IsOptional ? t.Readonly(Type) :
            !IsReadonly && IsOptional ? t.Optional(Type) :
                Type)
});
// prettier-ignore
const Property = index_1.Runtime.Tuple([
    index_1.Runtime.Ref('Readonly'),
    index_1.Runtime.Ref('PropertyKey'),
    index_1.Runtime.Ref('Optional'),
    index_1.Runtime.Const(Colon),
    index_1.Runtime.Ref('Type'),
], value => PropertyMapping(...value));
// prettier-ignore
const PropertyDelimiter = index_1.Runtime.Union([
    index_1.Runtime.Tuple([index_1.Runtime.Const(Comma), index_1.Runtime.Const(Newline)]),
    index_1.Runtime.Tuple([index_1.Runtime.Const(SemiColon), index_1.Runtime.Const(Newline)]),
    index_1.Runtime.Tuple([index_1.Runtime.Const(Comma)]),
    index_1.Runtime.Tuple([index_1.Runtime.Const(SemiColon)]),
    index_1.Runtime.Tuple([index_1.Runtime.Const(Newline)]),
]);
// prettier-ignore
const Properties = index_1.Runtime.Union([
    index_1.Runtime.Tuple([index_1.Runtime.Ref('Property'), index_1.Runtime.Ref('PropertyDelimiter'), index_1.Runtime.Ref('Properties')]),
    index_1.Runtime.Tuple([index_1.Runtime.Ref('Property'), index_1.Runtime.Ref('PropertyDelimiter')]),
    index_1.Runtime.Tuple([index_1.Runtime.Ref('Property')]),
    index_1.Runtime.Tuple([])
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
const _Object = index_1.Runtime.Tuple([
    index_1.Runtime.Const(LBrace),
    index_1.Runtime.Ref('Properties'),
    index_1.Runtime.Const(RBrace)
], values => ObjectMapping(...values));
// ------------------------------------------------------------------
// Tuple
// ------------------------------------------------------------------
// prettier-ignore
const Elements = index_1.Runtime.Union([
    index_1.Runtime.Tuple([index_1.Runtime.Ref('Type'), index_1.Runtime.Const(Comma), index_1.Runtime.Ref('Elements')]),
    index_1.Runtime.Tuple([index_1.Runtime.Ref('Type'), index_1.Runtime.Const(Comma)]),
    index_1.Runtime.Tuple([index_1.Runtime.Ref('Type')]),
    index_1.Runtime.Tuple([]),
], value => (value.length === 3 ? [value[0], ...value[2]] :
    value.length === 2 ? [value[0]] :
        value.length === 1 ? [value[0]] :
            []));
// prettier-ignore
const Tuple = index_1.Runtime.Tuple([
    index_1.Runtime.Const(LBracket),
    index_1.Runtime.Ref('Elements'),
    index_1.Runtime.Const(RBracket)
], value => t.Tuple(value[1]));
// ------------------------------------------------------------------
// Parameters
// ------------------------------------------------------------------
// prettier-ignore
const Parameter = index_1.Runtime.Tuple([
    index_1.Runtime.Ident(), index_1.Runtime.Const(Colon), index_1.Runtime.Ref('Type')
], value => value[2]);
// prettier-ignore
const Parameters = index_1.Runtime.Union([
    index_1.Runtime.Tuple([index_1.Runtime.Ref('Parameter'), index_1.Runtime.Const(Comma), index_1.Runtime.Ref('Parameters')]),
    index_1.Runtime.Tuple([index_1.Runtime.Ref('Parameter'), index_1.Runtime.Const(Comma)]),
    index_1.Runtime.Tuple([index_1.Runtime.Ref('Parameter')]),
    index_1.Runtime.Tuple([]),
], value => (value.length === 3 ? [value[0], ...value[2]] :
    value.length === 2 ? [value[0]] :
        value.length === 1 ? [value[0]] :
            []));
// ------------------------------------------------------------------
// Constructor
// ------------------------------------------------------------------
// prettier-ignore
const Constructor = index_1.Runtime.Tuple([
    index_1.Runtime.Const('new'),
    index_1.Runtime.Const(LParen),
    index_1.Runtime.Ref('Parameters'),
    index_1.Runtime.Const(RParen),
    index_1.Runtime.Const('=>'),
    index_1.Runtime.Ref('Type')
], value => t.Constructor(value[2], value[5]));
// ------------------------------------------------------------------
// Function
// ------------------------------------------------------------------
// prettier-ignore
const Function = index_1.Runtime.Tuple([
    index_1.Runtime.Const(LParen),
    index_1.Runtime.Ref('Parameters'),
    index_1.Runtime.Const(RParen),
    index_1.Runtime.Const('=>'),
    index_1.Runtime.Ref('Type')
], value => t.Function(value[1], value[4]));
// ------------------------------------------------------------------
// Mapped (requires deferred types)
// ------------------------------------------------------------------
// prettier-ignore
const MappedMapping = (values) => {
    return t.Literal('Mapped types not supported');
};
// prettier-ignore
const Mapped = index_1.Runtime.Tuple([
    index_1.Runtime.Const(LBrace),
    index_1.Runtime.Const(LBracket),
    index_1.Runtime.Ident(),
    index_1.Runtime.Const('in'),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RBracket),
    index_1.Runtime.Const(Colon),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RBrace)
], MappedMapping);
// ------------------------------------------------------------------
// AsyncIterator
// ------------------------------------------------------------------
// prettier-ignore
const AsyncIterator = index_1.Runtime.Tuple([
    index_1.Runtime.Const('AsyncIterator'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => t.AsyncIterator(value[2]));
// ------------------------------------------------------------------
// Iterator
// ------------------------------------------------------------------
// prettier-ignore
const Iterator = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Iterator'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => t.Iterator(value[2]));
// ------------------------------------------------------------------
// ConstructorParameters
// ------------------------------------------------------------------
// prettier-ignore
const ConstructorParameters = index_1.Runtime.Tuple([
    index_1.Runtime.Const('ConstructorParameters'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => t.ConstructorParameters(value[2]));
// ------------------------------------------------------------------
// Parameters
// ------------------------------------------------------------------
// prettier-ignore
const FunctionParameters = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Parameters'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => t.Parameters(value[2]));
// ------------------------------------------------------------------
// InstanceType
// ------------------------------------------------------------------
// prettier-ignore
const InstanceType = index_1.Runtime.Tuple([
    index_1.Runtime.Const('InstanceType'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => t.InstanceType(value[2]));
// ------------------------------------------------------------------
// ReturnType
// ------------------------------------------------------------------
// prettier-ignore
const ReturnType = index_1.Runtime.Tuple([
    index_1.Runtime.Const('ReturnType'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => t.ReturnType(value[2]));
// ------------------------------------------------------------------
// Argument
// ------------------------------------------------------------------
// prettier-ignore
const Argument = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Argument'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], results => {
    return t.KindGuard.IsLiteralNumber(results[2])
        ? t.Argument(Math.trunc(results[2].const))
        : t.Never();
});
// ------------------------------------------------------------------
// Awaited
// ------------------------------------------------------------------
// prettier-ignore
const Awaited = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Awaited'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => t.Awaited(value[2]));
// ------------------------------------------------------------------
// Array
// ------------------------------------------------------------------
// prettier-ignore
const Array = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Array'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => t.Array(value[2]));
// ------------------------------------------------------------------
// Record
// ------------------------------------------------------------------
// prettier-ignore
const Record = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Record'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(Comma),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => t.Record(value[2], value[4]));
// ------------------------------------------------------------------
// Promise
// ------------------------------------------------------------------
// prettier-ignore
const Promise = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Promise'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => t.Promise(value[2]));
// ------------------------------------------------------------------
// Partial
// ------------------------------------------------------------------
// prettier-ignore
const Partial = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Partial'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => t.Partial(value[2]));
// ------------------------------------------------------------------
// Required
// ------------------------------------------------------------------
// prettier-ignore
const Required = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Required'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => t.Required(value[2]));
// ------------------------------------------------------------------
// Pick
// ------------------------------------------------------------------
// prettier-ignore
const Pick = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Pick'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(Comma),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => t.Pick(value[2], value[4]));
// ------------------------------------------------------------------
// Omit
// ------------------------------------------------------------------
// prettier-ignore
const Omit = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Omit'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(Comma),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => t.Omit(value[2], value[4]));
// ------------------------------------------------------------------
// Exclude
// ------------------------------------------------------------------
// prettier-ignore
const Exclude = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Exclude'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(Comma),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => t.Exclude(value[2], value[4]));
// ------------------------------------------------------------------
// Extract
// ------------------------------------------------------------------
// prettier-ignore
const Extract = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Extract'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(Comma),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => t.Extract(value[2], value[4]));
// ------------------------------------------------------------------
// Uppercase
// ------------------------------------------------------------------
// prettier-ignore
const Uppercase = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Uppercase'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => t.Uppercase(value[2]));
// ------------------------------------------------------------------
// Lowercase
// ------------------------------------------------------------------
// prettier-ignore
const Lowercase = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Lowercase'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => t.Lowercase(value[2]));
// ------------------------------------------------------------------
// Capitalize
// ------------------------------------------------------------------
// prettier-ignore
const Capitalize = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Capitalize'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => t.Capitalize(value[2]));
// ------------------------------------------------------------------
// Uncapitalize
// ------------------------------------------------------------------
// prettier-ignore
const Uncapitalize = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Uncapitalize'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => t.Uncapitalize(value[2]));
// ------------------------------------------------------------------
// Date
// ------------------------------------------------------------------
const Date = index_1.Runtime.Const('Date', index_1.Runtime.As(t.Date()));
// ------------------------------------------------------------------
// Uint8Array
// ------------------------------------------------------------------
const Uint8Array = index_1.Runtime.Const('Uint8Array', index_1.Runtime.As(t.Uint8Array()));
// ------------------------------------------------------------------
// Module
// ------------------------------------------------------------------
// prettier-ignore
exports.Module = new index_1.Runtime.Module({
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
