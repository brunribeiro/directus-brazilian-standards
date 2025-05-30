import { DeepPartial } from '@directus/types';
import { MaybeRef } from 'vue';
import { Theme } from '../schemas/theme.js';
export declare const useTheme: (darkMode: MaybeRef<boolean>, themeLight: MaybeRef<string | null>, themeDark: MaybeRef<string | null>, themeLightOverrides: MaybeRef<DeepPartial<Theme["rules"]>>, themeDarkOverrides: MaybeRef<DeepPartial<Theme["rules"]>>) => {
    theme: import('vue').ComputedRef<{
        id: string;
        name: string;
        appearance: "dark";
        rules: {
            borderRadius: string;
            borderWidth: string;
            foreground: string;
            foregroundAccent: string;
            foregroundSubdued: string;
            background: string;
            backgroundNormal: string;
            backgroundAccent: string;
            backgroundSubdued: string;
            borderColor: string;
            borderColorAccent: string;
            borderColorSubdued: string;
            primary: string;
            primaryBackground: string;
            primarySubdued: string;
            primaryAccent: string;
            secondary: string;
            secondaryBackground: string;
            secondarySubdued: string;
            secondaryAccent: string;
            success: string;
            successBackground: string;
            successSubdued: string;
            successAccent: string;
            warning: string;
            warningBackground: string;
            warningSubdued: string;
            warningAccent: string;
            danger: string;
            dangerBackground: string;
            dangerSubdued: string;
            dangerAccent: string;
            fonts: {
                display: {
                    fontFamily: string;
                    fontWeight: string;
                };
                sans: {
                    fontFamily: string;
                    fontWeight: string;
                };
                serif: {
                    fontFamily: string;
                    fontWeight: string;
                };
                monospace: {
                    fontFamily: string;
                    fontWeight: string;
                };
            };
            navigation: {
                background: string;
                backgroundAccent: string;
                borderColor: string;
                borderWidth: string;
                project: {
                    borderColor: string;
                    borderWidth: string;
                    background: string;
                    foreground: string;
                    fontFamily: string;
                };
                modules: {
                    background: string;
                    borderColor: string;
                    borderWidth: string;
                    button: {
                        foreground: string;
                        foregroundHover: string;
                        foregroundActive: string;
                        background: string;
                        backgroundHover: string;
                        backgroundActive: string;
                    };
                };
                list: {
                    icon: {
                        foreground: string;
                        foregroundHover: string;
                        foregroundActive: string;
                    };
                    foreground: string;
                    foregroundHover: string;
                    foregroundActive: string;
                    background: string;
                    backgroundHover: string;
                    backgroundActive: string;
                    fontFamily: string;
                    divider: {
                        borderColor: string;
                        borderWidth: string;
                    };
                };
            };
            header: {
                background: string;
                borderColor: string;
                borderWidth: string;
                boxShadow: string;
                headline: {
                    foreground: string;
                    fontFamily: string;
                };
                title: {
                    foreground: string;
                    fontFamily: string;
                    fontWeight: string;
                };
            };
            form: {
                columnGap: string;
                rowGap: string;
                field: {
                    label: {
                        foreground: string;
                        fontFamily: string;
                        fontWeight: string;
                    };
                    input: {
                        background: string;
                        backgroundSubdued: string;
                        foreground: string;
                        foregroundSubdued: string;
                        borderColor: string;
                        borderColorHover: string;
                        borderColorFocus: string;
                        boxShadow: string;
                        boxShadowHover: string;
                        boxShadowFocus: string;
                        height: string;
                        padding: string;
                    };
                };
            };
            sidebar: {
                background: string;
                foreground: string;
                fontFamily: string;
                borderColor: string;
                borderWidth: string;
                section: {
                    toggle: {
                        icon: {
                            foreground: string;
                            foregroundHover: string;
                            foregroundActive: string;
                        };
                        foreground: string;
                        foregroundHover: string;
                        foregroundActive: string;
                        background: string;
                        backgroundHover: string;
                        backgroundActive: string;
                        fontFamily: string;
                        borderColor: string;
                        borderWidth: string;
                    };
                    form: {
                        columnGap: string;
                        rowGap: string;
                        label: {
                            foreground: string;
                            fontFamily: string;
                        };
                        field: {
                            input: {
                                background: string;
                                foreground: string;
                                foregroundSubdued: string;
                                borderColor: string;
                                borderColorHover: string;
                                borderColorFocus: string;
                                boxShadow: string;
                                boxShadowHover: string;
                                boxShadowFocus: string;
                                height: string;
                                padding: string;
                            };
                        };
                    };
                };
            };
            public: {
                background: string;
                foreground: string;
                foregroundAccent: string;
                art: {
                    background: string;
                    primary: string;
                    secondary: string;
                    speed: string;
                };
                form: {
                    columnGap: string;
                    rowGap: string;
                    field: {
                        label: {
                            foreground: string;
                            fontFamily: string;
                        };
                        input: {
                            background: string;
                            foreground: string;
                            foregroundSubdued: string;
                            borderColor: string;
                            borderColorHover: string;
                            borderColorFocus: string;
                            boxShadow: string;
                            boxShadowHover: string;
                            boxShadowFocus: string;
                            height: string;
                            padding: string;
                        };
                    };
                };
            };
            popover: {
                menu: {
                    background: string;
                    borderRadius: string;
                    boxShadow: string;
                };
            };
            banner: {
                background: string;
                padding: string;
                borderRadius: string;
                avatar: {
                    borderRadius: string;
                    foreground: string;
                    background: string;
                };
                headline: {
                    foreground: string;
                    fontFamily: string;
                    fontWeight: string;
                };
                title: {
                    foreground: string;
                    fontFamily: string;
                    fontWeight: string;
                };
                subtitle: {
                    foreground: string;
                    fontFamily: string;
                    fontWeight: string;
                };
                art: {
                    foreground: string;
                };
            };
        };
    } | {
        id: string;
        name: string;
        appearance: "light";
        rules: {
            borderRadius: string;
            borderWidth: string;
            foreground: string;
            foregroundAccent: string;
            foregroundSubdued: string;
            background: string;
            backgroundNormal: string;
            backgroundAccent: string;
            backgroundSubdued: string;
            borderColor: string;
            borderColorAccent: string;
            borderColorSubdued: string;
            primary: string;
            primaryBackground: string;
            primarySubdued: string;
            primaryAccent: string;
            secondary: string;
            secondaryBackground: string;
            secondarySubdued: string;
            secondaryAccent: string;
            success: string;
            successBackground: string;
            successSubdued: string;
            successAccent: string;
            warning: string;
            warningBackground: string;
            warningSubdued: string;
            warningAccent: string;
            danger: string;
            dangerBackground: string;
            dangerSubdued: string;
            dangerAccent: string;
            fonts: {
                display: {
                    fontFamily: string;
                    fontWeight: string;
                };
                sans: {
                    fontFamily: string;
                    fontWeight: string;
                };
                serif: {
                    fontFamily: string;
                    fontWeight: string;
                };
                monospace: {
                    fontFamily: string;
                    fontWeight: string;
                };
            };
            navigation: {
                background: string;
                backgroundAccent: string;
                borderColor: string;
                borderWidth: string;
                project: {
                    borderColor: string;
                    borderWidth: string;
                    background: string;
                    foreground: string;
                    fontFamily: string;
                };
                modules: {
                    background: string;
                    borderColor: string;
                    borderWidth: string;
                    button: {
                        foreground: string;
                        foregroundHover: string;
                        foregroundActive: string;
                        background: string;
                        backgroundHover: string;
                        backgroundActive: string;
                    };
                };
                list: {
                    icon: {
                        foreground: string;
                        foregroundHover: string;
                        foregroundActive: string;
                    };
                    foreground: string;
                    foregroundHover: string;
                    foregroundActive: string;
                    background: string;
                    backgroundHover: string;
                    backgroundActive: string;
                    fontFamily: string;
                    divider: {
                        borderColor: string;
                        borderWidth: string;
                    };
                };
            };
            header: {
                background: string;
                borderColor: string;
                borderWidth: string;
                boxShadow: string;
                headline: {
                    foreground: string;
                    fontFamily: string;
                };
                title: {
                    foreground: string;
                    fontFamily: string;
                    fontWeight: string;
                };
            };
            form: {
                columnGap: string;
                rowGap: string;
                field: {
                    label: {
                        foreground: string;
                        fontFamily: string;
                        fontWeight: string;
                    };
                    input: {
                        background: string;
                        backgroundSubdued: string;
                        foreground: string;
                        foregroundSubdued: string;
                        borderColor: string;
                        borderColorHover: string;
                        borderColorFocus: string;
                        boxShadow: string;
                        boxShadowHover: string;
                        boxShadowFocus: string;
                        height: string;
                        padding: string;
                    };
                };
            };
            sidebar: {
                background: string;
                foreground: string;
                fontFamily: string;
                borderColor: string;
                borderWidth: string;
                section: {
                    toggle: {
                        icon: {
                            foreground: string;
                            foregroundHover: string;
                            foregroundActive: string;
                        };
                        foreground: string;
                        foregroundHover: string;
                        foregroundActive: string;
                        background: string;
                        backgroundHover: string;
                        backgroundActive: string;
                        fontFamily: string;
                        borderColor: string;
                        borderWidth: string;
                    };
                    form: {
                        columnGap: string;
                        rowGap: string;
                        label: {
                            foreground: string;
                            fontFamily: string;
                        };
                        field: {
                            input: {
                                background: string;
                                foreground: string;
                                foregroundSubdued: string;
                                borderColor: string;
                                borderColorHover: string;
                                borderColorFocus: string;
                                boxShadow: string;
                                boxShadowHover: string;
                                boxShadowFocus: string;
                                height: string;
                                padding: string;
                            };
                        };
                    };
                };
            };
            public: {
                background: string;
                foreground: string;
                foregroundAccent: string;
                art: {
                    background: string;
                    primary: string;
                    secondary: string;
                    speed: string;
                };
                form: {
                    columnGap: string;
                    rowGap: string;
                    label: {
                        foreground: string;
                        fontFamily: string;
                    };
                    field: {
                        input: {
                            background: string;
                            foreground: string;
                            foregroundSubdued: string;
                            borderColor: string;
                            borderColorHover: string;
                            borderColorFocus: string;
                            boxShadow: string;
                            boxShadowHover: string;
                            boxShadowFocus: string;
                            height: string;
                            padding: string;
                        };
                    };
                };
            };
            popover: {
                menu: {
                    background: string;
                    borderRadius: string;
                    boxShadow: string;
                };
            };
            banner: {
                background: string;
                padding: string;
                borderRadius: string;
                avatar: {
                    borderRadius: string;
                    foreground: string;
                    background: string;
                };
                headline: {
                    foreground: string;
                    fontFamily: string;
                    fontWeight: string;
                };
                title: {
                    foreground: string;
                    fontFamily: string;
                    fontWeight: string;
                };
                subtitle: {
                    foreground: string;
                    fontFamily: string;
                    fontWeight: string;
                };
                art: {
                    foreground: string;
                };
            };
        };
    }>;
};
