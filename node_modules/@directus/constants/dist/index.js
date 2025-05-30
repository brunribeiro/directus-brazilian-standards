// src/activity.ts
var Action = /* @__PURE__ */ ((Action2) => {
  Action2["CREATE"] = "create";
  Action2["UPDATE"] = "update";
  Action2["DELETE"] = "delete";
  Action2["REVERT"] = "revert";
  Action2["VERSION_SAVE"] = "version_save";
  Action2["COMMENT"] = "comment";
  Action2["UPLOAD"] = "upload";
  Action2["LOGIN"] = "login";
  Action2["RUN"] = "run";
  Action2["INSTALL"] = "install";
  return Action2;
})(Action || {});

// src/fields.ts
var KNEX_TYPES = [
  "bigInteger",
  "boolean",
  "date",
  "dateTime",
  "decimal",
  "float",
  "integer",
  "json",
  "string",
  "text",
  "time",
  "timestamp",
  "binary",
  "uuid"
];
var TYPES = [
  ...KNEX_TYPES,
  "alias",
  "hash",
  "csv",
  "geometry",
  "geometry.Point",
  "geometry.LineString",
  "geometry.Polygon",
  "geometry.MultiPoint",
  "geometry.MultiLineString",
  "geometry.MultiPolygon",
  "unknown"
];
var NUMERIC_TYPES = ["bigInteger", "decimal", "float", "integer"];
var GEOMETRY_TYPES = [
  "Point",
  "LineString",
  "Polygon",
  "MultiPoint",
  "MultiLineString",
  "MultiPolygon"
];
var GEOMETRY_FORMATS = ["native", "geojson", "wkt", "lnglat"];
var LOCAL_TYPES = [
  "standard",
  "file",
  "files",
  "m2o",
  "o2m",
  "m2m",
  "m2a",
  "presentation",
  "translations",
  "group"
];
var RELATIONAL_TYPES = [
  "file",
  "files",
  "m2o",
  "o2m",
  "m2m",
  "m2a",
  "presentation",
  "translations",
  "group"
];
var FUNCTIONS = ["year", "month", "week", "day", "weekday", "hour", "minute", "second", "count"];

// src/files.ts
var JAVASCRIPT_FILE_EXTS = ["js", "mjs", "cjs"];
var DEFAULT_CHUNK_SIZE = 8388608;

// src/injection.ts
var STORES_INJECT = "stores";
var API_INJECT = "api";
var SDK_INJECT = "sdk";
var EXTENSIONS_INJECT = "extensions";

// src/number.ts
var DEFAULT_NUMERIC_PRECISION = 10;
var DEFAULT_NUMERIC_SCALE = 5;
var MAX_SAFE_INT64 = 2n ** 63n - 1n;
var MIN_SAFE_INT64 = (-2n) ** 63n;
var MAX_SAFE_INT32 = 2 ** 31 - 1;
var MIN_SAFE_INT32 = (-2) ** 31;

// src/permissions.ts
var PERMISSION_ACTIONS = ["create", "read", "update", "delete", "share"];

// src/regex.ts
var REGEX_BETWEEN_PARENS = /\(([^)]+)\)/;
export {
  API_INJECT,
  Action,
  DEFAULT_CHUNK_SIZE,
  DEFAULT_NUMERIC_PRECISION,
  DEFAULT_NUMERIC_SCALE,
  EXTENSIONS_INJECT,
  FUNCTIONS,
  GEOMETRY_FORMATS,
  GEOMETRY_TYPES,
  JAVASCRIPT_FILE_EXTS,
  KNEX_TYPES,
  LOCAL_TYPES,
  MAX_SAFE_INT32,
  MAX_SAFE_INT64,
  MIN_SAFE_INT32,
  MIN_SAFE_INT64,
  NUMERIC_TYPES,
  PERMISSION_ACTIONS,
  REGEX_BETWEEN_PARENS,
  RELATIONAL_TYPES,
  SDK_INJECT,
  STORES_INJECT,
  TYPES
};
