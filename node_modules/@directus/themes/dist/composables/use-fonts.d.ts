import { MaybeRef } from 'vue';
import { Theme } from '../schemas/theme.js';
export declare const useFonts: (theme: MaybeRef<Theme>) => {
    googleFonts: import('vue').ComputedRef<string[]>;
};
