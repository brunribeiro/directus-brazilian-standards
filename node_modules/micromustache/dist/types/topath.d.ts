/**
 * @internal
 */
export declare class Cache<T> {
    private size;
    private map;
    private cachedKeys;
    private oldestIndex;
    constructor(size: number);
    reset(): void;
    get(key: string): T;
    set(key: string, value: T): void;
}
/**
 * Breaks a variable name to an array of strings that can be used to get a
 * particular value from an object
 * @param varName - the variable name as it occurs in the template.
 * For example `a["b"].c`
 * @throws `TypeError` if the varName is not a string
 * @throws `SyntaxError` if the varName syntax has a problem
 * @returns - an array of property names that can be used to get a particular
 * value.
 * For example `['a', 'b', 'c']`
 */
export declare function toPath(varName: string): string[];
export declare namespace toPath {
    var cached: typeof toPathCached;
}
/**
 * This is just a faster version of `toPath()`
 */
declare function toPathCached(varName: string): string[];
export {};
