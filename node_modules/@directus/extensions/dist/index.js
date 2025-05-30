// src/shared/constants/extension-types.ts
var APP_EXTENSION_TYPES = ["interface", "display", "layout", "module", "panel", "theme"];
var API_EXTENSION_TYPES = ["hook", "endpoint"];
var HYBRID_EXTENSION_TYPES = ["operation"];
var BUNDLE_EXTENSION_TYPES = ["bundle"];
var EXTENSION_TYPES = [
  ...APP_EXTENSION_TYPES,
  ...API_EXTENSION_TYPES,
  ...HYBRID_EXTENSION_TYPES,
  ...BUNDLE_EXTENSION_TYPES
];
var NESTED_EXTENSION_TYPES = [
  ...APP_EXTENSION_TYPES,
  ...API_EXTENSION_TYPES,
  ...HYBRID_EXTENSION_TYPES
];
var APP_OR_HYBRID_EXTENSION_TYPES = [...APP_EXTENSION_TYPES, ...HYBRID_EXTENSION_TYPES];
var APP_OR_HYBRID_EXTENSION_PACKAGE_TYPES = [
  ...APP_OR_HYBRID_EXTENSION_TYPES,
  ...BUNDLE_EXTENSION_TYPES
];

// src/shared/constants/languages.ts
var EXTENSION_LANGUAGES = ["javascript", "typescript"];

// src/shared/constants/pkg-key.ts
var EXTENSION_PKG_KEY = "directus:extension";

// src/shared/constants/shared-deps.ts
var APP_SHARED_DEPS = ["@directus/extensions-sdk", "vue", "vue-router", "vue-i18n", "pinia"];
var API_SHARED_DEPS = ["directus", "directus:api"];

// src/shared/schemas/manifest.ts
import { z as z2 } from "zod";

// src/shared/schemas/options.ts
import { z } from "zod";
var SplitEntrypoint = z.object({
  app: z.string(),
  api: z.string()
});
var ExtensionSandboxRequestedScopes = z.object({
  request: z.optional(
    z.object({
      urls: z.array(z.string()),
      methods: z.array(
        z.union([z.literal("GET"), z.literal("POST"), z.literal("PATCH"), z.literal("PUT"), z.literal("DELETE")])
      )
    })
  ),
  log: z.optional(z.object({})),
  sleep: z.optional(z.object({}))
});
var ExtensionSandboxOptions = z.optional(
  z.object({
    enabled: z.boolean(),
    requestedScopes: ExtensionSandboxRequestedScopes
  })
);
var ExtensionOptionsBundleEntry = z.union([
  z.object({
    type: z.enum(API_EXTENSION_TYPES),
    name: z.string(),
    source: z.string()
  }),
  z.object({
    type: z.enum(APP_EXTENSION_TYPES),
    name: z.string(),
    source: z.string()
  }),
  z.object({
    type: z.enum(HYBRID_EXTENSION_TYPES),
    name: z.string(),
    source: SplitEntrypoint
  })
]);
var ExtensionOptionsBase = z.object({
  host: z.string(),
  hidden: z.boolean().optional()
});
var ExtensionOptionsApp = z.object({
  type: z.enum(APP_EXTENSION_TYPES),
  path: z.string(),
  source: z.string()
});
var ExtensionOptionsApi = z.object({
  type: z.enum(API_EXTENSION_TYPES),
  path: z.string(),
  source: z.string(),
  sandbox: ExtensionSandboxOptions
});
var ExtensionOptionsHybrid = z.object({
  type: z.enum(HYBRID_EXTENSION_TYPES),
  path: SplitEntrypoint,
  source: SplitEntrypoint,
  sandbox: ExtensionSandboxOptions
});
var ExtensionOptionsBundle = z.object({
  type: z.literal("bundle"),
  partial: z.boolean().optional(),
  path: SplitEntrypoint,
  entries: z.array(ExtensionOptionsBundleEntry)
});
var ExtensionOptionsBundleEntries = z.array(ExtensionOptionsBundleEntry);
var ExtensionOptions = ExtensionOptionsBase.and(
  z.union([ExtensionOptionsApp, ExtensionOptionsApi, ExtensionOptionsHybrid, ExtensionOptionsBundle])
);

// src/shared/schemas/manifest.ts
var ExtensionManifest = z2.object({
  name: z2.string(),
  version: z2.string(),
  type: z2.union([z2.literal("module"), z2.literal("commonjs")]).optional(),
  description: z2.string().optional(),
  icon: z2.string().optional(),
  dependencies: z2.record(z2.string()).optional(),
  devDependencies: z2.record(z2.string()).optional(),
  [EXTENSION_PKG_KEY]: ExtensionOptions
});

// src/shared/utils/define-extension.ts
function defineInterface(config) {
  return config;
}
function defineDisplay(config) {
  return config;
}
function defineLayout(config) {
  return config;
}
function defineModule(config) {
  return config;
}
function definePanel(config) {
  return config;
}
function defineHook(config) {
  return config;
}
function defineEndpoint(config) {
  return config;
}
function defineOperationApp(config) {
  return config;
}
function defineOperationApi(config) {
  return config;
}
export {
  API_EXTENSION_TYPES,
  API_SHARED_DEPS,
  APP_EXTENSION_TYPES,
  APP_OR_HYBRID_EXTENSION_PACKAGE_TYPES,
  APP_OR_HYBRID_EXTENSION_TYPES,
  APP_SHARED_DEPS,
  BUNDLE_EXTENSION_TYPES,
  EXTENSION_LANGUAGES,
  EXTENSION_PKG_KEY,
  EXTENSION_TYPES,
  ExtensionManifest,
  ExtensionOptions,
  ExtensionOptionsApi,
  ExtensionOptionsApp,
  ExtensionOptionsBase,
  ExtensionOptionsBundle,
  ExtensionOptionsBundleEntries,
  ExtensionOptionsBundleEntry,
  ExtensionOptionsHybrid,
  ExtensionSandboxOptions,
  ExtensionSandboxRequestedScopes,
  HYBRID_EXTENSION_TYPES,
  NESTED_EXTENSION_TYPES,
  SplitEntrypoint,
  defineDisplay,
  defineEndpoint,
  defineHook,
  defineInterface,
  defineLayout,
  defineModule,
  defineOperationApi,
  defineOperationApp,
  definePanel
};
