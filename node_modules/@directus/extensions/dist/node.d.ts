import { z } from 'zod';
import { SchemaOverview, DeepPartial, Field, Relation, Collection, Type, LocalType, Filter, User, CollectionAccess, FlowRaw, Accountability, Query, FilterHandler, ActionHandler, InitHandler, ScheduleHandler, EmbedHandler, Prettify } from '@directus/types';
import { Knex } from 'knex';
import { Logger } from 'pino';
import { Theme } from '@directus/themes';
import { Component, ComponentOptions } from 'vue';
import { LOCAL_TYPES } from '@directus/constants';
import { RouteRecordRaw } from 'vue-router';
import { Router } from 'express';

type ApiExtensionContext = {
    services: any;
    database: Knex;
    env: Record<string, any>;
    logger: Logger;
    getSchema: (options?: {
        database?: Knex;
        bypassCache?: boolean;
    }, attempt?: number) => Promise<SchemaOverview>;
};

declare const APP_EXTENSION_TYPES: readonly ["interface", "display", "layout", "module", "panel", "theme"];
declare const API_EXTENSION_TYPES: readonly ["hook", "endpoint"];
declare const HYBRID_EXTENSION_TYPES: readonly ["operation"];
declare const BUNDLE_EXTENSION_TYPES: readonly ["bundle"];
declare const EXTENSION_TYPES: readonly ["interface", "display", "layout", "module", "panel", "theme", "hook", "endpoint", "operation", "bundle"];
declare const NESTED_EXTENSION_TYPES: readonly ["interface", "display", "layout", "module", "panel", "theme", "hook", "endpoint", "operation"];
declare const APP_OR_HYBRID_EXTENSION_TYPES: readonly ["interface", "display", "layout", "module", "panel", "theme", "operation"];
declare const APP_OR_HYBRID_EXTENSION_PACKAGE_TYPES: readonly ["interface", "display", "layout", "module", "panel", "theme", "operation", "bundle"];

declare const EXTENSION_LANGUAGES: readonly ["javascript", "typescript"];

declare const EXTENSION_PKG_KEY = "directus:extension";

/**
 * Dependencies that we guarantee are available in the global scope of the app's bundle when app
 * extensions are used. These are virtually rewritten to use the existing bundled instances in the
 * global scope rather than local copies
 */
declare const APP_SHARED_DEPS: string[];
/**
 * Dependencies that we guarantee are available in the node_modules of the API when API extensions
 * are used. The `directus:*` extensions are virtual entrypoints available in the sandbox
 */
declare const API_SHARED_DEPS: string[];

