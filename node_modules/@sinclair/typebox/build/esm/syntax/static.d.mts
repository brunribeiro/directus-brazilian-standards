import { Static } from '../parser/index.mjs';
import * as t from '../type/index.mjs';
type Newline = '\n';
type LBracket = '[';
type RBracket = ']';
type LParen = '(';
type RParen = ')';
type LBrace = '{';
type RBrace = '}';
type LAngle = '<';
type RAngle = '>';
type Question = '?';
type Colon = ':';
type Comma = ',';
type SemiColon = ';';
type SingleQuote = "'";
type DoubleQuote = '"';
type Tilde = '`';
interface DelimitTailMapping<_ = unknown> extends Static.IMapping {
    output: (this['input'] extends [_, infer A, _, infer B, _, infer C, _, infer D, _, infer E, _, infer F, _, infer G, _, infer H, _, infer I, _, infer Rest extends unknown[]] ? [A, B, C, D, E, F, G, H, I, ...Rest] : this['input'] extends [_, infer A, _, infer B, _, infer C, _, infer D, _, infer E, _, infer F, _, infer G, _, infer H, _, infer Rest extends unknown[]] ? [A, B, C, D, E, F, G, H, ...Rest] : this['input'] extends [_, infer A, _, infer B, _, infer C, _, infer D, _, infer E, _, infer F, _, infer G, _, infer Rest extends unknown[]] ? [A, B, C, D, E, F, G, ...Rest] : this['input'] extends [_, infer A, _, infer B, _, infer C, _, infer D, _, infer E, _, infer F, _, infer Rest extends unknown[]] ? [A, B, C, D, E, F, ...Rest] : this['input'] extends [_, infer A, _, infer B, _, infer C, _, infer D, _, infer E, _, infer Rest extends unknown[]] ? [A, B, C, D, E, ...Rest] : this['input'] extends [_, infer A, _, infer B, _, infer C, _, infer D, _, infer Rest extends unknown[]] ? [A, B, C, D, ...Rest] : this['input'] extends [_, infer A, _, infer B, _, infer C, _, infer Rest extends unknown[]] ? [A, B, C, ...Rest] : this['input'] extends [_, infer A, _, infer B, _, infer Rest extends unknown[]] ? [A, B, ...Rest] : this['input'] extends [_, infer A, _, infer Rest extends unknown[]] ? [A, ...Rest] : this['input'] extends [_, infer Rest extends unknown[]] ? [...Rest] : this['input'] extends [_] ? [] : [
    ]);
}
type DelimitTail<T extends Static.IParser, _ extends Static.IParser> = Static.Union<[
    Static.Tuple<[_, T, _, T, _, T, _, T, _, T, _, T, _, T, _, T, _, T, _, Delimit<T, _>]>,
    Static.Tuple<[_, T, _, T, _, T, _, T, _, T, _, T, _, T, _, T, _, Delimit<T, _>]>,
    Static.Tuple<[_, T, _, T, _, T, _, T, _, T, _, T, _, T, _, Delimit<T, _>]>,
    Static.Tuple<[_, T, _, T, _, T, _, T, _, T, _, T, _, Delimit<T, _>]>,
    Static.Tuple<[_, T, _, T, _, T, _, T, _, T, _, Delimit<T, _>]>,
    Static.Tuple<[_, T, _, T, _, T, _, T, _, Delimit<T, _>]>,
    Static.Tuple<[_, T, _, T, _, T, _, Delimit<T, _>]>,
    Static.Tuple<[_, T, _, T, _, Delimit<T, _>]>,
    Static.Tuple<[_, T, _, Delimit<T, _>]>,
    Static.Tuple<[_, Delimit<T, _>]>,
    Static.Tuple<[_]>,
    Static.Tuple<[]>
], DelimitTailMapping>;
interface DelimitMapping extends Static.IMapping {
    output: (this['input'] extends [infer Element extends unknown, infer Rest extends unknown[]] ? [Element, ...Rest] : []);
}
type Delimit<Parser extends Static.IParser, Delimiter extends Static.IParser> = (Static.Union<[
    Static.Tuple<[Parser, DelimitTail<Parser, Delimiter>]>,
    Static.Tuple<[]>
], DelimitMapping>);
type Dereference<Context extends t.TProperties, Ref extends string> = (Ref extends keyof Context ? Context[Ref] : t.TRef<Ref>);
interface GenericArgumentListMapping extends Static.IMapping {
    output: (this['input'] extends [infer Ident extends string, Comma, infer Rest extends unknown[]] ? [Ident, ...Rest] : this['input'] extends [infer Ident extends string, Comma] ? [Ident] : this['input'] extends [infer Ident extends string] ? [Ident] : [
    ]);
}
type GenericArgumentList = Static.Union<[
    Static.Tuple<[Static.Ident, Static.Const<Comma>, GenericArgumentList]>,
    Static.Tuple<[Static.Ident, Static.Const<Comma>]>,
    Static.Tuple<[Static.Ident]>,
    Static.Tuple<[]>
], GenericArgumentListMapping>;
type GenericArgumentsContext<Args extends string[], Context extends t.TProperties, Result extends t.TProperties = {}> = (Args extends [...infer Left extends string[], infer Right extends string] ? GenericArgumentsContext<Left, Context, Result & {
    [_ in Right]: t.TArgument<Left['length']>;
}> : t.Evaluate<Result & Context>);
interface GenericArgumentsMapping extends Static.IMapping {
    output: this['input'] extends [LAngle, infer Args extends string[], RAngle] ? this['context'] extends infer Context extends t.TProperties ? GenericArgumentsContext<Args, Context> : never : never;
}
type GenericArguments = Static.Tuple<[
    Static.Const<LAngle>,
    GenericArgumentList,
    Static.Const<RAngle>
], GenericArgumentsMapping>;
interface GenericReferenceMapping extends Static.IMapping {
    output: this['context'] extends t.TProperties ? this['input'] extends [infer Reference extends string, LAngle, infer Args extends t.TSchema[], RAngle] ? t.TInstantiate<Dereference<this['context'], Reference>, Args> : never : never;
}
type GenericReference = Static.Tuple<[
    Static.Ident,
    Static.Const<LAngle>,
    Elements,
    Static.Const<RAngle>
], GenericReferenceMapping>;
interface ReferenceMapping extends Static.IMapping {
    output: this['context'] extends t.TProperties ? this['input'] extends string ? Dereference<this['context'], this['input']> : never : never;
}
type Reference = Static.Ident<ReferenceMapping>;
interface LiteralBooleanMapping extends Static.IMapping {
    output: this['input'] extends `${infer S extends boolean}` ? t.TLiteral<S> : never;
}
interface LiteralNumberMapping extends Static.IMapping {
    output: this['input'] extends `${infer S extends number}` ? t.TLiteral<S> : never;
}
interface LiteralStringMapping extends Static.IMapping {
    output: this['input'] extends `${infer S extends string}` ? t.TLiteral<S> : never;
}
type Literal = Static.Union<[
    Static.Union<[Static.Const<'true'>, Static.Const<'false'>], LiteralBooleanMapping>,
    Static.Number<LiteralNumberMapping>,
    Static.String<[DoubleQuote, SingleQuote, Tilde], LiteralStringMapping>
]>;
type Keyword = Static.Union<[
    Static.Const<'any', Static.As<t.TAny>>,
    Static.Const<'bigint', Static.As<t.TBigInt>>,
    Static.Const<'boolean', Static.As<t.TBoolean>>,
    Static.Const<'integer', Static.As<t.TInteger>>,
    Static.Const<'never', Static.As<t.TNever>>,
    Static.Const<'null', Static.As<t.TNull>>,
    Static.Const<'number', Static.As<t.TNumber>>,
    Static.Const<'string', Static.As<t.TString>>,
    Static.Const<'symbol', Static.As<t.TSymbol>>,
    Static.Const<'undefined', Static.As<t.TUndefined>>,
    Static.Const<'unknown', Static.As<t.TUnknown>>,
    Static.Const<'void', Static.As<t.TVoid>>
]>;
interface KeyOfMapping extends Static.IMapping {
    output: this['input'] extends [] ? false : true;
}
type KeyOf = Static.Union<[
    Static.Tuple<[Static.Const<'keyof'>]>,
    Static.Tuple<[]>
], KeyOfMapping>;
interface IndexArrayMapping extends Static.IMapping {
    output: (this['input'] extends [LBracket, infer Type extends t.TSchema, RBracket, infer Rest extends unknown[]] ? [[Type], ...Rest] : this['input'] extends [LBracket, RBracket, infer Rest extends unknown[]] ? [[], ...Rest] : [
    ]);
}
type IndexArray = Static.Union<[
    Static.Tuple<[Static.Const<LBracket>, Type, Static.Const<RBracket>, IndexArray]>,
    Static.Tuple<[Static.Const<LBracket>, Static.Const<RBracket>, IndexArray]>,
    Static.Tuple<[]>
], IndexArrayMapping>;
interface ExtendsMapping extends Static.IMapping {
    output: this['input'] extends ['extends', infer Type extends t.TSchema, Question, infer True extends t.TSchema, Colon, infer False extends t.TSchema] ? [Type, True, False] : [];
}
type Extends = Static.Union<[
    Static.Tuple<[Static.Const<'extends'>, Type, Static.Const<Question>, Type, Static.Const<Colon>, Type]>,
    Static.Tuple<[]>
], ExtendsMapping>;
interface BaseMapping extends Static.IMapping {
    output: (this['input'] extends [LParen, infer Type extends t.TSchema, RParen] ? Type : this['input'] extends [infer Type extends t.TSchema] ? Type : never);
}
type Base = Static.Union<[
    Static.Tuple<[
        Static.Const<LParen>,
        Type,
        Static.Const<RParen>
    ]>,
    Static.Tuple<[
        Static.Union<[
            Literal,
            Keyword,
            Object,
            Tuple,
            Function,
            Constructor,
            Mapped,
            AsyncIterator,
            Iterator,
            ConstructorParameters,
            FunctionParameters,
            Argument,
            InstanceType,
            ReturnType,
            Awaited,
            Array,
            Record,
            Promise,
            Partial,
            Required,
            Pick,
            Omit,
            Exclude,
            Extract,
            Lowercase,
            Uppercase,
            Capitalize,
            Uncapitalize,
            Date,
            Uint8Array,
            GenericReference,
            Reference
        ]>
    ]>
], BaseMapping>;
type FactorExtends<Type extends t.TSchema, Extends extends unknown[]> = (Extends extends [infer Right extends t.TSchema, infer True extends t.TSchema, infer False extends t.TSchema] ? t.TExtends<Type, Right, True, False> : Type);
type FactorIndexArray<Type extends t.TSchema, IndexArray extends unknown[]> = (IndexArray extends [...infer Left extends unknown[], infer Right extends t.TSchema[]] ? (Right extends [infer Indexer extends t.TSchema] ? t.TIndex<FactorIndexArray<Type, Left>, t.TIndexPropertyKeys<Indexer>> : Right extends [] ? t.TArray<FactorIndexArray<Type, Left>> : t.TNever) : Type);
interface FactorMapping extends Static.IMapping {
    output: this['input'] extends [infer KeyOf extends boolean, infer Type extends t.TSchema, infer IndexArray extends unknown[], infer Extends extends unknown[]] ? KeyOf extends true ? FactorExtends<t.TKeyOf<FactorIndexArray<Type, IndexArray>>, Extends> : FactorExtends<FactorIndexArray<Type, IndexArray>, Extends> : never;
}
type Factor = Static.Tuple<[
    KeyOf,
    Base,
    IndexArray,
    Extends
], FactorMapping>;
type ExprBinaryReduce<Left extends t.TSchema, Rest extends unknown[]> = (Rest extends [infer Operator extends unknown, infer Right extends t.TSchema, infer Next extends unknown[]] ? (ExprBinaryReduce<Right, Next> extends infer Schema extends t.TSchema ? (Operator extends '&' ? (Schema extends t.TIntersect<infer Types extends t.TSchema[]> ? t.TIntersect<[Left, ...Types]> : t.TIntersect<[Left, Schema]>) : Operator extends '|' ? (Schema extends t.TUnion<infer Types extends t.TSchema[]> ? t.TUnion<[Left, ...Types]> : t.TUnion<[Left, Schema]>) : never) : never) : Left);
interface ExprBinaryMapping extends Static.IMapping {
    output: (this['input'] extends [infer Left extends t.TSchema, infer Rest extends unknown[]] ? ExprBinaryReduce<Left, Rest> : []);
}
type ExprTermTail = Static.Union<[
    Static.Tuple<[Static.Const<'&'>, Factor, ExprTermTail]>,
    Static.Tuple<[]>
]>;
type ExprTerm = Static.Tuple<[
    Factor,
    ExprTermTail
], ExprBinaryMapping>;
type ExprTail = Static.Union<[
    Static.Tuple<[Static.Const<'|'>, ExprTerm, ExprTail]>,
    Static.Tuple<[]>
]>;
type Expr = Static.Tuple<[
    ExprTerm,
    ExprTail
], ExprBinaryMapping>;
export type Type = Static.Union<[
    Static.Context<GenericArguments, Expr>,
    Expr
]>;
interface PropertyKeyStringMapping extends Static.IMapping {
    output: this['input'];
}
type PropertyKeyString = Static.String<[SingleQuote, DoubleQuote], PropertyKeyStringMapping>;
type PropertyKey = Static.Union<[Static.Ident, PropertyKeyString]>;
interface ReadonlyMapping extends Static.IMapping {
    output: this['input'] extends ['readonly'] ? true : false;
}
type Readonly = Static.Union<[Static.Tuple<[Static.Const<'readonly'>]>, Static.Tuple<[]>], ReadonlyMapping>;
interface OptionalMapping extends Static.IMapping {
    output: this['input'] extends [Question] ? true : false;
}
type Optional = Static.Union<[Static.Tuple<[Static.Const<Question>]>, Static.Tuple<[]>], OptionalMapping>;
interface PropertyMapping extends Static.IMapping {
    output: this['input'] extends [infer IsReadonly extends boolean, infer Key extends string, infer IsOptional extends boolean, string, infer Type extends t.TSchema] ? {
        [_ in Key]: ([
            IsReadonly,
            IsOptional
        ] extends [true, true] ? t.TReadonlyOptional<Type> : [
            IsReadonly,
            IsOptional
        ] extends [true, false] ? t.TReadonly<Type> : [
            IsReadonly,
            IsOptional
        ] extends [false, true] ? t.TOptional<Type> : Type);
    } : never;
}
type Property = Static.Tuple<[Readonly, PropertyKey, Optional, Static.Const<Colon>, Type], PropertyMapping>;
type PropertyDelimiter = Static.Union<[
    Static.Tuple<[Static.Const<Comma>, Static.Const<Newline>]>,
    Static.Tuple<[Static.Const<SemiColon>, Static.Const<Newline>]>,
    Static.Tuple<[Static.Const<Comma>]>,
    Static.Tuple<[Static.Const<SemiColon>]>,
    Static.Tuple<[Static.Const<Newline>]>
]>;
type PropertiesReduce<PropertiesArray extends t.TProperties[], Result extends t.TProperties = {}> = (PropertiesArray extends [infer Left extends t.TProperties, ...infer Right extends t.TProperties[]] ? PropertiesReduce<Right, t.Evaluate<Result & Left>> : Result);
interface PropertiesMapping extends Static.IMapping {
    output: this['input'] extends t.TProperties[] ? PropertiesReduce<this['input']> : never;
}
type Properties = Static.Union<[Delimit<Property, PropertyDelimiter>], PropertiesMapping>;
interface ObjectMapping extends Static.IMapping {
    output: this['input'] extends [unknown, infer Properties extends t.TProperties, unknown] ? t.TObject<Properties> : never;
}
type Object = Static.Tuple<[
    Static.Const<LBrace>,
    Properties,
    Static.Const<RBrace>
], ObjectMapping>;
type Elements = Delimit<Type, Static.Const<Comma>>;
interface TupleMapping extends Static.IMapping {
    output: this['input'] extends [unknown, infer Elements extends t.TSchema[], unknown] ? t.TTuple<Elements> : never;
}
type Tuple = Static.Tuple<[
    Static.Const<LBracket>,
    Elements,
    Static.Const<RBracket>
], TupleMapping>;
interface ParameterMapping extends Static.IMapping {
    output: this['input'] extends [string, Colon, infer Type extends t.TSchema] ? Type : never;
}
type Parameter = Static.Tuple<[
    Static.Ident,
    Static.Const<Colon>,
    Type
], ParameterMapping>;
type Parameters = Delimit<Parameter, Static.Const<Comma>>;
interface FunctionMapping extends Static.IMapping {
    output: this['input'] extends [LParen, infer Parameters extends t.TSchema[], RParen, '=>', infer ReturnType extends t.TSchema] ? t.TFunction<Parameters, ReturnType> : never;
}
type Function = Static.Tuple<[
    Static.Const<LParen>,
    Parameters,
    Static.Const<RParen>,
    Static.Const<'=>'>,
    Type
], FunctionMapping>;
interface ConstructorMapping extends Static.IMapping {
    output: this['input'] extends ['new', LParen, infer Parameters extends t.TSchema[], RParen, '=>', infer InstanceType extends t.TSchema] ? t.TConstructor<Parameters, InstanceType> : never;
}
type Constructor = Static.Tuple<[
    Static.Const<'new'>,
    Static.Const<LParen>,
    Parameters,
    Static.Const<RParen>,
    Static.Const<'=>'>,
    Type
], ConstructorMapping>;
interface MappedMapping extends Static.IMapping {
    output: this['input'] extends [LBrace, LBracket, infer _Key extends string, 'in', infer _Right extends t.TSchema, RBracket, Colon, infer Type extends t.TSchema, RBrace] ? t.TLiteral<'Mapped types not supported'> : this['input'];
}
type Mapped = Static.Tuple<[
    Static.Const<LBrace>,
    Static.Const<LBracket>,
    Static.Ident,
    Static.Const<'in'>,
    Type,
    Static.Const<RBracket>,
    Static.Const<Colon>,
    Type,
    Static.Const<RBrace>
], MappedMapping>;
interface ArrayMapping extends Static.IMapping {
    output: this['input'] extends ['Array', LAngle, infer Type extends t.TSchema, RAngle] ? t.TArray<Type> : never;
}
type Array = Static.Tuple<[
    Static.Const<'Array'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], ArrayMapping>;
