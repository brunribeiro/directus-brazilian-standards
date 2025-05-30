/* micromustache v8.0.3 */
/** @internal */
/** @internal */
// eslint-disable-next-line @typescript-eslint/unbound-method
var numberConstructor = (0).constructor;
/** @internal */
// eslint-disable-next-line @typescript-eslint/unbound-method
var isFinite = numberConstructor.isFinite;
/** @internal */
// eslint-disable-next-line @typescript-eslint/unbound-method
var isInteger = numberConstructor.isInteger;
/** @internal */
// eslint-disable-next-line @typescript-eslint/unbound-method
var isArray = [].constructor.isArray;
/** @internal */
// eslint-disable-next-line @typescript-eslint/ban-types
function isObj(x) {
    return x !== null && typeof x === 'object';
}
/** @internal */
// eslint-disable-next-line @typescript-eslint/ban-types
function isFn(x) {
    return typeof x === 'function';
}
/** @internal */
function isStr(x, minLength) {
    if (minLength === void 0) { minLength = 0; }
    return typeof x === 'string' && x.length >= minLength;
}
/** @internal */
function isNum(x) {
    return isFinite(x);
}
/** @internal */
function isArr(x) {
    return isArray(x);
}
/** @internal */
function isProp(x, propName) {
    return isObj(x) && propName in x;
}

/**
 * @internal
 * The number of different varNames that will be cached.
 * If a varName is cached, the actual parsing algorithm will not be called
 * which significantly improves performance.
 * However, this cache is size-limited to prevent degrading the user's software
 * over a period of time.
 * If the cache is full, we start removing older varNames one at a time.
 */
var cacheSize = 1000;
/** @internal */
var quoteChars = '\'"`';
/**
 * @internal
 */
var Cache = /** @class */ (function () {
    function Cache(size) {
        this.size = size;
        this.reset();
    }
    Cache.prototype.reset = function () {
        this.oldestIndex = 0;
        this.map = {};
        this.cachedKeys = new Array(this.size);
    };
    Cache.prototype.get = function (key) {
        return this.map[key];
    };
    Cache.prototype.set = function (key, value) {
        this.map[key] = value;
        var oldestKey = this.cachedKeys[this.oldestIndex];
        if (oldestKey !== undefined) {
            delete this.map[oldestKey];
        }
        this.cachedKeys[this.oldestIndex] = key;
        this.oldestIndex++;
        this.oldestIndex %= this.size;
    };
    return Cache;
}());
/** @internal */
var cache = new Cache(cacheSize);
/**
 * @internal
 * Removes the quotes from a string and returns it.
 * @param propName an string with quotations
 * @throws `SyntaxError` if the quotation symbols don't match or one is missing
 * @returns the input with its quotes removed
 */
