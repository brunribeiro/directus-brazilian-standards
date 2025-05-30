import { DeepPartial } from '@directus/types';
import { Theme } from '../schemas/index.js';
export declare const rulesToCssVars: (rules: DeepPartial<Theme["rules"]>) => Record<string, string | number>;