interface AsyncIteratorMapping extends Static.IMapping {
    output: this['input'] extends ['AsyncIterator', LAngle, infer Type extends t.TSchema, RAngle] ? t.TAsyncIterator<Type> : never;
}
type AsyncIterator = Static.Tuple<[
    Static.Const<'AsyncIterator'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], AsyncIteratorMapping>;
interface IteratorMapping extends Static.IMapping {
    output: this['input'] extends ['Iterator', LAngle, infer Type extends t.TSchema, RAngle] ? t.TIterator<Type> : never;
}
type Iterator = Static.Tuple<[
    Static.Const<'Iterator'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], IteratorMapping>;
interface ConstructorParametersMapping extends Static.IMapping {
    output: this['input'] extends ['ConstructorParameters', LAngle, infer Type extends t.TSchema, RAngle] ? t.TConstructorParameters<Type> : never;
}
type ConstructorParameters = Static.Tuple<[
    Static.Const<'ConstructorParameters'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], ConstructorParametersMapping>;
interface FunctionParametersMapping extends Static.IMapping {
    output: this['input'] extends ['Parameters', LAngle, infer Type extends t.TSchema, RAngle] ? t.TParameters<Type> : never;
}
type FunctionParameters = Static.Tuple<[
    Static.Const<'Parameters'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], FunctionParametersMapping>;
