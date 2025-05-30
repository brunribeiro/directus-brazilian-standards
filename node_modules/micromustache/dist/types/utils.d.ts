/** @internal */
export declare function isObj(x: unknown): x is object;
/** @internal */
export declare function isFn<T extends Function>(x: unknown): x is T;
/** @internal */
export declare function isStr(x: unknown, minLength?: number): x is string;
/** @internal */
export declare function isNum(x: unknown): x is number;
/** @internal */
export declare function isInt(x: unknown): x is number;
/** @internal */
export declare function isArr(x: unknown): x is unknown[];
/** @internal */
export declare function isProp<K extends string | number | symbol>(x: unknown, propName: K): x is Record<K, any>;
/** @internal */
export declare function isOwnProp<K extends string | number | symbol>(x: unknown, propName: K): x is Record<K, any>;