declare const ExtensionManifest: z.ZodObject<{
    name: z.ZodString;
    version: z.ZodString;
    type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"module">, z.ZodLiteral<"commonjs">]>>;
    description: z.ZodOptional<z.ZodString>;
    icon: z.ZodOptional<z.ZodString>;
    dependencies: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    devDependencies: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    "directus:extension": z.ZodIntersection<z.ZodObject<{
        host: z.ZodString;
        hidden: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        host: string;
        hidden?: boolean | undefined;
    }, {
        host: string;
        hidden?: boolean | undefined;
    }>, z.ZodUnion<[z.ZodObject<{
        type: z.ZodEnum<["interface", "display", "layout", "module", "panel", "theme"]>;
        path: z.ZodString;
        source: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        path: string;
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
        source: string;
    }, {
        path: string;
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
        source: string;
    }>, z.ZodObject<{
        type: z.ZodEnum<["hook", "endpoint"]>;
        path: z.ZodString;
        source: z.ZodString;
        sandbox: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodBoolean;
            requestedScopes: z.ZodObject<{
                request: z.ZodOptional<z.ZodObject<{
                    urls: z.ZodArray<z.ZodString, "many">;
                    methods: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"GET">, z.ZodLiteral<"POST">, z.ZodLiteral<"PATCH">, z.ZodLiteral<"PUT">, z.ZodLiteral<"DELETE">]>, "many">;
                }, "strip", z.ZodTypeAny, {
                    urls: string[];
                    methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
                }, {
                    urls: string[];
                    methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
                }>>;
                log: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                sleep: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                request?: {
                    urls: string[];
                    methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
                } | undefined;
                log?: {} | undefined;
                sleep?: {} | undefined;
            }, {
                request?: {
                    urls: string[];
                    methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
                } | undefined;
                log?: {} | undefined;
                sleep?: {} | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            requestedScopes: {
                request?: {
                    urls: string[];
                    methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
                } | undefined;
                log?: {} | undefined;
                sleep?: {} | undefined;
            };
        }, {
            enabled: boolean;
            requestedScopes: {
                request?: {
                    urls: string[];
                    methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
                } | undefined;
                log?: {} | undefined;
                sleep?: {} | undefined;
            };
        }>>;
    }, "strip", z.ZodTypeAny, {
        path: string;
        type: "hook" | "endpoint";
        source: string;
        sandbox?: {
            enabled: boolean;
            requestedScopes: {
                request?: {
                    urls: string[];
                    methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
                } | undefined;
                log?: {} | undefined;
                sleep?: {} | undefined;
            };
        } | undefined;
    }, {
        path: string;
        type: "hook" | "endpoint";
        source: string;
        sandbox?: {
            enabled: boolean;
            requestedScopes: {
                request?: {
                    urls: string[];
                    methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
                } | undefined;
                log?: {} | undefined;
                sleep?: {} | undefined;
            };
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodEnum<["operation"]>;
        path: z.ZodObject<{
            app: z.ZodString;
            api: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            app: string;
            api: string;
        }, {
            app: string;
            api: string;
        }>;
        source: z.ZodObject<{
            app: z.ZodString;
            api: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            app: string;
            api: string;
        }, {
            app: string;
            api: string;
        }>;
        sandbox: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodBoolean;
            requestedScopes: z.ZodObject<{
                request: z.ZodOptional<z.ZodObject<{
                    urls: z.ZodArray<z.ZodString, "many">;
                    methods: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"GET">, z.ZodLiteral<"POST">, z.ZodLiteral<"PATCH">, z.ZodLiteral<"PUT">, z.ZodLiteral<"DELETE">]>, "many">;
                }, "strip", z.ZodTypeAny, {
                    urls: string[];
                    methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
                }, {
                    urls: string[];
                    methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
                }>>;
                log: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
                sleep: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            }, "strip", z.ZodTypeAny, {
                request?: {
                    urls: string[];
                    methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
                } | undefined;
                log?: {} | undefined;
                sleep?: {} | undefined;
            }, {
                request?: {
                    urls: string[];
                    methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
                } | undefined;
                log?: {} | undefined;
                sleep?: {} | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            requestedScopes: {
                request?: {
                    urls: string[];
                    methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
                } | undefined;
                log?: {} | undefined;
                sleep?: {} | undefined;
            };
        }, {
            enabled: boolean;
            requestedScopes: {
                request?: {
                    urls: string[];
                    methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
                } | undefined;
                log?: {} | undefined;
                sleep?: {} | undefined;
            };
        }>>;
    }, "strip", z.ZodTypeAny, {
        path: {
            app: string;
            api: string;
        };
        type: "operation";
        source: {
            app: string;
            api: string;
        };
        sandbox?: {
            enabled: boolean;
            requestedScopes: {
                request?: {
                    urls: string[];
                    methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
                } | undefined;
                log?: {} | undefined;
                sleep?: {} | undefined;
            };
        } | undefined;
    }, {
        path: {
            app: string;
            api: string;
        };
        type: "operation";
        source: {
            app: string;
            api: string;
        };
        sandbox?: {
            enabled: boolean;
            requestedScopes: {
                request?: {
                    urls: string[];
                    methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
                } | undefined;
                log?: {} | undefined;
                sleep?: {} | undefined;
            };
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"bundle">;
        partial: z.ZodOptional<z.ZodBoolean>;
        path: z.ZodObject<{
            app: z.ZodString;
            api: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            app: string;
            api: string;
        }, {
            app: string;
            api: string;
        }>;
        entries: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            type: z.ZodEnum<["hook", "endpoint"]>;
            name: z.ZodString;
            source: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "hook" | "endpoint";
            name: string;
            source: string;
        }, {
            type: "hook" | "endpoint";
            name: string;
            source: string;
        }>, z.ZodObject<{
            type: z.ZodEnum<["interface", "display", "layout", "module", "panel", "theme"]>;
            name: z.ZodString;
            source: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
            name: string;
            source: string;
        }, {
            type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
            name: string;
            source: string;
        }>, z.ZodObject<{
            type: z.ZodEnum<["operation"]>;
            name: z.ZodString;
            source: z.ZodObject<{
                app: z.ZodString;
                api: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                app: string;
                api: string;
            }, {
                app: string;
                api: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "operation";
            name: string;
            source: {
                app: string;
                api: string;
            };
        }, {
            type: "operation";
            name: string;
            source: {
                app: string;
                api: string;
            };
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        path: {
            app: string;
            api: string;
        };
        type: "bundle";
        entries: ({
            type: "hook" | "endpoint";
            name: string;
            source: string;
        } | {
            type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
            name: string;
            source: string;
        } | {
            type: "operation";
            name: string;
            source: {
                app: string;
                api: string;
            };
        })[];
        partial?: boolean | undefined;
    }, {
        path: {
            app: string;
            api: string;
        };
        type: "bundle";
        entries: ({
            type: "hook" | "endpoint";
            name: string;
            source: string;
        } | {
            type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
            name: string;
            source: string;
        } | {
            type: "operation";
            name: string;
            source: {
                app: string;
                api: string;
            };
        })[];
        partial?: boolean | undefined;
    }>]>>;
}, "strip", z.ZodTypeAny, {
    "directus:extension": {
        host: string;
        hidden?: boolean | undefined;
    } & ({
        path: string;
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
        source: string;
    } | {
        path: string;
        type: "hook" | "endpoint";
        source: string;
        sandbox?: {
            enabled: boolean;
            requestedScopes: {
                request?: {
                    urls: string[];
                    methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
                } | undefined;
                log?: {} | undefined;
                sleep?: {} | undefined;
            };
        } | undefined;
    } | {
        path: {
            app: string;
            api: string;
        };
        type: "operation";
        source: {
            app: string;
            api: string;
        };
        sandbox?: {
            enabled: boolean;
            requestedScopes: {
                request?: {
                    urls: string[];
                    methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
                } | undefined;
                log?: {} | undefined;
                sleep?: {} | undefined;
            };
        } | undefined;
    } | {
        path: {
            app: string;
            api: string;
        };
        type: "bundle";
        entries: ({
            type: "hook" | "endpoint";
            name: string;
            source: string;
        } | {
            type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
            name: string;
            source: string;
        } | {
            type: "operation";
            name: string;
            source: {
                app: string;
                api: string;
            };
        })[];
        partial?: boolean | undefined;
    });
    name: string;
    version: string;
    type?: "module" | "commonjs" | undefined;
    description?: string | undefined;
    icon?: string | undefined;
    dependencies?: Record<string, string> | undefined;
    devDependencies?: Record<string, string> | undefined;
}, {
    "directus:extension": {
        host: string;
        hidden?: boolean | undefined;
    } & ({
        path: string;
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
        source: string;
    } | {
        path: string;
        type: "hook" | "endpoint";
        source: string;
        sandbox?: {
            enabled: boolean;
            requestedScopes: {
                request?: {
                    urls: string[];
                    methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
                } | undefined;
                log?: {} | undefined;
                sleep?: {} | undefined;
            };
        } | undefined;
    } | {
        path: {
            app: string;
            api: string;
        };
        type: "operation";
        source: {
            app: string;
            api: string;
        };
        sandbox?: {
            enabled: boolean;
            requestedScopes: {
                request?: {
                    urls: string[];
                    methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
                } | undefined;
                log?: {} | undefined;
                sleep?: {} | undefined;
            };
        } | undefined;
    } | {
        path: {
            app: string;
            api: string;
        };
        type: "bundle";
        entries: ({
            type: "hook" | "endpoint";
            name: string;
            source: string;
        } | {
            type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
            name: string;
            source: string;
        } | {
            type: "operation";
            name: string;
            source: {
                app: string;
                api: string;
            };
        })[];
        partial?: boolean | undefined;
    });
    name: string;
    version: string;
    type?: "module" | "commonjs" | undefined;
    description?: string | undefined;
    icon?: string | undefined;
    dependencies?: Record<string, string> | undefined;
    devDependencies?: Record<string, string> | undefined;
}>;
type ExtensionManifest = z.infer<typeof ExtensionManifest>;