interface InstanceTypeMapping extends Static.IMapping {
    output: this['input'] extends ['InstanceType', LAngle, infer Type extends t.TSchema, RAngle] ? t.TInstanceType<Type> : never;
}
type InstanceType = Static.Tuple<[
    Static.Const<'InstanceType'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], InstanceTypeMapping>;
interface ReturnTypeMapping extends Static.IMapping {
    output: this['input'] extends ['ReturnType', LAngle, infer Type extends t.TSchema, RAngle] ? t.TReturnType<Type> : never;
}
type ReturnType = Static.Tuple<[
    Static.Const<'ReturnType'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], ReturnTypeMapping>;
interface ArgumentMapping extends Static.IMapping {
    output: this['input'] extends ['Argument', LAngle, infer Type extends t.TSchema, RAngle] ? Type extends t.TLiteral<infer Index extends number> ? t.TArgument<Index> : t.TNever : never;
}
type Argument = Static.Tuple<[
    Static.Const<'Argument'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], ArgumentMapping>;
interface AwaitedMapping extends Static.IMapping {
    output: this['input'] extends ['Awaited', LAngle, infer Type extends t.TSchema, RAngle] ? t.TAwaited<Type> : never;
}
type Awaited = Static.Tuple<[
    Static.Const<'Awaited'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], AwaitedMapping>;
