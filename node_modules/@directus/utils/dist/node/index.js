// node/array-helpers.ts
function isIn(value, array) {
  return array.includes(value);
}
function isTypeIn(object, array) {
  if (!object.type) return false;
  return array.includes(object.type);
}

// node/get-node-env.ts
var getNodeEnv = () => process.env["NODE_ENV"];

// node/is-readable-stream.ts
var isReadableStream = (input) => {
  return input !== null && typeof input === "object" && typeof input.pipe === "function" && typeof input._read === "function" && typeof input._readableState === "object" && input.readable !== false;
};

// node/list-folders.ts
import fse from "fs-extra";
import path from "path";
async function listFolders(location, options) {
  const fullPath = path.resolve(location);
  const files = await fse.readdir(fullPath);
  const directories = [];
  for (const file of files) {
    if (options?.ignoreHidden && file.startsWith(".")) {
      continue;
    }
    const filePath = path.join(fullPath, file);
    const stats = await fse.stat(filePath);
    if (stats.isDirectory()) {
      directories.push(file);
    }
  }
  return directories;
}

// node/path-to-relative-url.ts
import path2 from "path";
function pathToRelativeUrl(filePath, root = ".") {
  return path2.relative(root, filePath).split(path2.sep).join(path2.posix.sep);
}

// node/pluralize.ts
function pluralize(str) {
  return `${str}s`;
}
function depluralize(str) {
  return str.slice(0, -1);
}

// node/process-id.ts
import { createHash } from "node:crypto";
import { hostname } from "node:os";
var _cache = { id: void 0 };
var processId = () => {
  if (_cache.id) return _cache.id;
  const parts = [hostname(), process.pid, (/* @__PURE__ */ new Date()).getTime()];
  const hash = createHash("md5").update(parts.join(""));
  _cache.id = hash.digest("hex");
  return _cache.id;
};

// node/readable-stream-to-string.ts
var readableStreamToString = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf8");
};

// node/require-yaml.ts
import yaml from "js-yaml";
import { readFileSync } from "node:fs";
var requireYaml = (filepath) => {
  const yamlRaw = readFileSync(filepath, "utf8");
  return yaml.load(yamlRaw);
};

// node/resolve-package.ts
import path3 from "path";
import { createRequire } from "node:module";
var require2 = createRequire(import.meta.url);
function resolvePackage(name, root) {
  return path3.dirname(require2.resolve(`${name}/package.json`, root !== void 0 ? { paths: [root] } : void 0));
}

// node/tmp.ts
import { createHash as createHash2 } from "node:crypto";
import fs from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
async function createTmpDirectory() {
  const path4 = await fs.mkdtemp(join(tmpdir(), "directus-"));
  async function cleanup() {
    return await fs.rmdir(path4);
  }
  return {
    path: path4,
    cleanup
  };
}
async function createTmpFile() {
  const dir = await createTmpDirectory();
  const filename = createHash2("sha1").update((/* @__PURE__ */ new Date()).toString()).digest("hex").substring(0, 8);
  const path4 = join(dir.path, filename);
  try {
    const fd = await fs.open(path4, "wx");
    await fd.close();
  } catch (err) {
    await dir.cleanup();
    throw err;
  }
  async function cleanup() {
    await fs.unlink(path4);
    await dir.cleanup();
  }
  return {
    path: path4,
    cleanup
  };
}
export {
  _cache,
  createTmpFile,
  depluralize,
  getNodeEnv,
  isIn,
  isReadableStream,
  isTypeIn,
  listFolders,
  pathToRelativeUrl,
  pluralize,
  processId,
  readableStreamToString,
  requireYaml,
  resolvePackage
};