function propBetweenBrackets(propName) {
    // in our algorithms key is always a string and never only a string of spaces
    var firstChar = propName.charAt(0);
    var lastChar = propName.substr(-1);
    if (quoteChars.includes(firstChar) || quoteChars.includes(lastChar)) {
        if (propName.length < 2 || firstChar !== lastChar) {
            throw new SyntaxError("Mismatching string quotation: \"" + propName + "\"");
        }
        return propName.substring(1, propName.length - 1);
    }
    if (propName.includes('[')) {
        throw new SyntaxError("Missing ] in varName \"" + propName + "\"");
    }
    // Normalize leading plus from numerical indices
    if (firstChar === '+') {
        return propName.substr(1);
    }
    return propName;
}
/** @internal */
function pushPropName(propNames, propName, preDot) {
    var pName = propName.trim();
    if (pName === '') {
        return propNames;
    }
    if (pName.startsWith('.')) {
        if (preDot) {
            pName = pName.substr(1).trim();
            if (pName === '') {
                return propNames;
            }
        }
        else {
            throw new SyntaxError("Unexpected . at the start of \"" + propName + "\"");
        }
    }
    else if (preDot) {
        throw new SyntaxError("Missing . at the start of \"" + propName + "\"");
    }
    if (pName.endsWith('.')) {
        throw new SyntaxError("Unexpected \".\" at the end of \"" + propName + "\"");
    }
    var propNameParts = pName.split('.');
    for (var _i = 0, propNameParts_1 = propNameParts; _i < propNameParts_1.length; _i++) {
        var propNamePart = propNameParts_1[_i];
        var trimmedPropName = propNamePart.trim();
        if (trimmedPropName === '') {
            throw new SyntaxError("Empty prop name when parsing \"" + propName + "\"");
        }
        propNames.push(trimmedPropName);
    }
    return propNames;
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
function toPath(varName) {
    if (!isStr(varName)) {
        throw new TypeError("Cannot parse path. Expected string. Got a " + typeof varName);
    }
    var openBracketIndex;
    var closeBracketIndex = 0;
    var beforeBracket;
    var propName;
    var preDot = false;
    var propNames = new Array(0);
    for (var currentIndex = 0; currentIndex < varName.length; currentIndex = closeBracketIndex) {
        openBracketIndex = varName.indexOf('[', currentIndex);
        if (openBracketIndex === -1) {
            break;
        }
        closeBracketIndex = varName.indexOf(']', openBracketIndex);
        if (closeBracketIndex === -1) {
            throw new SyntaxError("Missing ] in varName \"" + varName + "\"");
        }
        propName = varName.substring(openBracketIndex + 1, closeBracketIndex).trim();
        if (propName.length === 0) {
            throw new SyntaxError('Unexpected token ]');
        }
        closeBracketIndex++;
        beforeBracket = varName.substring(currentIndex, openBracketIndex);
        pushPropName(propNames, beforeBracket, preDot);
        propNames.push(propBetweenBrackets(propName));
        preDot = true;
    }
    var rest = varName.substring(closeBracketIndex);
    return pushPropName(propNames, rest, preDot);
}
/**
 * This is just a faster version of `toPath()`
 */
function toPathCached(varName) {
    var result = cache.get(varName);
    if (result === undefined) {
        result = toPath(varName);
        cache.set(varName, result);
    }
    return result;
}
toPath.cached = toPathCached;

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
function get(scope, varNameOrPropNames, options) {
    if (options === void 0) { options = {}; }
    if (!isObj(options)) {
        throw new TypeError("get expects an object option. Got " + typeof options);
    }
    var _a = options.depth, depth = _a === void 0 ? 10 : _a;
    if (!isNum(depth) || depth <= 0) {
        throw new RangeError("Expected a positive number for depth. Got " + depth);
    }
    var propNames = Array.isArray(varNameOrPropNames)
        ? varNameOrPropNames
        : toPath.cached(varNameOrPropNames);
    var propNamesAsStr = function () { return propNames.join(' > '); };
    if (propNames.length > depth) {
        throw new ReferenceError("The path cannot be deeper than " + depth + " levels. Got \"" + propNamesAsStr() + "\"");
    }
    var currentScope = scope;
    for (var _i = 0, propNames_1 = propNames; _i < propNames_1.length; _i++) {
        var propName = propNames_1[_i];
        if (isProp(currentScope, propName)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            currentScope = currentScope[propName];
        }
        else if (options.propsExist) {
            throw new ReferenceError(propName + " is not defined in the scope at path: \"" + propNamesAsStr() + "\"");
        }
        else {
            return;
        }
    }
    return currentScope;
}

/**
 * This class does the heavy lifting of interpolation (putting the actual values
 * in the template).
 * This is created by the `.compile()` method and is used under the hood by
 * `.render()`, `renderFn()` and `renderFnAsync()` functions.
 */
var Renderer = /** @class */ (function () {
    /**
     * Creates a new Renderer instance. This is called internally by the compiler.
     * @param tokens - the result of the `.tokenize()` function
     * @param options - some options for customizing the rendering process
     * @throws `TypeError` if the token is invalid
     */
    function Renderer(tokens, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.tokens = tokens;
        this.options = options;
        /**
         * Replaces every {{varName}} inside the template with values from the scope
         * parameter.
         *
         * @param template The template containing one or more {{varName}} as
         * placeholders for values from the `scope` parameter.
         * @param scope An object containing values for variable names from the the
         * template. If it's omitted, we default to an empty object.
         */
        this.render = function (scope) {
            if (scope === void 0) { scope = {}; }
            var varNames = _this.tokens.varNames;
            var length = varNames.length;
            _this.cacheParsedPaths();
            var values = new Array(length);
            for (var i = 0; i < length; i++) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                values[i] = get(scope, _this.toPathCache[i], _this.options);
            }
            return _this.stringify(values);
        };
        /**
         * Same as [[render]] but accepts a resolver function which will be
         * responsible for returning a value for every varName.
         */
        this.renderFn = function (resolveFn, scope) {
            if (scope === void 0) { scope = {}; }
            var values = _this.resolveVarNames(resolveFn, scope);
            return _this.stringify(values);
        };
        /**
         * Same as [[render]] but accepts a resolver function which will be responsible
         * for returning promise that resolves to a value for every varName.
         */
        this.renderFnAsync = function (resolveFnAsync, scope) {
            if (scope === void 0) { scope = {}; }
            return Promise.all(_this.resolveVarNames(resolveFnAsync, scope)).then(function (values) {
                return _this.stringify(values);
            });
        };
        if (!isObj(tokens) ||
            !isArr(tokens.strings) ||
            !isArr(tokens.varNames) ||
            tokens.strings.length !== tokens.varNames.length + 1) {
            // This is most likely an internal error from tokenization algorithm
            throw new TypeError("Invalid tokens object");
        }
        if (!isObj(options)) {
            throw new TypeError("Options should be an object. Got a " + typeof options);
        }
        if (options.validateVarNames) {
            // trying to initialize toPathCache parses them which is also validation
            this.cacheParsedPaths();
        }
    }
    /**
     * This function is called internally for filling in the `toPathCache` cache.
     * If the `validateVarNames` option for the constructor is set to a truthy
     * value, this function is called immediately which leads to a validation as
     * well because it throws an error if it cannot parse variable names.
     */
    Renderer.prototype.cacheParsedPaths = function () {
        var varNames = this.tokens.varNames;
        if (this.toPathCache === undefined) {
            this.toPathCache = new Array(varNames.length);
            for (var i = 0; i < varNames.length; i++) {
                this.toPathCache[i] = toPath.cached(varNames[i]);
            }
        }
    };
    Renderer.prototype.resolveVarNames = function (resolveFn, scope) {
        if (scope === void 0) { scope = {}; }
        var varNames = this.tokens.varNames;
        if (!isFn(resolveFn)) {
            throw new TypeError("Expected a resolver function. Got " + String(resolveFn));
        }
        var length = varNames.length;
        var values = new Array(length);
        for (var i = 0; i < length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            values[i] = resolveFn.call(null, varNames[i], scope);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return values;
    };
    /**
     * Puts the resolved `values` into the rest of the template (`strings`) and
     * returns the final result that'll be returned from `render()`, `renderFn()`
     * and `renderFnAsync()` functions.
     */
    Renderer.prototype.stringify = function (values) {
        var strings = this.tokens.strings;
        var explicit = this.options.explicit;
        var length = values.length;
        var ret = '';
        for (var i = 0; i < length; i++) {
            ret += strings[i];
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            var value = values[i];
            if (explicit || (value !== null && value !== undefined)) {
                ret += value;
            }
        }
        ret += strings[length];
        return ret;
    };
    return Renderer;
}());

/**
 * Parses a template and returns the tokens in an object.
 *
 * @throws `TypeError` if there's an issue with its inputs
 * @throws `SyntaxError` if there's an issue with the template
 *
 * @param template the template
 * @param openSym the string that marks the start of a variable name
 * @param closeSym the string that marks the start of a variable name
 * @returns the resulting tokens as an object that has strings and variable names
 */
function tokenize(template, options) {
    if (options === void 0) { options = {}; }
    if (!isStr(template)) {
        throw new TypeError("The template parameter must be a string. Got a " + typeof template);
    }
    if (!isObj(options)) {
        throw new TypeError("Options should be an object. Got a " + typeof options);
    }
    var _a = options.tags, tags = _a === void 0 ? ['{{', '}}'] : _a, _b = options.maxVarNameLength, maxVarNameLength = _b === void 0 ? 1000 : _b;
    if (!isArr(tags) || tags.length !== 2) {
        throw TypeError("tags should be an array of two elements. Got " + String(tags));
    }
    var openSym = tags[0], closeSym = tags[1];
    if (!isStr(openSym, 1) || !isStr(closeSym, 1) || openSym === closeSym) {
        throw new TypeError("The open and close symbols should be two distinct non-empty strings. Got \"" + openSym + "\" and \"" + closeSym + "\"");
    }
    if (!isNum(maxVarNameLength) || maxVarNameLength <= 0) {
        throw new Error("Expected a positive number for maxVarNameLength. Got " + maxVarNameLength);
    }
    var openSymLen = openSym.length;
    var closeSymLen = closeSym.length;
    var openIndex;
    var closeIndex = 0;
    var varName;
    var strings = [];
    var varNames = [];
    var currentIndex = 0;
    while (currentIndex < template.length) {
        openIndex = template.indexOf(openSym, currentIndex);
        if (openIndex === -1) {
            break;
        }
        var varNameStartIndex = openIndex + openSymLen;
        closeIndex = template
            .substr(varNameStartIndex, maxVarNameLength + closeSymLen)
            .indexOf(closeSym);
        if (closeIndex === -1) {
            throw new SyntaxError("Missing \"" + closeSym + "\" in the template for the \"" + openSym + "\" at position " + openIndex + " within " + maxVarNameLength + " characters");
        }
        closeIndex += varNameStartIndex;
        varName = template.substring(varNameStartIndex, closeIndex).trim();
        if (varName.length === 0) {
            throw new SyntaxError("Unexpected \"" + closeSym + "\" tag found at position " + openIndex);
        }
        if (varName.includes(openSym)) {
            throw new SyntaxError("Variable names cannot have \"" + openSym + "\". But at position " + openIndex + ". Got \"" + varName + "\"");
        }
        varNames.push(varName);
        closeIndex += closeSymLen;
        strings.push(template.substring(currentIndex, openIndex));
        currentIndex = closeIndex;
    }
    strings.push(template.substring(closeIndex));
    return { strings: strings, varNames: varNames };
}

/**
 * Compiles a template and returns an object with functions that render it.
 * Compilation makes repeated render calls more optimized by parsing the
 * template only once and reusing the results.
 * As a result, rendering gets 3-5x faster.
 * Caching is stored in the resulting object, so if you free up all the
 * references to that object, the caches will be garbage collected.
 *
 * @param template same as the template parameter to .render()
 * @param options some options for customizing the compilation
 * @throws `TypeError` if the template is not a string
 * @throws `TypeError` if the options is set but is not an object
 * @throws any error that [[tokenize]] or [[Renderer.constructor]] may throw
 * @returns a [[Renderer]] object which has render methods
 */
function compile(template, options) {
    if (options === void 0) { options = {}; }
    var tokens = tokenize(template, options);
    return new Renderer(tokens, options);
}

/**
 * Replaces every {{varName}} inside the template with values from the scope
 * parameter.
 * @warning **When dealing with user input, always make sure to validate it.**
 * @param template The template containing one or more {{varName}} as
 * placeholders for values from the `scope` parameter.
 * @param scope An object containing values for variable names from the the
 * template. If it's omitted, we default to an empty object.
 * Since functions are objects in javascript, the `scope` can technically be a
 * function too but it won't be called. It'll be treated as an object and its
 * properties will be used for the lookup.
 * @param options same options as the [[compile]] function
 * @throws any error that [[compile]] or [[Renderer.render]] may throw
 * @returns Template where its variable names replaced with
 * corresponding values.
 */
function render(template, scope, options) {
    var renderer = compile(template, options);
    return renderer.render(scope);
}
/**
 * Same as [[render]] but accepts a resolver function which will be responsible
 * for returning a value for every varName.
 * @param resolveFn a function that takes a variable name and resolves it to a value.
 * The value can be a number, string or boolean. If it is not, it'll be "stringified".
 * @throws any error that [[compile]] or [[Renderer.renderFn]] may throw
 * @returns Template where its variable names replaced with what is returned from the resolver
 * function for each varName.
 */
function renderFn(template, resolveFn, scope, options) {
    var renderer = compile(template, options);
    return renderer.renderFn(resolveFn, scope);
}
/**
 * Same as [[renderFn]] but supports asynchronous resolver functions
 * (a function that returns a promise instead of the value).
 * @param resolveFn an async function that takes a variable name and resolves it to a value.
 * The value can be a number, string or boolean. If it is not, it'll be "stringified".
 * @throws any error that [[compile]] or [[Renderer.renderFnAsync]] may throw
 * @returns a promise that when resolved contains the template where its variable names replaced
 * with what is returned from the resolver function for each varName.
 */
function renderFnAsync(template, resolveFnAsync, scope, options) {
    var renderer = compile(template, options);
    return renderer.renderFnAsync(resolveFnAsync, scope);
}

export { Renderer, compile, get, render, renderFn, renderFnAsync, tokenize };
//# sourceMappingURL=micromustache.mjs.map