interface PromiseMapping extends Static.IMapping {
    output: this['input'] extends ['Promise', LAngle, infer Type extends t.TSchema, RAngle] ? t.TPromise<Type> : never;
}
type Promise = Static.Tuple<[
    Static.Const<'Promise'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], PromiseMapping>;
interface RecordMapping extends Static.IMapping {
    output: this['input'] extends ['Record', LAngle, infer Key extends t.TSchema, Comma, infer Type extends t.TSchema, RAngle] ? t.TRecord<Key, Type> : never;
}
type Record = Static.Tuple<[
    Static.Const<'Record'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<Comma>,
    Type,
    Static.Const<RAngle>
], RecordMapping>;
interface PartialMapping extends Static.IMapping {
    output: this['input'] extends ['Partial', LAngle, infer Type extends t.TSchema, RAngle] ? t.TPartial<Type> : never;
}
type Partial = Static.Tuple<[
    Static.Const<'Partial'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], PartialMapping>;
interface RequiredMapping extends Static.IMapping {
    output: this['input'] extends ['Required', LAngle, infer Type extends t.TSchema, RAngle] ? t.TRequired<Type> : never;
}
type Required = Static.Tuple<[
    Static.Const<'Required'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], RequiredMapping>;
interface PickMapping extends Static.IMapping {
    output: this['input'] extends ['Pick', LAngle, infer Type extends t.TSchema, Comma, infer Key extends t.TSchema, RAngle] ? t.TPick<Type, Key> : never;
}
type Pick = Static.Tuple<[
    Static.Const<'Pick'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<Comma>,
    Type,
    Static.Const<RAngle>
], PickMapping>;
interface OmitMapping extends Static.IMapping {
    output: this['input'] extends ['Omit', LAngle, infer Type extends t.TSchema, Comma, infer Key extends t.TSchema, RAngle] ? t.TOmit<Type, Key> : never;
}
type Omit = Static.Tuple<[
    Static.Const<'Omit'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<Comma>,
    Type,
    Static.Const<RAngle>
], OmitMapping>;
interface ExcludeMapping extends Static.IMapping {
    output: this['input'] extends ['Exclude', LAngle, infer Type extends t.TSchema, Comma, infer PropertyKey extends t.TSchema, RAngle] ? t.TExclude<Type, PropertyKey> : never;
}
type Exclude = Static.Tuple<[
    Static.Const<'Exclude'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<Comma>,
    Type,
    Static.Const<RAngle>
], ExcludeMapping>;
interface ExtractMapping extends Static.IMapping {
    output: this['input'] extends ['Extract', LAngle, infer Type extends t.TSchema, Comma, infer PropertyKey extends t.TSchema, RAngle] ? t.TExtract<Type, PropertyKey> : never;
}
type Extract = Static.Tuple<[
    Static.Const<'Extract'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<Comma>,
    Type,
    Static.Const<RAngle>
], ExtractMapping>;
interface UppercaseMapping extends Static.IMapping {
    output: this['input'] extends ['Uppercase', LAngle, infer Type extends t.TSchema, RAngle] ? t.TUppercase<Type> : never;
}
type Uppercase = Static.Tuple<[
    Static.Const<'Uppercase'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], UppercaseMapping>;
interface LowercaseMapping extends Static.IMapping {
    output: this['input'] extends ['Lowercase', LAngle, infer Type extends t.TSchema, RAngle] ? t.TLowercase<Type> : never;
}
type Lowercase = Static.Tuple<[
    Static.Const<'Lowercase'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], LowercaseMapping>;
interface CapitalizeMapping extends Static.IMapping {
    output: this['input'] extends ['Capitalize', LAngle, infer Type extends t.TSchema, RAngle] ? t.TCapitalize<Type> : never;
}
type Capitalize = Static.Tuple<[
    Static.Const<'Capitalize'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], CapitalizeMapping>;
interface UncapitalizeMapping extends Static.IMapping {
    output: this['input'] extends ['Uncapitalize', LAngle, infer Type extends t.TSchema, RAngle] ? t.TUncapitalize<Type> : never;
}
type Uncapitalize = Static.Tuple<[
    Static.Const<'Uncapitalize'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], UncapitalizeMapping>;
type Date = Static.Const<'Date', Static.As<t.TDate>>;
type Uint8Array = Static.Const<'Uint8Array', Static.As<t.TUint8Array>>;
export {};
