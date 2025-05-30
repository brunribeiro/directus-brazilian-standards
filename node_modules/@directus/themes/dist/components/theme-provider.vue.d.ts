import { DeepPartial } from '@directus/types';
import { Theme } from '../schemas/index.js';
type __VLS_Props = {
    darkMode: boolean;
    themeLight: string | null;
    themeLightOverrides: DeepPartial<Theme['rules']>;
    themeDark: string | null;
    themeDarkOverrides: DeepPartial<Theme['rules']>;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    themeLight: string | null;
    themeLightOverrides: DeepPartial<Theme["rules"]>;
    themeDark: string | null;
    themeDarkOverrides: DeepPartial<Theme["rules"]>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