declare const SplitEntrypoint: z.ZodObject<{
    app: z.ZodString;
    api: z.ZodString;
}, "strip", z.ZodTypeAny, {
    app: string;
    api: string;
}, {
    app: string;
    api: string;
}>;
type SplitEntrypoint = z.infer<typeof SplitEntrypoint>;
declare const ExtensionSandboxOptions: z.ZodOptional<z.ZodObject<{
    enabled: z.ZodBoolean;
    requestedScopes: z.ZodObject<{
        request: z.ZodOptional<z.ZodObject<{
            urls: z.ZodArray<z.ZodString, "many">;
            methods: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"GET">, z.ZodLiteral<"POST">, z.ZodLiteral<"PATCH">, z.ZodLiteral<"PUT">, z.ZodLiteral<"DELETE">]>, "many">;
        }, "strip", z.ZodTypeAny, {
            urls: string[];
            methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
        }, {
            urls: string[];
            methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
        }>>;
        log: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        sleep: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strip", z.ZodTypeAny, {
        request?: {
            urls: string[];
            methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
        } | undefined;
        log?: {} | undefined;
        sleep?: {} | undefined;
    }, {
        request?: {
            urls: string[];
            methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
        } | undefined;
        log?: {} | undefined;
        sleep?: {} | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    requestedScopes: {
        request?: {
            urls: string[];
            methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
        } | undefined;
        log?: {} | undefined;
        sleep?: {} | undefined;
    };
}, {
    enabled: boolean;
    requestedScopes: {
        request?: {
            urls: string[];
            methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
        } | undefined;
        log?: {} | undefined;
        sleep?: {} | undefined;
    };
}>>;
type ExtensionSandboxOptions = z.infer<typeof ExtensionSandboxOptions>;
declare const ExtensionSandboxRequestedScopes: z.ZodObject<{
    request: z.ZodOptional<z.ZodObject<{
        urls: z.ZodArray<z.ZodString, "many">;
        methods: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"GET">, z.ZodLiteral<"POST">, z.ZodLiteral<"PATCH">, z.ZodLiteral<"PUT">, z.ZodLiteral<"DELETE">]>, "many">;
    }, "strip", z.ZodTypeAny, {
        urls: string[];
        methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
    }, {
        urls: string[];
        methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
    }>>;
    log: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    sleep: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
}, "strip", z.ZodTypeAny, {
    request?: {
        urls: string[];
        methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
    } | undefined;
    log?: {} | undefined;
    sleep?: {} | undefined;
}, {
    request?: {
        urls: string[];
        methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
    } | undefined;
    log?: {} | undefined;
    sleep?: {} | undefined;
}>;
type ExtensionSandboxRequestedScopes = z.infer<typeof ExtensionSandboxRequestedScopes>;
declare const ExtensionOptionsBundleEntry: z.ZodUnion<[z.ZodObject<{
    type: z.ZodEnum<["hook", "endpoint"]>;
    name: z.ZodString;
    source: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "hook" | "endpoint";
    name: string;
    source: string;
}, {
    type: "hook" | "endpoint";
    name: string;
    source: string;
}>, z.ZodObject<{
    type: z.ZodEnum<["interface", "display", "layout", "module", "panel", "theme"]>;
    name: z.ZodString;
    source: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
    name: string;
    source: string;
}, {
    type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
    name: string;
    source: string;
}>, z.ZodObject<{
    type: z.ZodEnum<["operation"]>;
    name: z.ZodString;
    source: z.ZodObject<{
        app: z.ZodString;
        api: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        app: string;
        api: string;
    }, {
        app: string;
        api: string;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "operation";
    name: string;
    source: {
        app: string;
        api: string;
    };
}, {
    type: "operation";
    name: string;
    source: {
        app: string;
        api: string;
    };
}>]>;
type ExtensionOptionsBundleEntry = z.infer<typeof ExtensionOptionsBundleEntry>;
declare const ExtensionOptionsBase: z.ZodObject<{
    host: z.ZodString;
    hidden: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    host: string;
    hidden?: boolean | undefined;
}, {
    host: string;
    hidden?: boolean | undefined;
}>;
declare const ExtensionOptionsApp: z.ZodObject<{
    type: z.ZodEnum<["interface", "display", "layout", "module", "panel", "theme"]>;
    path: z.ZodString;
    source: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
    type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
    source: string;
}, {
    path: string;
    type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
    source: string;
}>;
declare const ExtensionOptionsApi: z.ZodObject<{
    type: z.ZodEnum<["hook", "endpoint"]>;
    path: z.ZodString;
    source: z.ZodString;
    sandbox: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodBoolean;
        requestedScopes: z.ZodObject<{
            request: z.ZodOptional<z.ZodObject<{
                urls: z.ZodArray<z.ZodString, "many">;
                methods: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"GET">, z.ZodLiteral<"POST">, z.ZodLiteral<"PATCH">, z.ZodLiteral<"PUT">, z.ZodLiteral<"DELETE">]>, "many">;
            }, "strip", z.ZodTypeAny, {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            }, {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            }>>;
            log: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            sleep: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        }, "strip", z.ZodTypeAny, {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        }, {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        requestedScopes: {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        };
    }, {
        enabled: boolean;
        requestedScopes: {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        };
    }>>;
}, "strip", z.ZodTypeAny, {
    path: string;
    type: "hook" | "endpoint";
    source: string;
    sandbox?: {
        enabled: boolean;
        requestedScopes: {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        };
    } | undefined;
}, {
    path: string;
    type: "hook" | "endpoint";
    source: string;
    sandbox?: {
        enabled: boolean;
        requestedScopes: {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        };
    } | undefined;
}>;
declare const ExtensionOptionsHybrid: z.ZodObject<{
    type: z.ZodEnum<["operation"]>;
    path: z.ZodObject<{
        app: z.ZodString;
        api: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        app: string;
        api: string;
    }, {
        app: string;
        api: string;
    }>;
    source: z.ZodObject<{
        app: z.ZodString;
        api: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        app: string;
        api: string;
    }, {
        app: string;
        api: string;
    }>;
    sandbox: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodBoolean;
        requestedScopes: z.ZodObject<{
            request: z.ZodOptional<z.ZodObject<{
                urls: z.ZodArray<z.ZodString, "many">;
                methods: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"GET">, z.ZodLiteral<"POST">, z.ZodLiteral<"PATCH">, z.ZodLiteral<"PUT">, z.ZodLiteral<"DELETE">]>, "many">;
            }, "strip", z.ZodTypeAny, {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            }, {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            }>>;
            log: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            sleep: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        }, "strip", z.ZodTypeAny, {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        }, {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        requestedScopes: {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        };
    }, {
        enabled: boolean;
        requestedScopes: {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        };
    }>>;
}, "strip", z.ZodTypeAny, {
    path: {
        app: string;
        api: string;
    };
    type: "operation";
    source: {
        app: string;
        api: string;
    };
    sandbox?: {
        enabled: boolean;
        requestedScopes: {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        };
    } | undefined;
}, {
    path: {
        app: string;
        api: string;
    };
    type: "operation";
    source: {
        app: string;
        api: string;
    };
    sandbox?: {
        enabled: boolean;
        requestedScopes: {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        };
    } | undefined;
}>;
declare const ExtensionOptionsBundle: z.ZodObject<{
    type: z.ZodLiteral<"bundle">;
    partial: z.ZodOptional<z.ZodBoolean>;
    path: z.ZodObject<{
        app: z.ZodString;
        api: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        app: string;
        api: string;
    }, {
        app: string;
        api: string;
    }>;
    entries: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        type: z.ZodEnum<["hook", "endpoint"]>;
        name: z.ZodString;
        source: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "hook" | "endpoint";
        name: string;
        source: string;
    }, {
        type: "hook" | "endpoint";
        name: string;
        source: string;
    }>, z.ZodObject<{
        type: z.ZodEnum<["interface", "display", "layout", "module", "panel", "theme"]>;
        name: z.ZodString;
        source: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
        name: string;
        source: string;
    }, {
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
        name: string;
        source: string;
    }>, z.ZodObject<{
        type: z.ZodEnum<["operation"]>;
        name: z.ZodString;
        source: z.ZodObject<{
            app: z.ZodString;
            api: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            app: string;
            api: string;
        }, {
            app: string;
            api: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "operation";
        name: string;
        source: {
            app: string;
            api: string;
        };
    }, {
        type: "operation";
        name: string;
        source: {
            app: string;
            api: string;
        };
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    path: {
        app: string;
        api: string;
    };
    type: "bundle";
    entries: ({
        type: "hook" | "endpoint";
        name: string;
        source: string;
    } | {
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
        name: string;
        source: string;
    } | {
        type: "operation";
        name: string;
        source: {
            app: string;
            api: string;
        };
    })[];
    partial?: boolean | undefined;
}, {
    path: {
        app: string;
        api: string;
    };
    type: "bundle";
    entries: ({
        type: "hook" | "endpoint";
        name: string;
        source: string;
    } | {
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
        name: string;
        source: string;
    } | {
        type: "operation";
        name: string;
        source: {
            app: string;
            api: string;
        };
    })[];
    partial?: boolean | undefined;
}>;
declare const ExtensionOptionsBundleEntries: z.ZodArray<z.ZodUnion<[z.ZodObject<{
    type: z.ZodEnum<["hook", "endpoint"]>;
    name: z.ZodString;
    source: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "hook" | "endpoint";
    name: string;
    source: string;
}, {
    type: "hook" | "endpoint";
    name: string;
    source: string;
}>, z.ZodObject<{
    type: z.ZodEnum<["interface", "display", "layout", "module", "panel", "theme"]>;
    name: z.ZodString;
    source: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
    name: string;
    source: string;
}, {
    type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
    name: string;
    source: string;
}>, z.ZodObject<{
    type: z.ZodEnum<["operation"]>;
    name: z.ZodString;
    source: z.ZodObject<{
        app: z.ZodString;
        api: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        app: string;
        api: string;
    }, {
        app: string;
        api: string;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "operation";
    name: string;
    source: {
        app: string;
        api: string;
    };
}, {
    type: "operation";
    name: string;
    source: {
        app: string;
        api: string;
    };
}>]>, "many">;
type ExtensionOptionsBundleEntries = z.infer<typeof ExtensionOptionsBundleEntries>;
declare const ExtensionOptions: z.ZodIntersection<z.ZodObject<{
    host: z.ZodString;
    hidden: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    host: string;
    hidden?: boolean | undefined;
}, {
    host: string;
    hidden?: boolean | undefined;
}>, z.ZodUnion<[z.ZodObject<{
    type: z.ZodEnum<["interface", "display", "layout", "module", "panel", "theme"]>;
    path: z.ZodString;
    source: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
    type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
    source: string;
}, {
    path: string;
    type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
    source: string;
}>, z.ZodObject<{
    type: z.ZodEnum<["hook", "endpoint"]>;
    path: z.ZodString;
    source: z.ZodString;
    sandbox: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodBoolean;
        requestedScopes: z.ZodObject<{
            request: z.ZodOptional<z.ZodObject<{
                urls: z.ZodArray<z.ZodString, "many">;
                methods: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"GET">, z.ZodLiteral<"POST">, z.ZodLiteral<"PATCH">, z.ZodLiteral<"PUT">, z.ZodLiteral<"DELETE">]>, "many">;
            }, "strip", z.ZodTypeAny, {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            }, {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            }>>;
            log: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            sleep: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        }, "strip", z.ZodTypeAny, {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        }, {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        requestedScopes: {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        };
    }, {
        enabled: boolean;
        requestedScopes: {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        };
    }>>;
}, "strip", z.ZodTypeAny, {
    path: string;
    type: "hook" | "endpoint";
    source: string;
    sandbox?: {
        enabled: boolean;
        requestedScopes: {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        };
    } | undefined;
}, {
    path: string;
    type: "hook" | "endpoint";
    source: string;
    sandbox?: {
        enabled: boolean;
        requestedScopes: {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        };
    } | undefined;
}>, z.ZodObject<{
    type: z.ZodEnum<["operation"]>;
    path: z.ZodObject<{
        app: z.ZodString;
        api: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        app: string;
        api: string;
    }, {
        app: string;
        api: string;
    }>;
    source: z.ZodObject<{
        app: z.ZodString;
        api: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        app: string;
        api: string;
    }, {
        app: string;
        api: string;
    }>;
    sandbox: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodBoolean;
        requestedScopes: z.ZodObject<{
            request: z.ZodOptional<z.ZodObject<{
                urls: z.ZodArray<z.ZodString, "many">;
                methods: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"GET">, z.ZodLiteral<"POST">, z.ZodLiteral<"PATCH">, z.ZodLiteral<"PUT">, z.ZodLiteral<"DELETE">]>, "many">;
            }, "strip", z.ZodTypeAny, {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            }, {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            }>>;
            log: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
            sleep: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        }, "strip", z.ZodTypeAny, {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        }, {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        requestedScopes: {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        };
    }, {
        enabled: boolean;
        requestedScopes: {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        };
    }>>;
}, "strip", z.ZodTypeAny, {
    path: {
        app: string;
        api: string;
    };
    type: "operation";
    source: {
        app: string;
        api: string;
    };
    sandbox?: {
        enabled: boolean;
        requestedScopes: {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        };
    } | undefined;
}, {
    path: {
        app: string;
        api: string;
    };
    type: "operation";
    source: {
        app: string;
        api: string;
    };
    sandbox?: {
        enabled: boolean;
        requestedScopes: {
            request?: {
                urls: string[];
                methods: ("GET" | "POST" | "PATCH" | "PUT" | "DELETE")[];
            } | undefined;
            log?: {} | undefined;
            sleep?: {} | undefined;
        };
    } | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"bundle">;
    partial: z.ZodOptional<z.ZodBoolean>;
    path: z.ZodObject<{
        app: z.ZodString;
        api: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        app: string;
        api: string;
    }, {
        app: string;
        api: string;
    }>;
    entries: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        type: z.ZodEnum<["hook", "endpoint"]>;
        name: z.ZodString;
        source: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "hook" | "endpoint";
        name: string;
        source: string;
    }, {
        type: "hook" | "endpoint";
        name: string;
        source: string;
    }>, z.ZodObject<{
        type: z.ZodEnum<["interface", "display", "layout", "module", "panel", "theme"]>;
        name: z.ZodString;
        source: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
        name: string;
        source: string;
    }, {
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
        name: string;
        source: string;
    }>, z.ZodObject<{
        type: z.ZodEnum<["operation"]>;
        name: z.ZodString;
        source: z.ZodObject<{
            app: z.ZodString;
            api: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            app: string;
            api: string;
        }, {
            app: string;
            api: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "operation";
        name: string;
        source: {
            app: string;
            api: string;
        };
    }, {
        type: "operation";
        name: string;
        source: {
            app: string;
            api: string;
        };
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    path: {
        app: string;
        api: string;
    };
    type: "bundle";
    entries: ({
        type: "hook" | "endpoint";
        name: string;
        source: string;
    } | {
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
        name: string;
        source: string;
    } | {
        type: "operation";
        name: string;
        source: {
            app: string;
            api: string;
        };
    })[];
    partial?: boolean | undefined;
}, {
    path: {
        app: string;
        api: string;
    };
    type: "bundle";
    entries: ({
        type: "hook" | "endpoint";
        name: string;
        source: string;
    } | {
        type: "interface" | "display" | "layout" | "module" | "panel" | "theme";
        name: string;
        source: string;
    } | {
        type: "operation";
        name: string;
        source: {
            app: string;
            api: string;
        };
    })[];
    partial?: boolean | undefined;
}>]>>;
type ExtensionOptions = z.infer<typeof ExtensionOptions>;

type AppExtensionType = (typeof APP_EXTENSION_TYPES)[number];
type ApiExtensionType = (typeof API_EXTENSION_TYPES)[number];
type HybridExtensionType = (typeof HYBRID_EXTENSION_TYPES)[number];
type BundleExtensionType = (typeof BUNDLE_EXTENSION_TYPES)[number];
type NestedExtensionType = (typeof NESTED_EXTENSION_TYPES)[number];
type ExtensionType = (typeof EXTENSION_TYPES)[number];
type ExtensionBase = {
    path: string;
    name: string;
    local: boolean;
    version?: string;
    host?: string;
};
type AppExtension = ExtensionBase & {
    type: AppExtensionType;
    entrypoint: string;
};
type ApiExtension = ExtensionBase & {
    type: ApiExtensionType;
    entrypoint: string;
    sandbox?: ExtensionSandboxOptions;
};
type HybridExtension = ExtensionBase & {
    type: HybridExtensionType;
    entrypoint: SplitEntrypoint;
    sandbox?: ExtensionSandboxOptions;
};
interface BundleExtensionEntry {
    name: string;
    type: AppExtensionType | ApiExtensionType | HybridExtensionType;
}
type BundleExtension = ExtensionBase & {
    type: BundleExtensionType;
    partial: boolean | undefined;
    entrypoint: SplitEntrypoint;
    entries: BundleExtensionEntry[];
};
type Extension = AppExtension | ApiExtension | HybridExtension | BundleExtension;

interface ExtensionSettings {
    id: string;
    source: 'module' | 'registry' | 'local';
    enabled: boolean;
    bundle: string | null;
    folder: string;
}

/**
 * The API output structure used when engaging with the /extensions endpoints
 */
interface ApiOutput {
    id: string;
    bundle: string | null;
    schema: Partial<Extension> | BundleExtensionEntry | null;
    meta: ExtensionSettings;
}

type ExtensionOptionsContext = {
    collection: string | undefined;
    editing: string;
    field: DeepPartial<Field>;
    relations: {
        m2o: DeepPartial<Relation> | undefined;
        m2a?: DeepPartial<Relation> | undefined;
        o2m: DeepPartial<Relation> | undefined;
    };
    collections: {
        junction: DeepPartial<Collection & {
            fields: DeepPartial<Field>[];
        }> | undefined;
        related: DeepPartial<Collection & {
            fields: DeepPartial<Field>[];
        }> | undefined;
    };
    fields: {
        corresponding: DeepPartial<Field> | undefined;
        junctionCurrent: DeepPartial<Field> | undefined;
        junctionRelated: DeepPartial<Field> | undefined;
        sort: DeepPartial<Field> | undefined;
    };
    items: Record<string, Record<string, any>[]>;
    localType: (typeof LOCAL_TYPES)[number];
    autoGenerateJunctionRelation: boolean;
    saving: boolean;
};

type DisplayFieldsFunction = (options: any, context: {
    collection: string;
    field: string;
    type: string;
}) => string[];
interface DisplayConfig {
    id: string;
    name: string;
    icon: string;
    description?: string;
    component: Component;
    handler?: (value: any, options: Record<string, any>, ctx: {
        interfaceOptions?: Record<string, any>;
        field?: Field;
        collection?: string;
    }) => string | null;
    options: DeepPartial<Field>[] | {
        standard: DeepPartial<Field>[];
        advanced: DeepPartial<Field>[];
    } | ((ctx: ExtensionOptionsContext) => DeepPartial<Field>[] | {
        standard: DeepPartial<Field>[];
        advanced: DeepPartial<Field>[];
    }) | Exclude<ComponentOptions, any> | null;
    types: readonly Type[];
    localTypes?: readonly LocalType[];
    fields?: string[] | DisplayFieldsFunction;
}

interface InterfaceConfig {
    id: string;
    name: string;
    icon: string;
    description?: string;
    component: Component;
    options: DeepPartial<Field>[] | {
        standard: DeepPartial<Field>[];
        advanced: DeepPartial<Field>[];
    } | ((ctx: ExtensionOptionsContext) => DeepPartial<Field>[] | {
        standard: DeepPartial<Field>[];
        advanced: DeepPartial<Field>[];
    }) | Exclude<ComponentOptions, any> | null;
    types: readonly Type[];
    localTypes?: readonly LocalType[];
    group?: 'standard' | 'selection' | 'relational' | 'presentation' | 'group' | 'other';
    order?: number;
    relational?: boolean;
    hideLabel?: boolean;
    hideLoader?: boolean;
    autoKey?: boolean;
    system?: boolean;
    recommendedDisplays?: string[];
    preview?: string;
}

interface LayoutConfig<Options = any, Query = any> {
    id: string;
    name: string;
    icon: string;
    component: Component;
    slots: {
        options: Component;
        sidebar: Component;
        actions: Component;
    };
    smallHeader?: boolean;
    headerShadow?: boolean;
    sidebarShadow?: boolean;
    setup: (props: LayoutProps<Options, Query>, ctx: LayoutContext) => Record<string, unknown>;
}
interface LayoutProps<Options = any, Query = any> {
    collection: string | null;
    selection: (number | string)[];
    layoutOptions: Options;
    layoutQuery: Query;
    layoutProps: Record<string, unknown>;
    filterUser: Filter | null;
    filterSystem: Filter | null;
    filter: Filter | null;
    search: string | null;
    selectMode: boolean;
    showSelect: ShowSelect;
    readonly: boolean;
    resetPreset?: () => Promise<void>;
    clearFilters?: () => void;
}
interface LayoutContext {
    emit: (event: 'update:selection' | 'update:layoutOptions' | 'update:layoutQuery', ...args: any[]) => void;
}
type LayoutState<T, Options, Query> = {
    props: LayoutProps<Options, Query>;
} & T;
type ShowSelect = 'none' | 'one' | 'multiple';

type AppUser = User & {
    app_access: boolean;
    admin_access: boolean;
};
interface ModuleConfig {
    id: string;
    name: string;
    icon: string;
    routes: RouteRecordRaw[];
    hidden?: boolean;
    preRegisterCheck?: (user: AppUser, permissions: CollectionAccess) => Promise<boolean> | boolean;
}

type OperationContext = ApiExtensionContext & {
    data: Record<string, unknown>;
    accountability: Accountability | null;
};
type OperationHandler<Options = Record<string, unknown>> = (options: Options, context: OperationContext) => unknown | Promise<unknown> | void;
interface OperationAppConfig {
    id: string;
    name: string;
    icon: string;
    description?: string;
    overview: ((options: Record<string, any>, { flow }: {
        flow: FlowRaw;
    }) => {
        label: string;
        text: string;
        copyable?: boolean;
    }[]) | ComponentOptions | null;
    options: DeepPartial<Field>[] | ((options: Record<string, any>) => DeepPartial<Field>[]) | Exclude<ComponentOptions, any> | null;
}
interface OperationApiConfig<Options = Record<string, unknown>> {
    id: string;
    handler: OperationHandler<Options>;
}

type PanelQuery = {
    collection: string;
    query: Query;
    key?: string;
};
interface PanelConfig {
    id: string;
    name: string;
    icon: string;
    description?: string;
    query?: (options: Record<string, any>) => PanelQuery | PanelQuery[] | undefined;
    variable?: true;
    component: Component;
    options: DeepPartial<Field>[] | {
        standard: DeepPartial<Field>[];
        advanced: DeepPartial<Field>[];
    } | ((ctx: Partial<Panel>) => DeepPartial<Field>[] | {
        standard: DeepPartial<Field>[];
        advanced: DeepPartial<Field>[];
    }) | Exclude<ComponentOptions, any> | null;
    minWidth: number;
    minHeight: number;
    skipUndefinedKeys?: string[];
}
type Panel = {
    id: string;
    dashboard: string;
    show_header: boolean;
    name: string;
    icon: string;
    color: string;
    note: string;
    type: string;
    position_x: number;
    position_y: number;
    width: number;
    height: number;
    options: Record<string, any>;
    date_created: string;
    user_created: string;
};

type AppExtensionConfigs = {
    interfaces: InterfaceConfig[];
    displays: DisplayConfig[];
    layouts: LayoutConfig[];
    modules: ModuleConfig[];
    panels: PanelConfig[];
    themes: Theme[];
    operations: OperationAppConfig[];
};

type EndpointExtensionContext = ApiExtensionContext & {
    emitter: any;
};
type EndpointConfigFunction = (router: Router, context: EndpointExtensionContext) => void;
type EndpointConfigObject = {
    id: string;
    handler: EndpointConfigFunction;
};
type EndpointConfig = EndpointConfigFunction | EndpointConfigObject;

type HookExtensionContext = ApiExtensionContext & {
    emitter: any;
};
type RegisterFunctions = {
    filter: <T = unknown>(event: string, handler: FilterHandler<T>) => void;
    action: (event: string, handler: ActionHandler) => void;
    init: (event: string, handler: InitHandler) => void;
    schedule: (cron: string, handler: ScheduleHandler) => void;
    embed: (position: 'head' | 'body', code: string | EmbedHandler) => void;
};
type HookConfig = (register: RegisterFunctions, context: HookExtensionContext) => void;

declare function generateExtensionsEntrypoint(extensionMaps: {
    local: Map<string, Extension>;
    registry: Map<string, Extension>;
    module: Map<string, Extension>;
}, settings: ExtensionSettings[]): string;

declare function getExtensionDefinition(manifest: ExtensionManifest, meta: {
    path: string;
    local: boolean;
}): Extension;
declare function resolveFsExtensions(root: string): Promise<Map<string, Extension>>;
declare function resolveModuleExtensions(root: string): Promise<Map<string, Extension>>;

type CustomConfig<T extends object> = {
    [K in string]: K extends keyof T ? never : unknown;
};
type ExtendedConfig<T extends object, C> = Prettify<T & Omit<C, keyof T>>;
declare function defineInterface<Custom extends CustomConfig<InterfaceConfig>>(config: ExtendedConfig<InterfaceConfig, Custom>): ExtendedConfig<InterfaceConfig, Custom>;
declare function defineDisplay<Custom extends CustomConfig<DisplayConfig>>(config: ExtendedConfig<DisplayConfig, Custom>): ExtendedConfig<DisplayConfig, Custom>;
declare function defineLayout<Options = any, Query = any>(config: LayoutConfig<Options, Query>): LayoutConfig<Options, Query>;
declare function defineModule<Custom extends CustomConfig<ModuleConfig>>(config: ExtendedConfig<ModuleConfig, Custom>): ExtendedConfig<ModuleConfig, Custom>;
declare function definePanel<Custom extends CustomConfig<PanelConfig>>(config: ExtendedConfig<PanelConfig, Custom>): ExtendedConfig<PanelConfig, Custom>;
declare function defineHook(config: HookConfig): HookConfig;
declare function defineEndpoint(config: EndpointConfig): EndpointConfig;
declare function defineOperationApp<Custom extends CustomConfig<OperationAppConfig>>(config: ExtendedConfig<OperationAppConfig, Custom>): ExtendedConfig<OperationAppConfig, Custom>;
declare function defineOperationApi<Options = Record<string, unknown>>(config: OperationApiConfig<Options>): OperationApiConfig<Options>;

export { API_EXTENSION_TYPES, API_SHARED_DEPS, APP_EXTENSION_TYPES, APP_OR_HYBRID_EXTENSION_PACKAGE_TYPES, APP_OR_HYBRID_EXTENSION_TYPES, APP_SHARED_DEPS, type ApiExtension, type ApiExtensionContext, type ApiExtensionType, type ApiOutput, type AppExtension, type AppExtensionConfigs, type AppExtensionType, BUNDLE_EXTENSION_TYPES, type BundleExtension, type BundleExtensionEntry, type BundleExtensionType, type DisplayConfig, type DisplayFieldsFunction, EXTENSION_LANGUAGES, EXTENSION_PKG_KEY, EXTENSION_TYPES, type EndpointConfig, type EndpointExtensionContext, type Extension, ExtensionManifest, ExtensionOptions, ExtensionOptionsApi, ExtensionOptionsApp, ExtensionOptionsBase, ExtensionOptionsBundle, ExtensionOptionsBundleEntries, ExtensionOptionsBundleEntry, type ExtensionOptionsContext, ExtensionOptionsHybrid, ExtensionSandboxOptions, ExtensionSandboxRequestedScopes, type ExtensionSettings, type ExtensionType, HYBRID_EXTENSION_TYPES, type HookConfig, type HookExtensionContext, type HybridExtension, type HybridExtensionType, type InterfaceConfig, type LayoutConfig, type LayoutProps, type LayoutState, type ModuleConfig, NESTED_EXTENSION_TYPES, type NestedExtensionType, type OperationApiConfig, type OperationAppConfig, type OperationContext, type OperationHandler, type Panel, type PanelConfig, type PanelQuery, type RegisterFunctions, type ShowSelect, SplitEntrypoint, defineDisplay, defineEndpoint, defineHook, defineInterface, defineLayout, defineModule, defineOperationApi, defineOperationApp, definePanel, generateExtensionsEntrypoint, getExtensionDefinition, resolveFsExtensions, resolveModuleExtensions };
