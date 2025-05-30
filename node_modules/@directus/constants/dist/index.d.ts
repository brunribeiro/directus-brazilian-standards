declare enum Action {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete",
    REVERT = "revert",
    VERSION_SAVE = "version_save",
    COMMENT = "comment",
    UPLOAD = "upload",
    LOGIN = "login",
    RUN = "run",
    INSTALL = "install"
}

declare const KNEX_TYPES: readonly ["bigInteger", "boolean", "date", "dateTime", "decimal", "float", "integer", "json", "string", "text", "time", "timestamp", "binary", "uuid"];
declare const TYPES: readonly ["bigInteger", "boolean", "date", "dateTime", "decimal", "float", "integer", "json", "string", "text", "time", "timestamp", "binary", "uuid", "alias", "hash", "csv", "geometry", "geometry.Point", "geometry.LineString", "geometry.Polygon", "geometry.MultiPoint", "geometry.MultiLineString", "geometry.MultiPolygon", "unknown"];
declare const NUMERIC_TYPES: readonly ["bigInteger", "decimal", "float", "integer"];
declare const GEOMETRY_TYPES: readonly ["Point", "LineString", "Polygon", "MultiPoint", "MultiLineString", "MultiPolygon"];
declare const GEOMETRY_FORMATS: readonly ["native", "geojson", "wkt", "lnglat"];
declare const LOCAL_TYPES: readonly ["standard", "file", "files", "m2o", "o2m", "m2m", "m2a", "presentation", "translations", "group"];
declare const RELATIONAL_TYPES: readonly ["file", "files", "m2o", "o2m", "m2m", "m2a", "presentation", "translations", "group"];
declare const FUNCTIONS: readonly ["year", "month", "week", "day", "weekday", "hour", "minute", "second", "count"];

declare const JAVASCRIPT_FILE_EXTS: readonly ["js", "mjs", "cjs"];
declare const DEFAULT_CHUNK_SIZE = 8388608;

declare const STORES_INJECT = "stores";
declare const API_INJECT = "api";
declare const SDK_INJECT = "sdk";
declare const EXTENSIONS_INJECT = "extensions";

declare const DEFAULT_NUMERIC_PRECISION = 10;
declare const DEFAULT_NUMERIC_SCALE = 5;
declare const MAX_SAFE_INT64: bigint;
declare const MIN_SAFE_INT64: bigint;
declare const MAX_SAFE_INT32: number;
declare const MIN_SAFE_INT32: number;

declare const PERMISSION_ACTIONS: readonly ["create", "read", "update", "delete", "share"];

declare const REGEX_BETWEEN_PARENS: RegExp;

export { API_INJECT, Action, DEFAULT_CHUNK_SIZE, DEFAULT_NUMERIC_PRECISION, DEFAULT_NUMERIC_SCALE, EXTENSIONS_INJECT, FUNCTIONS, GEOMETRY_FORMATS, GEOMETRY_TYPES, JAVASCRIPT_FILE_EXTS, KNEX_TYPES, LOCAL_TYPES, MAX_SAFE_INT32, MAX_SAFE_INT64, MIN_SAFE_INT32, MIN_SAFE_INT64, NUMERIC_TYPES, PERMISSION_ACTIONS, REGEX_BETWEEN_PARENS, RELATIONAL_TYPES, SDK_INJECT, STORES_INJECT, TYPES };
