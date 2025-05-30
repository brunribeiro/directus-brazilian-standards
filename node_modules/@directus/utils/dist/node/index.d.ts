import { Readable } from 'node:stream';
import { Plural } from '@directus/types';

declare function isIn<T extends readonly string[]>(value: string, array: T): value is T[number];
declare function isTypeIn<T extends {
    type?: string;
}, E extends string>(object: T, array: readonly E[]): object is Extract<T, {
    type?: E;
}>;

/**
 * Get the configured Node Environment (eg "production", "development", etc)
 */
declare const getNodeEnv: () => string | undefined;

declare const isReadableStream: (input: any) => input is Readable;

interface ListFoldersOptions {
    /**
     * Ignore folders starting with a period `.`
     */
    ignoreHidden?: boolean;
}
declare function listFolders(location: string, options?: ListFoldersOptions): Promise<string[]>;

declare function pathToRelativeUrl(filePath: string, root?: string): string;

declare function pluralize<T extends string>(str: T): Plural<T>;
declare function depluralize<T extends string>(str: Plural<T>): T;

declare const _cache: {
    id: string | undefined;
};
/**
 * Return a unique hash for the current process on the current machine. Will be different after a
 * restart
 */
declare const processId: () => string;

declare const readableStreamToString: (stream: Readable) => Promise<string>;

declare const requireYaml: (filepath: string) => unknown;

declare function resolvePackage(name: string, root?: string): string;

declare function createTmpFile(): Promise<{
    path: string;
    cleanup: () => Promise<void>;
}>;

export { _cache, createTmpFile, depluralize, getNodeEnv, isIn, isReadableStream, isTypeIn, listFolders, pathToRelativeUrl, pluralize, processId, readableStreamToString, requireYaml, resolvePackage };
