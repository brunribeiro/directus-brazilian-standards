export interface Scope {
    [key: string]: Scope | any;
}
export interface IGetOptions {
    /**
     * When set to a truthy value, we throw a `ReferenceError` for invalid varNames.
     * Invalid varNames are the ones that do not exist in the scope.
     * In that case the value for the varNames will be assumed an empty string.
     * By default we throw a `ReferenceError` to be compatible with how JavaScript
     * threats such invalid reference.
     * If a value does not exist in the scope, two things can happen:
     * - if `propsExist` is truthy, the value will be assumed empty string
     * - if `propsExist` is falsy, a `ReferenceError` will be thrown
     */
    readonly propsExist?: boolean;
    /**
     * Drilling a nested object to get the value assinged with a path is a relatively expensive
     * computation. Therefore you can set a value of how deep you are expecting a template to go and
     * if the nesting is deeper than that, the computation stops with an error.
     * This prevents a malicious or erronous template with deep nesting to block the JavaScript event
     * loop. The default is 10.
     */
    readonly depth?: number;
}
/**
 * A useful utility function that is used internally to lookup a variable name as a path to a
 * property in an object. It can also be used in your custom resolver functions if needed.
 *
 * This is similar to [Lodash's `_.get()`](https://lodash.com/docs/#get)
 *
 * It has a few differences with plain JavaScript syntax:
 * - No support for keys that include `[` or `]`.
 * - No support for keys that include `'` or `"` or `.`.
 * @see https://github.com/userpixel/micromustache/wiki/Known-issues
 * If it cannot find a value in the specified path, it may return undefined or throw an error
 * depending on the value of the `propsExist` param.
 * @param scope an object to resolve value from
 * @param varNameOrPropNames the variable name string or an array of property names (as returned by
 * `toPath()`)
 * @throws `SyntaxError` if the varName string cannot be parsed
 * @throws `ReferenceError` if the scope does not contain the requested key and the `propsExist` is
 * set to a truthy value
 * @returns the value or undefined. If path or scope are undefined or scope is null the result is
 * always undefined.
 */
export declare function get(scope: Scope, varNameOrPropNames: string | string[], options?: IGetOptions): any;
