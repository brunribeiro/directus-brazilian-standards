// src/node/utils/generate-extensions-entrypoint.ts
import { isIn, isTypeIn, pathToRelativeUrl, pluralize } from "@directus/utils/node";
import path from "path";

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

// src/node/utils/generate-extensions-entrypoint.ts
function generateExtensionsEntrypoint(extensionMaps, settings) {
  const appOrHybridExtensions = [];
  const bundleExtensions = [];
  for (const [source, extensions] of Object.entries(extensionMaps)) {
    for (const [folder, extension] of extensions.entries()) {
      const settingsForExtension = settings.find((setting) => setting.source === source && setting.folder === folder);
      if (!settingsForExtension) continue;
      if (isIn(extension.type, [...APP_EXTENSION_TYPES, ...HYBRID_EXTENSION_TYPES]) && settingsForExtension.enabled) {
        appOrHybridExtensions.push(extension);
      }
      if (extension.type === "bundle") {
        const appBundle = {
          ...extension,
          entries: extension.entries.filter((entry) => {
            const isApp = isIn(entry.type, [...APP_EXTENSION_TYPES, ...HYBRID_EXTENSION_TYPES]);
            if (isApp === false) return false;
            const enabled = settings.find(
              (setting) => setting.source === source && setting.folder === entry.name && setting.bundle === settingsForExtension.id
            )?.enabled ?? false;
            return enabled;
          })
        };
        if (appBundle.entries.length > 0) {
          bundleExtensions.push(appBundle);
        }
      }
    }
  }
  const appOrHybridExtensionImports = [...APP_EXTENSION_TYPES, ...HYBRID_EXTENSION_TYPES].flatMap(
    (type) => appOrHybridExtensions.filter((extension) => extension.type === type).map(
      (extension, i) => `import ${type}${i} from './${pathToRelativeUrl(
        path.resolve(
          extension.path,
          isTypeIn(extension, HYBRID_EXTENSION_TYPES) ? extension.entrypoint.app : extension.entrypoint
        )
      )}';`
    )
  );
  const bundleExtensionImports = bundleExtensions.map(
    (extension, i) => extension.entries.length > 0 ? `import {${[...APP_EXTENSION_TYPES, ...HYBRID_EXTENSION_TYPES].filter((type) => extension.entries.some((entry) => entry.type === type)).map((type) => `${pluralize(type)} as ${type}Bundle${i}`).join(",")}} from './${pathToRelativeUrl(path.resolve(extension.path, extension.entrypoint.app))}';` : ""
  );
  const extensionExports = [...APP_EXTENSION_TYPES, ...HYBRID_EXTENSION_TYPES].map(
    (type) => `export const ${pluralize(type)} = [${appOrHybridExtensions.filter((extension) => extension.type === type).map((_, i) => `${type}${i}`).concat(
      bundleExtensions.map(
        (extension, i) => extension.entries.some((entry) => entry.type === type) ? `...${type}Bundle${i}` : null
      ).filter((e) => e !== null)
    ).join(",")}];`
  );
  return `${appOrHybridExtensionImports.join("")}${bundleExtensionImports.join("")}${extensionExports.join("")}`;
}

// src/node/utils/get-extensions.ts
import { isTypeIn as isTypeIn2, listFolders, resolvePackage } from "@directus/utils/node";
import fse from "fs-extra";
import { pick } from "lodash-es";
import { join, resolve } from "path";

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

// src/node/utils/get-extensions.ts
function getExtensionDefinition(manifest, meta) {
  const { name, version } = manifest;
  const { path: path2, local } = meta;
  const extensionOptions = manifest[EXTENSION_PKG_KEY];
  if (extensionOptions.type === "bundle") {
    return {
      path: path2,
      name,
      partial: extensionOptions.partial,
      version,
      type: extensionOptions.type,
      entrypoint: {
        app: extensionOptions.path.app,
        api: extensionOptions.path.api
      },
      entries: extensionOptions.entries.map((entry) => pick(entry, "name", "type")),
      host: extensionOptions.host,
      local
    };
  } else if (isTypeIn2(extensionOptions, HYBRID_EXTENSION_TYPES)) {
    return {
      path: path2,
      name,
      version,
      type: extensionOptions.type,
      entrypoint: {
        app: extensionOptions.path.app,
        api: extensionOptions.path.api
      },
      host: extensionOptions.host,
      sandbox: extensionOptions.sandbox,
      local
    };
  } else if (extensionOptions.type === "hook" || extensionOptions.type === "endpoint") {
    return {
      path: path2,
      name,
      version,
      type: extensionOptions.type,
      entrypoint: extensionOptions.path,
      host: extensionOptions.host,
      sandbox: extensionOptions.sandbox,
      local
    };
  } else {
    return {
      path: path2,
      name,
      version,
      type: extensionOptions.type,
      entrypoint: extensionOptions.path,
      host: extensionOptions.host,
      local
    };
  }
}
async function resolveFsExtensions(root) {
  root = resolve(root);
  if (!await fse.exists(root)) return /* @__PURE__ */ new Map();
  const extensionFolders = await listFolders(root, { ignoreHidden: true });
  const extensionMap = await Promise.all(
    extensionFolders.map(async (folder) => {
      const path2 = join(root, folder);
      try {
        const manifest = await fse.readJSON(join(path2, "package.json"));
        return { name: folder, path: path2, manifest };
      } catch {
        return;
      }
    })
  );
  const extensions = /* @__PURE__ */ new Map();
  for (const extension of extensionMap.values()) {
    if (!extension) continue;
    const { name, path: path2, manifest } = extension;
    let parsedManifest;
    try {
      parsedManifest = ExtensionManifest.parse(manifest);
    } catch (error) {
      throw new Error(`The manifest of the extension "${name}" (${path2}) is invalid.
${error}`);
    }
    const extensionDefinition = getExtensionDefinition(parsedManifest, { path: path2, local: true });
    extensions.set(name, extensionDefinition);
  }
  return extensions;
}
async function resolveModuleExtensions(root) {
  root = resolve(root);
  let pkg;
  try {
    pkg = await fse.readJSON(join(root, "package.json"));
  } catch {
    throw new Error(`Couldn't resolve package extensions: Path "${root}" does not contain a package.json file`);
  }
  const dependencyNames = Object.keys(pkg.dependencies ?? {});
  const dependencyMap = await Promise.all(
    dependencyNames.map(async (name) => {
      try {
        const path2 = resolvePackage(name, root);
        const manifest = await fse.readJSON(join(path2, "package.json"));
        if (EXTENSION_PKG_KEY in manifest) return { name, path: path2, manifest };
      } catch {
      }
      return;
    })
  );
  const extensions = /* @__PURE__ */ new Map();
  for (const extension of dependencyMap.values()) {
    if (!extension) continue;
    let parsedManifest;
    try {
      parsedManifest = ExtensionManifest.parse(extension.manifest);
    } catch (error) {
      throw new Error(`The manifest of the package extension "${extension.name}" is invalid.
${error}`);
    }
    const extensionDefinition = getExtensionDefinition(parsedManifest, { path: extension.path, local: true });
    extensions.set(extension.name, extensionDefinition);
  }
  return extensions;
}

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
  definePanel,
  generateExtensionsEntrypoint,
  getExtensionDefinition,
  resolveFsExtensions,
  resolveModuleExtensions
};
