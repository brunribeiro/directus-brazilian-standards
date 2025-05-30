import { Static } from '@sinclair/typebox';
export declare const ThemeSchema: import('@sinclair/typebox').TObject<{
    id: import('@sinclair/typebox').TString;
    name: import('@sinclair/typebox').TString;
    appearance: import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TLiteral<"light">, import('@sinclair/typebox').TLiteral<"dark">]>;
    rules: import('@sinclair/typebox').TObject<{
        borderRadius: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>, import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>]>>;
        borderWidth: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TString, import('@sinclair/typebox').TLiteral<"thin">, import('@sinclair/typebox').TLiteral<"medium">, import('@sinclair/typebox').TLiteral<"thick">]>>>;
        foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        foregroundSubdued: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        foregroundAccent: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        background: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        backgroundNormal: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        backgroundAccent: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        backgroundSubdued: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        borderColor: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        borderColorAccent: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        borderColorSubdued: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        primary: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        primaryBackground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        primarySubdued: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        primaryAccent: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        secondary: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        secondaryBackground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        secondarySubdued: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        secondaryAccent: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        success: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        successBackground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        successSubdued: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        successAccent: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        warning: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        warningBackground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        warningSubdued: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        warningAccent: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        danger: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        dangerBackground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        dangerSubdued: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        dangerAccent: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
        fonts: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
            display: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                fontFamily: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                fontWeight: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            }>>;
            sans: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                fontFamily: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                fontWeight: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            }>>;
            serif: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                fontFamily: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                fontWeight: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            }>>;
            monospace: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                fontFamily: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                fontWeight: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            }>>;
        }>>;
        navigation: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
            background: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            backgroundAccent: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            borderWidth: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TString, import('@sinclair/typebox').TLiteral<"thin">, import('@sinclair/typebox').TLiteral<"medium">, import('@sinclair/typebox').TLiteral<"thick">]>>>;
            borderColor: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            project: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                background: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                fontFamily: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                borderWidth: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TString, import('@sinclair/typebox').TLiteral<"thin">, import('@sinclair/typebox').TLiteral<"medium">, import('@sinclair/typebox').TLiteral<"thick">]>>>;
                borderColor: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            }>>;
            modules: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                background: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                borderWidth: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TString, import('@sinclair/typebox').TLiteral<"thin">, import('@sinclair/typebox').TLiteral<"medium">, import('@sinclair/typebox').TLiteral<"thick">]>>>;
                borderColor: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                button: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                    foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    foregroundHover: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    foregroundActive: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    background: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    backgroundHover: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    backgroundActive: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                }>>;
            }>>;
            list: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                icon: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                    foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    foregroundHover: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    foregroundActive: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                }>>;
                foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                foregroundHover: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                foregroundActive: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                background: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                backgroundHover: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                backgroundActive: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                fontFamily: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                divider: import('@sinclair/typebox').TObject<{
                    borderColor: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    borderWidth: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TString, import('@sinclair/typebox').TLiteral<"thin">, import('@sinclair/typebox').TLiteral<"medium">, import('@sinclair/typebox').TLiteral<"thick">]>>>;
                }>;
            }>>;
        }>>;
        header: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
            background: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            borderWidth: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TString, import('@sinclair/typebox').TLiteral<"thin">, import('@sinclair/typebox').TLiteral<"medium">, import('@sinclair/typebox').TLiteral<"thick">]>>>;
            borderColor: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            boxShadow: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            headline: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                fontFamily: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            }>>;
            title: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                fontFamily: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                fontWeight: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            }>>;
        }>>;
        form: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
            columnGap: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>, import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>]>>;
            rowGap: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>, import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>]>>;
            field: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                label: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                    foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    fontFamily: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    fontWeight: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                }>>;
                input: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                    background: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    backgroundSubdued: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    foregroundSubdued: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    borderColor: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    borderColorHover: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    borderColorFocus: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    boxShadow: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    boxShadowHover: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    boxShadowFocus: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    height: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    padding: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>, import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>]>>;
                }>>;
            }>>;
        }>>;
        sidebar: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
            background: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            fontFamily: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            borderWidth: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TString, import('@sinclair/typebox').TLiteral<"thin">, import('@sinclair/typebox').TLiteral<"medium">, import('@sinclair/typebox').TLiteral<"thick">]>>>;
            borderColor: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            section: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                toggle: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                    icon: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                        foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                        foregroundHover: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                        foregroundActive: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    }>>;
                    foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    foregroundHover: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    foregroundActive: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    background: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    backgroundHover: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    backgroundActive: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    fontFamily: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    borderWidth: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TString, import('@sinclair/typebox').TLiteral<"thin">, import('@sinclair/typebox').TLiteral<"medium">, import('@sinclair/typebox').TLiteral<"thick">]>>>;
                    borderColor: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                }>>;
                form: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                    columnGap: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>, import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>]>>;
                    rowGap: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>, import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>]>>;
                    field: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                        label: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                            foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                            fontFamily: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                            fontWeight: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                        }>>;
                        input: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                            background: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                            backgroundSubdued: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                            foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                            foregroundSubdued: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                            borderColor: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                            borderColorHover: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                            borderColorFocus: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                            boxShadow: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                            boxShadowHover: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                            boxShadowFocus: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                            height: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                            padding: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>, import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>]>>;
                        }>>;
                    }>>;
                }>>;
            }>>;
        }>>;
        public: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
            background: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            foregroundAccent: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            art: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                background: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                primary: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                secondary: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                speed: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            }>>;
            form: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                columnGap: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>, import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>]>>;
                rowGap: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>, import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>]>>;
                field: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                    label: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                        foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                        fontFamily: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                        fontWeight: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                    }>>;
                    input: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                        background: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                        backgroundSubdued: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                        foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                        foregroundSubdued: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                        borderColor: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                        borderColorHover: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                        borderColorFocus: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                        boxShadow: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                        boxShadowHover: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                        boxShadowFocus: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                        height: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                        padding: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>, import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>]>>;
                    }>>;
                }>>;
            }>>;
        }>>;
        popover: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
            menu: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                background: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                borderRadius: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>, import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>]>>;
                boxShadow: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            }>>;
        }>>;
        banner: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
            background: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            padding: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>, import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>]>>;
            borderRadius: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>, import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>]>>;
            avatar: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                background: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                borderRadius: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>, import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>]>>;
            }>>;
            headline: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                fontFamily: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                fontWeight: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            }>>;
            title: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                fontFamily: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                fontWeight: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            }>>;
            subtitle: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                fontFamily: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
                fontWeight: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            }>>;
            art: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TObject<{
                foreground: import('@sinclair/typebox').TOptional<import('@sinclair/typebox').TRefUnsafe<import('@sinclair/typebox').TString>>;
            }>>;
        }>>;
    }>;
}>;
export declare const Definitions: {
    $defs: {
        Color: import('@sinclair/typebox').TString;
        FamilyName: import('@sinclair/typebox').TString;
        Length: import('@sinclair/typebox').TString;
        Percentage: import('@sinclair/typebox').TString;
        LineWidth: import('@sinclair/typebox').TUnion<[import('@sinclair/typebox').TString, import('@sinclair/typebox').TLiteral<"thin">, import('@sinclair/typebox').TLiteral<"medium">, import('@sinclair/typebox').TLiteral<"thick">]>;
        BoxShadow: import('@sinclair/typebox').TString;
        Size: import('@sinclair/typebox').TString;
        Number: import('@sinclair/typebox').TString;
    };
};
export type Theme = Static<typeof ThemeSchema>;
