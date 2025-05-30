import type { Language, LanguageShort } from '../types.js';
export declare function isLanguage(language: string): language is Language;
export declare function languageToShort(language: Language): LanguageShort;
export declare function getLanguageFromPath(path: string): string;
