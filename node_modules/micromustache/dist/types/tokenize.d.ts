export interface ITokens {
    /** An array of constant strings */
    readonly strings: string[];
    /** An array of variable names */
    readonly varNames: string[];
}
/**
 * Declares the open and close tag respectively
 */
export declare type ITags = [string, string];
/**
 * The options that goes to the tokenization algorithm
 */
export interface ITokenizeOptions {
    /**
     * Maximum allowed variable name. Set this to a safe value to prevent a bad template from blocking
     * the tokenization unnecessarily
     */
    maxVarNameLength?: number;
    /**
     * The string symbols that mark the opening and closing of a variable name in
     * the template.
     * It defaults to `['{{', '}}']`
     */
    tags?: ITags;
}
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
export declare function tokenize(template: string, options?: ITokenizeOptions): ITokens;
