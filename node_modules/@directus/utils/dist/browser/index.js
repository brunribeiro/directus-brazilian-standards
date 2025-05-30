// browser/css-var.ts
function cssVar(name, element = document.body) {
  return getComputedStyle(element ?? document.body).getPropertyValue(name).trim();
}
export {
  cssVar
};
