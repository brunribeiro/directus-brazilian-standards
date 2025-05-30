import { Theme } from '../schemas/theme.js';
export declare const useThemeStore: import('pinia').StoreDefinition<"🎨 Themes", Pick<{
    themes: {
        light: {
            id: string;
            name: string;
            appearance: "light" | "dark";
            rules: {
                foreground?: string;
                background?: string;
                backgroundSubdued?: string;
                foregroundSubdued?: string;
                borderColor?: string;
                borderRadius?: string;
                borderWidth?: string;
                foregroundAccent?: string;
                backgroundNormal?: string;
                backgroundAccent?: string;
                borderColorAccent?: string;
                borderColorSubdued?: string;
                primary?: string;
                primaryBackground?: string;
                primarySubdued?: string;
                primaryAccent?: string;
                secondary?: string;
                secondaryBackground?: string;
                secondarySubdued?: string;
                secondaryAccent?: string;
                success?: string;
                successBackground?: string;
                successSubdued?: string;
                successAccent?: string;
                warning?: string;
                warningBackground?: string;
                warningSubdued?: string;
                warningAccent?: string;
                danger?: string;
                dangerBackground?: string;
                dangerSubdued?: string;
                dangerAccent?: string;
                fonts?: {
                    display?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    sans?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    serif?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    monospace?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                };
                navigation?: {
                    background?: string;
                    borderColor?: string;
                    borderWidth?: string;
                    backgroundAccent?: string;
                    project?: {
                        foreground?: string;
                        fontFamily?: string;
                        background?: string;
                        borderColor?: string;
                        borderWidth?: string;
                    };
                    modules?: {
                        background?: string;
                        borderColor?: string;
                        borderWidth?: string;
                        button?: {
                            foreground?: string;
                            background?: string;
                            foregroundHover?: string;
                            foregroundActive?: string;
                            backgroundHover?: string;
                            backgroundActive?: string;
                        };
                    };
                    list?: {
                        foreground?: string;
                        fontFamily?: string;
                        background?: string;
                        foregroundHover?: string;
                        foregroundActive?: string;
                        backgroundHover?: string;
                        backgroundActive?: string;
                        icon?: {
                            foreground?: string;
                            foregroundHover?: string;
                            foregroundActive?: string;
                        };
                        divider: {
                            borderColor?: string;
                            borderWidth?: string;
                        };
                    };
                };
                header?: {
                    background?: string;
                    borderColor?: string;
                    boxShadow?: string;
                    borderWidth?: string;
                    headline?: {
                        foreground?: string;
                        fontFamily?: string;
                    };
                    title?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                };
                form?: {
                    columnGap?: string;
                    rowGap?: string;
                    field?: {
                        label?: {
                            foreground?: string;
                            fontFamily?: string;
                            fontWeight?: string;
                        };
                        input?: {
                            foreground?: string;
                            background?: string;
                            backgroundSubdued?: string;
                            foregroundSubdued?: string;
                            borderColor?: string;
                            borderColorHover?: string;
                            borderColorFocus?: string;
                            boxShadow?: string;
                            boxShadowHover?: string;
                            boxShadowFocus?: string;
                            height?: string;
                            padding?: string;
                        };
                    };
                };
                sidebar?: {
                    foreground?: string;
                    fontFamily?: string;
                    background?: string;
                    borderColor?: string;
                    borderWidth?: string;
                    section?: {
                        form?: {
                            columnGap?: string;
                            rowGap?: string;
                            field?: {
                                label?: {
                                    foreground?: string;
                                    fontFamily?: string;
                                    fontWeight?: string;
                                };
                                input?: {
                                    foreground?: string;
                                    background?: string;
                                    backgroundSubdued?: string;
                                    foregroundSubdued?: string;
                                    borderColor?: string;
                                    borderColorHover?: string;
                                    borderColorFocus?: string;
                                    boxShadow?: string;
                                    boxShadowHover?: string;
                                    boxShadowFocus?: string;
                                    height?: string;
                                    padding?: string;
                                };
                            };
                        };
                        toggle?: {
                            foreground?: string;
                            fontFamily?: string;
                            background?: string;
                            borderColor?: string;
                            borderWidth?: string;
                            foregroundHover?: string;
                            foregroundActive?: string;
                            backgroundHover?: string;
                            backgroundActive?: string;
                            icon?: {
                                foreground?: string;
                                foregroundHover?: string;
                                foregroundActive?: string;
                            };
                        };
                    };
                };
                public?: {
                    foreground?: string;
                    background?: string;
                    foregroundAccent?: string;
                    form?: {
                        columnGap?: string;
                        rowGap?: string;
                        field?: {
                            label?: {
                                foreground?: string;
                                fontFamily?: string;
                                fontWeight?: string;
                            };
                            input?: {
                                foreground?: string;
                                background?: string;
                                backgroundSubdued?: string;
                                foregroundSubdued?: string;
                                borderColor?: string;
                                borderColorHover?: string;
                                borderColorFocus?: string;
                                boxShadow?: string;
                                boxShadowHover?: string;
                                boxShadowFocus?: string;
                                height?: string;
                                padding?: string;
                            };
                        };
                    };
                    art?: {
                        background?: string;
                        primary?: string;
                        secondary?: string;
                        speed?: string;
                    };
                };
                popover?: {
                    menu?: {
                        background?: string;
                        boxShadow?: string;
                        borderRadius?: string;
                    };
                };
                banner?: {
                    background?: string;
                    padding?: string;
                    borderRadius?: string;
                    headline?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    title?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    art?: {
                        foreground?: string;
                    };
                    avatar?: {
                        foreground?: string;
                        background?: string;
                        borderRadius?: string;
                    };
                    subtitle?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                };
            };
        }[];
        dark: {
            id: string;
            name: string;
            appearance: "light" | "dark";
            rules: {
                foreground?: string;
                background?: string;
                backgroundSubdued?: string;
                foregroundSubdued?: string;
                borderColor?: string;
                borderRadius?: string;
                borderWidth?: string;
                foregroundAccent?: string;
                backgroundNormal?: string;
                backgroundAccent?: string;
                borderColorAccent?: string;
                borderColorSubdued?: string;
                primary?: string;
                primaryBackground?: string;
                primarySubdued?: string;
                primaryAccent?: string;
                secondary?: string;
                secondaryBackground?: string;
                secondarySubdued?: string;
                secondaryAccent?: string;
                success?: string;
                successBackground?: string;
                successSubdued?: string;
                successAccent?: string;
                warning?: string;
                warningBackground?: string;
                warningSubdued?: string;
                warningAccent?: string;
                danger?: string;
                dangerBackground?: string;
                dangerSubdued?: string;
                dangerAccent?: string;
                fonts?: {
                    display?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    sans?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    serif?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    monospace?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                };
                navigation?: {
                    background?: string;
                    borderColor?: string;
                    borderWidth?: string;
                    backgroundAccent?: string;
                    project?: {
                        foreground?: string;
                        fontFamily?: string;
                        background?: string;
                        borderColor?: string;
                        borderWidth?: string;
                    };
                    modules?: {
                        background?: string;
                        borderColor?: string;
                        borderWidth?: string;
                        button?: {
                            foreground?: string;
                            background?: string;
                            foregroundHover?: string;
                            foregroundActive?: string;
                            backgroundHover?: string;
                            backgroundActive?: string;
                        };
                    };
                    list?: {
                        foreground?: string;
                        fontFamily?: string;
                        background?: string;
                        foregroundHover?: string;
                        foregroundActive?: string;
                        backgroundHover?: string;
                        backgroundActive?: string;
                        icon?: {
                            foreground?: string;
                            foregroundHover?: string;
                            foregroundActive?: string;
                        };
                        divider: {
                            borderColor?: string;
                            borderWidth?: string;
                        };
                    };
                };
                header?: {
                    background?: string;
                    borderColor?: string;
                    boxShadow?: string;
                    borderWidth?: string;
                    headline?: {
                        foreground?: string;
                        fontFamily?: string;
                    };
                    title?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                };
                form?: {
                    columnGap?: string;
                    rowGap?: string;
                    field?: {
                        label?: {
                            foreground?: string;
                            fontFamily?: string;
                            fontWeight?: string;
                        };
                        input?: {
                            foreground?: string;
                            background?: string;
                            backgroundSubdued?: string;
                            foregroundSubdued?: string;
                            borderColor?: string;
                            borderColorHover?: string;
                            borderColorFocus?: string;
                            boxShadow?: string;
                            boxShadowHover?: string;
                            boxShadowFocus?: string;
                            height?: string;
                            padding?: string;
                        };
                    };
                };
                sidebar?: {
                    foreground?: string;
                    fontFamily?: string;
                    background?: string;
                    borderColor?: string;
                    borderWidth?: string;
                    section?: {
                        form?: {
                            columnGap?: string;
                            rowGap?: string;
                            field?: {
                                label?: {
                                    foreground?: string;
                                    fontFamily?: string;
                                    fontWeight?: string;
                                };
                                input?: {
                                    foreground?: string;
                                    background?: string;
                                    backgroundSubdued?: string;
                                    foregroundSubdued?: string;
                                    borderColor?: string;
                                    borderColorHover?: string;
                                    borderColorFocus?: string;
                                    boxShadow?: string;
                                    boxShadowHover?: string;
                                    boxShadowFocus?: string;
                                    height?: string;
                                    padding?: string;
                                };
                            };
                        };
                        toggle?: {
                            foreground?: string;
                            fontFamily?: string;
                            background?: string;
                            borderColor?: string;
                            borderWidth?: string;
                            foregroundHover?: string;
                            foregroundActive?: string;
                            backgroundHover?: string;
                            backgroundActive?: string;
                            icon?: {
                                foreground?: string;
                                foregroundHover?: string;
                                foregroundActive?: string;
                            };
                        };
                    };
                };
                public?: {
                    foreground?: string;
                    background?: string;
                    foregroundAccent?: string;
                    form?: {
                        columnGap?: string;
                        rowGap?: string;
                        field?: {
                            label?: {
                                foreground?: string;
                                fontFamily?: string;
                                fontWeight?: string;
                            };
                            input?: {
                                foreground?: string;
                                background?: string;
                                backgroundSubdued?: string;
                                foregroundSubdued?: string;
                                borderColor?: string;
                                borderColorHover?: string;
                                borderColorFocus?: string;
                                boxShadow?: string;
                                boxShadowHover?: string;
                                boxShadowFocus?: string;
                                height?: string;
                                padding?: string;
                            };
                        };
                    };
                    art?: {
                        background?: string;
                        primary?: string;
                        secondary?: string;
                        speed?: string;
                    };
                };
                popover?: {
                    menu?: {
                        background?: string;
                        boxShadow?: string;
                        borderRadius?: string;
                    };
                };
                banner?: {
                    background?: string;
                    padding?: string;
                    borderRadius?: string;
                    headline?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    title?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    art?: {
                        foreground?: string;
                    };
                    avatar?: {
                        foreground?: string;
                        background?: string;
                        borderRadius?: string;
                    };
                    subtitle?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                };
            };
        }[];
    };
    registerTheme: (theme: Theme) => void;
}, "themes">, Pick<{
    themes: {
        light: {
            id: string;
            name: string;
            appearance: "light" | "dark";
            rules: {
                foreground?: string;
                background?: string;
                backgroundSubdued?: string;
                foregroundSubdued?: string;
                borderColor?: string;
                borderRadius?: string;
                borderWidth?: string;
                foregroundAccent?: string;
                backgroundNormal?: string;
                backgroundAccent?: string;
                borderColorAccent?: string;
                borderColorSubdued?: string;
                primary?: string;
                primaryBackground?: string;
                primarySubdued?: string;
                primaryAccent?: string;
                secondary?: string;
                secondaryBackground?: string;
                secondarySubdued?: string;
                secondaryAccent?: string;
                success?: string;
                successBackground?: string;
                successSubdued?: string;
                successAccent?: string;
                warning?: string;
                warningBackground?: string;
                warningSubdued?: string;
                warningAccent?: string;
                danger?: string;
                dangerBackground?: string;
                dangerSubdued?: string;
                dangerAccent?: string;
                fonts?: {
                    display?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    sans?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    serif?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    monospace?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                };
                navigation?: {
                    background?: string;
                    borderColor?: string;
                    borderWidth?: string;
                    backgroundAccent?: string;
                    project?: {
                        foreground?: string;
                        fontFamily?: string;
                        background?: string;
                        borderColor?: string;
                        borderWidth?: string;
                    };
                    modules?: {
                        background?: string;
                        borderColor?: string;
                        borderWidth?: string;
                        button?: {
                            foreground?: string;
                            background?: string;
                            foregroundHover?: string;
                            foregroundActive?: string;
                            backgroundHover?: string;
                            backgroundActive?: string;
                        };
                    };
                    list?: {
                        foreground?: string;
                        fontFamily?: string;
                        background?: string;
                        foregroundHover?: string;
                        foregroundActive?: string;
                        backgroundHover?: string;
                        backgroundActive?: string;
                        icon?: {
                            foreground?: string;
                            foregroundHover?: string;
                            foregroundActive?: string;
                        };
                        divider: {
                            borderColor?: string;
                            borderWidth?: string;
                        };
                    };
                };
                header?: {
                    background?: string;
                    borderColor?: string;
                    boxShadow?: string;
                    borderWidth?: string;
                    headline?: {
                        foreground?: string;
                        fontFamily?: string;
                    };
                    title?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                };
                form?: {
                    columnGap?: string;
                    rowGap?: string;
                    field?: {
                        label?: {
                            foreground?: string;
                            fontFamily?: string;
                            fontWeight?: string;
                        };
                        input?: {
                            foreground?: string;
                            background?: string;
                            backgroundSubdued?: string;
                            foregroundSubdued?: string;
                            borderColor?: string;
                            borderColorHover?: string;
                            borderColorFocus?: string;
                            boxShadow?: string;
                            boxShadowHover?: string;
                            boxShadowFocus?: string;
                            height?: string;
                            padding?: string;
                        };
                    };
                };
                sidebar?: {
                    foreground?: string;
                    fontFamily?: string;
                    background?: string;
                    borderColor?: string;
                    borderWidth?: string;
                    section?: {
                        form?: {
                            columnGap?: string;
                            rowGap?: string;
                            field?: {
                                label?: {
                                    foreground?: string;
                                    fontFamily?: string;
                                    fontWeight?: string;
                                };
                                input?: {
                                    foreground?: string;
                                    background?: string;
                                    backgroundSubdued?: string;
                                    foregroundSubdued?: string;
                                    borderColor?: string;
                                    borderColorHover?: string;
                                    borderColorFocus?: string;
                                    boxShadow?: string;
                                    boxShadowHover?: string;
                                    boxShadowFocus?: string;
                                    height?: string;
                                    padding?: string;
                                };
                            };
                        };
                        toggle?: {
                            foreground?: string;
                            fontFamily?: string;
                            background?: string;
                            borderColor?: string;
                            borderWidth?: string;
                            foregroundHover?: string;
                            foregroundActive?: string;
                            backgroundHover?: string;
                            backgroundActive?: string;
                            icon?: {
                                foreground?: string;
                                foregroundHover?: string;
                                foregroundActive?: string;
                            };
                        };
                    };
                };
                public?: {
                    foreground?: string;
                    background?: string;
                    foregroundAccent?: string;
                    form?: {
                        columnGap?: string;
                        rowGap?: string;
                        field?: {
                            label?: {
                                foreground?: string;
                                fontFamily?: string;
                                fontWeight?: string;
                            };
                            input?: {
                                foreground?: string;
                                background?: string;
                                backgroundSubdued?: string;
                                foregroundSubdued?: string;
                                borderColor?: string;
                                borderColorHover?: string;
                                borderColorFocus?: string;
                                boxShadow?: string;
                                boxShadowHover?: string;
                                boxShadowFocus?: string;
                                height?: string;
                                padding?: string;
                            };
                        };
                    };
                    art?: {
                        background?: string;
                        primary?: string;
                        secondary?: string;
                        speed?: string;
                    };
                };
                popover?: {
                    menu?: {
                        background?: string;
                        boxShadow?: string;
                        borderRadius?: string;
                    };
                };
                banner?: {
                    background?: string;
                    padding?: string;
                    borderRadius?: string;
                    headline?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    title?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    art?: {
                        foreground?: string;
                    };
                    avatar?: {
                        foreground?: string;
                        background?: string;
                        borderRadius?: string;
                    };
                    subtitle?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                };
            };
        }[];
        dark: {
            id: string;
            name: string;
            appearance: "light" | "dark";
            rules: {
                foreground?: string;
                background?: string;
                backgroundSubdued?: string;
                foregroundSubdued?: string;
                borderColor?: string;
                borderRadius?: string;
                borderWidth?: string;
                foregroundAccent?: string;
                backgroundNormal?: string;
                backgroundAccent?: string;
                borderColorAccent?: string;
                borderColorSubdued?: string;
                primary?: string;
                primaryBackground?: string;
                primarySubdued?: string;
                primaryAccent?: string;
                secondary?: string;
                secondaryBackground?: string;
                secondarySubdued?: string;
                secondaryAccent?: string;
                success?: string;
                successBackground?: string;
                successSubdued?: string;
                successAccent?: string;
                warning?: string;
                warningBackground?: string;
                warningSubdued?: string;
                warningAccent?: string;
                danger?: string;
                dangerBackground?: string;
                dangerSubdued?: string;
                dangerAccent?: string;
                fonts?: {
                    display?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    sans?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    serif?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    monospace?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                };
                navigation?: {
                    background?: string;
                    borderColor?: string;
                    borderWidth?: string;
                    backgroundAccent?: string;
                    project?: {
                        foreground?: string;
                        fontFamily?: string;
                        background?: string;
                        borderColor?: string;
                        borderWidth?: string;
                    };
                    modules?: {
                        background?: string;
                        borderColor?: string;
                        borderWidth?: string;
                        button?: {
                            foreground?: string;
                            background?: string;
                            foregroundHover?: string;
                            foregroundActive?: string;
                            backgroundHover?: string;
                            backgroundActive?: string;
                        };
                    };
                    list?: {
                        foreground?: string;
                        fontFamily?: string;
                        background?: string;
                        foregroundHover?: string;
                        foregroundActive?: string;
                        backgroundHover?: string;
                        backgroundActive?: string;
                        icon?: {
                            foreground?: string;
                            foregroundHover?: string;
                            foregroundActive?: string;
                        };
                        divider: {
                            borderColor?: string;
                            borderWidth?: string;
                        };
                    };
                };
                header?: {
                    background?: string;
                    borderColor?: string;
                    boxShadow?: string;
                    borderWidth?: string;
                    headline?: {
                        foreground?: string;
                        fontFamily?: string;
                    };
                    title?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                };
                form?: {
                    columnGap?: string;
                    rowGap?: string;
                    field?: {
                        label?: {
                            foreground?: string;
                            fontFamily?: string;
                            fontWeight?: string;
                        };
                        input?: {
                            foreground?: string;
                            background?: string;
                            backgroundSubdued?: string;
                            foregroundSubdued?: string;
                            borderColor?: string;
                            borderColorHover?: string;
                            borderColorFocus?: string;
                            boxShadow?: string;
                            boxShadowHover?: string;
                            boxShadowFocus?: string;
                            height?: string;
                            padding?: string;
                        };
                    };
                };
                sidebar?: {
                    foreground?: string;
                    fontFamily?: string;
                    background?: string;
                    borderColor?: string;
                    borderWidth?: string;
                    section?: {
                        form?: {
                            columnGap?: string;
                            rowGap?: string;
                            field?: {
                                label?: {
                                    foreground?: string;
                                    fontFamily?: string;
                                    fontWeight?: string;
                                };
                                input?: {
                                    foreground?: string;
                                    background?: string;
                                    backgroundSubdued?: string;
                                    foregroundSubdued?: string;
                                    borderColor?: string;
                                    borderColorHover?: string;
                                    borderColorFocus?: string;
                                    boxShadow?: string;
                                    boxShadowHover?: string;
                                    boxShadowFocus?: string;
                                    height?: string;
                                    padding?: string;
                                };
                            };
                        };
                        toggle?: {
                            foreground?: string;
                            fontFamily?: string;
                            background?: string;
                            borderColor?: string;
                            borderWidth?: string;
                            foregroundHover?: string;
                            foregroundActive?: string;
                            backgroundHover?: string;
                            backgroundActive?: string;
                            icon?: {
                                foreground?: string;
                                foregroundHover?: string;
                                foregroundActive?: string;
                            };
                        };
                    };
                };
                public?: {
                    foreground?: string;
                    background?: string;
                    foregroundAccent?: string;
                    form?: {
                        columnGap?: string;
                        rowGap?: string;
                        field?: {
                            label?: {
                                foreground?: string;
                                fontFamily?: string;
                                fontWeight?: string;
                            };
                            input?: {
                                foreground?: string;
                                background?: string;
                                backgroundSubdued?: string;
                                foregroundSubdued?: string;
                                borderColor?: string;
                                borderColorHover?: string;
                                borderColorFocus?: string;
                                boxShadow?: string;
                                boxShadowHover?: string;
                                boxShadowFocus?: string;
                                height?: string;
                                padding?: string;
                            };
                        };
                    };
                    art?: {
                        background?: string;
                        primary?: string;
                        secondary?: string;
                        speed?: string;
                    };
                };
                popover?: {
                    menu?: {
                        background?: string;
                        boxShadow?: string;
                        borderRadius?: string;
                    };
                };
                banner?: {
                    background?: string;
                    padding?: string;
                    borderRadius?: string;
                    headline?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    title?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    art?: {
                        foreground?: string;
                    };
                    avatar?: {
                        foreground?: string;
                        background?: string;
                        borderRadius?: string;
                    };
                    subtitle?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                };
            };
        }[];
    };
    registerTheme: (theme: Theme) => void;
}, never>, Pick<{
    themes: {
        light: {
            id: string;
            name: string;
            appearance: "light" | "dark";
            rules: {
                foreground?: string;
                background?: string;
                backgroundSubdued?: string;
                foregroundSubdued?: string;
                borderColor?: string;
                borderRadius?: string;
                borderWidth?: string;
                foregroundAccent?: string;
                backgroundNormal?: string;
                backgroundAccent?: string;
                borderColorAccent?: string;
                borderColorSubdued?: string;
                primary?: string;
                primaryBackground?: string;
                primarySubdued?: string;
                primaryAccent?: string;
                secondary?: string;
                secondaryBackground?: string;
                secondarySubdued?: string;
                secondaryAccent?: string;
                success?: string;
                successBackground?: string;
                successSubdued?: string;
                successAccent?: string;
                warning?: string;
                warningBackground?: string;
                warningSubdued?: string;
                warningAccent?: string;
                danger?: string;
                dangerBackground?: string;
                dangerSubdued?: string;
                dangerAccent?: string;
                fonts?: {
                    display?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    sans?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    serif?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    monospace?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                };
                navigation?: {
                    background?: string;
                    borderColor?: string;
                    borderWidth?: string;
                    backgroundAccent?: string;
                    project?: {
                        foreground?: string;
                        fontFamily?: string;
                        background?: string;
                        borderColor?: string;
                        borderWidth?: string;
                    };
                    modules?: {
                        background?: string;
                        borderColor?: string;
                        borderWidth?: string;
                        button?: {
                            foreground?: string;
                            background?: string;
                            foregroundHover?: string;
                            foregroundActive?: string;
                            backgroundHover?: string;
                            backgroundActive?: string;
                        };
                    };
                    list?: {
                        foreground?: string;
                        fontFamily?: string;
                        background?: string;
                        foregroundHover?: string;
                        foregroundActive?: string;
                        backgroundHover?: string;
                        backgroundActive?: string;
                        icon?: {
                            foreground?: string;
                            foregroundHover?: string;
                            foregroundActive?: string;
                        };
                        divider: {
                            borderColor?: string;
                            borderWidth?: string;
                        };
                    };
                };
                header?: {
                    background?: string;
                    borderColor?: string;
                    boxShadow?: string;
                    borderWidth?: string;
                    headline?: {
                        foreground?: string;
                        fontFamily?: string;
                    };
                    title?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                };
                form?: {
                    columnGap?: string;
                    rowGap?: string;
                    field?: {
                        label?: {
                            foreground?: string;
                            fontFamily?: string;
                            fontWeight?: string;
                        };
                        input?: {
                            foreground?: string;
                            background?: string;
                            backgroundSubdued?: string;
                            foregroundSubdued?: string;
                            borderColor?: string;
                            borderColorHover?: string;
                            borderColorFocus?: string;
                            boxShadow?: string;
                            boxShadowHover?: string;
                            boxShadowFocus?: string;
                            height?: string;
                            padding?: string;
                        };
                    };
                };
                sidebar?: {
                    foreground?: string;
                    fontFamily?: string;
                    background?: string;
                    borderColor?: string;
                    borderWidth?: string;
                    section?: {
                        form?: {
                            columnGap?: string;
                            rowGap?: string;
                            field?: {
                                label?: {
                                    foreground?: string;
                                    fontFamily?: string;
                                    fontWeight?: string;
                                };
                                input?: {
                                    foreground?: string;
                                    background?: string;
                                    backgroundSubdued?: string;
                                    foregroundSubdued?: string;
                                    borderColor?: string;
                                    borderColorHover?: string;
                                    borderColorFocus?: string;
                                    boxShadow?: string;
                                    boxShadowHover?: string;
                                    boxShadowFocus?: string;
                                    height?: string;
                                    padding?: string;
                                };
                            };
                        };
                        toggle?: {
                            foreground?: string;
                            fontFamily?: string;
                            background?: string;
                            borderColor?: string;
                            borderWidth?: string;
                            foregroundHover?: string;
                            foregroundActive?: string;
                            backgroundHover?: string;
                            backgroundActive?: string;
                            icon?: {
                                foreground?: string;
                                foregroundHover?: string;
                                foregroundActive?: string;
                            };
                        };
                    };
                };
                public?: {
                    foreground?: string;
                    background?: string;
                    foregroundAccent?: string;
                    form?: {
                        columnGap?: string;
                        rowGap?: string;
                        field?: {
                            label?: {
                                foreground?: string;
                                fontFamily?: string;
                                fontWeight?: string;
                            };
                            input?: {
                                foreground?: string;
                                background?: string;
                                backgroundSubdued?: string;
                                foregroundSubdued?: string;
                                borderColor?: string;
                                borderColorHover?: string;
                                borderColorFocus?: string;
                                boxShadow?: string;
                                boxShadowHover?: string;
                                boxShadowFocus?: string;
                                height?: string;
                                padding?: string;
                            };
                        };
                    };
                    art?: {
                        background?: string;
                        primary?: string;
                        secondary?: string;
                        speed?: string;
                    };
                };
                popover?: {
                    menu?: {
                        background?: string;
                        boxShadow?: string;
                        borderRadius?: string;
                    };
                };
                banner?: {
                    background?: string;
                    padding?: string;
                    borderRadius?: string;
                    headline?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    title?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    art?: {
                        foreground?: string;
                    };
                    avatar?: {
                        foreground?: string;
                        background?: string;
                        borderRadius?: string;
                    };
                    subtitle?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                };
            };
        }[];
        dark: {
            id: string;
            name: string;
            appearance: "light" | "dark";
            rules: {
                foreground?: string;
                background?: string;
                backgroundSubdued?: string;
                foregroundSubdued?: string;
                borderColor?: string;
                borderRadius?: string;
                borderWidth?: string;
                foregroundAccent?: string;
                backgroundNormal?: string;
                backgroundAccent?: string;
                borderColorAccent?: string;
                borderColorSubdued?: string;
                primary?: string;
                primaryBackground?: string;
                primarySubdued?: string;
                primaryAccent?: string;
                secondary?: string;
                secondaryBackground?: string;
                secondarySubdued?: string;
                secondaryAccent?: string;
                success?: string;
                successBackground?: string;
                successSubdued?: string;
                successAccent?: string;
                warning?: string;
                warningBackground?: string;
                warningSubdued?: string;
                warningAccent?: string;
                danger?: string;
                dangerBackground?: string;
                dangerSubdued?: string;
                dangerAccent?: string;
                fonts?: {
                    display?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    sans?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    serif?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    monospace?: {
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                };
                navigation?: {
                    background?: string;
                    borderColor?: string;
                    borderWidth?: string;
                    backgroundAccent?: string;
                    project?: {
                        foreground?: string;
                        fontFamily?: string;
                        background?: string;
                        borderColor?: string;
                        borderWidth?: string;
                    };
                    modules?: {
                        background?: string;
                        borderColor?: string;
                        borderWidth?: string;
                        button?: {
                            foreground?: string;
                            background?: string;
                            foregroundHover?: string;
                            foregroundActive?: string;
                            backgroundHover?: string;
                            backgroundActive?: string;
                        };
                    };
                    list?: {
                        foreground?: string;
                        fontFamily?: string;
                        background?: string;
                        foregroundHover?: string;
                        foregroundActive?: string;
                        backgroundHover?: string;
                        backgroundActive?: string;
                        icon?: {
                            foreground?: string;
                            foregroundHover?: string;
                            foregroundActive?: string;
                        };
                        divider: {
                            borderColor?: string;
                            borderWidth?: string;
                        };
                    };
                };
                header?: {
                    background?: string;
                    borderColor?: string;
                    boxShadow?: string;
                    borderWidth?: string;
                    headline?: {
                        foreground?: string;
                        fontFamily?: string;
                    };
                    title?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                };
                form?: {
                    columnGap?: string;
                    rowGap?: string;
                    field?: {
                        label?: {
                            foreground?: string;
                            fontFamily?: string;
                            fontWeight?: string;
                        };
                        input?: {
                            foreground?: string;
                            background?: string;
                            backgroundSubdued?: string;
                            foregroundSubdued?: string;
                            borderColor?: string;
                            borderColorHover?: string;
                            borderColorFocus?: string;
                            boxShadow?: string;
                            boxShadowHover?: string;
                            boxShadowFocus?: string;
                            height?: string;
                            padding?: string;
                        };
                    };
                };
                sidebar?: {
                    foreground?: string;
                    fontFamily?: string;
                    background?: string;
                    borderColor?: string;
                    borderWidth?: string;
                    section?: {
                        form?: {
                            columnGap?: string;
                            rowGap?: string;
                            field?: {
                                label?: {
                                    foreground?: string;
                                    fontFamily?: string;
                                    fontWeight?: string;
                                };
                                input?: {
                                    foreground?: string;
                                    background?: string;
                                    backgroundSubdued?: string;
                                    foregroundSubdued?: string;
                                    borderColor?: string;
                                    borderColorHover?: string;
                                    borderColorFocus?: string;
                                    boxShadow?: string;
                                    boxShadowHover?: string;
                                    boxShadowFocus?: string;
                                    height?: string;
                                    padding?: string;
                                };
                            };
                        };
                        toggle?: {
                            foreground?: string;
                            fontFamily?: string;
                            background?: string;
                            borderColor?: string;
                            borderWidth?: string;
                            foregroundHover?: string;
                            foregroundActive?: string;
                            backgroundHover?: string;
                            backgroundActive?: string;
                            icon?: {
                                foreground?: string;
                                foregroundHover?: string;
                                foregroundActive?: string;
                            };
                        };
                    };
                };
                public?: {
                    foreground?: string;
                    background?: string;
                    foregroundAccent?: string;
                    form?: {
                        columnGap?: string;
                        rowGap?: string;
                        field?: {
                            label?: {
                                foreground?: string;
                                fontFamily?: string;
                                fontWeight?: string;
                            };
                            input?: {
                                foreground?: string;
                                background?: string;
                                backgroundSubdued?: string;
                                foregroundSubdued?: string;
                                borderColor?: string;
                                borderColorHover?: string;
                                borderColorFocus?: string;
                                boxShadow?: string;
                                boxShadowHover?: string;
                                boxShadowFocus?: string;
                                height?: string;
                                padding?: string;
                            };
                        };
                    };
                    art?: {
                        background?: string;
                        primary?: string;
                        secondary?: string;
                        speed?: string;
                    };
                };
                popover?: {
                    menu?: {
                        background?: string;
                        boxShadow?: string;
                        borderRadius?: string;
                    };
                };
                banner?: {
                    background?: string;
                    padding?: string;
                    borderRadius?: string;
                    headline?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    title?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                    art?: {
                        foreground?: string;
                    };
                    avatar?: {
                        foreground?: string;
                        background?: string;
                        borderRadius?: string;
                    };
                    subtitle?: {
                        foreground?: string;
                        fontFamily?: string;
                        fontWeight?: string;
                    };
                };
            };
        }[];
    };
    registerTheme: (theme: Theme) => void;
}, "registerTheme">>;
