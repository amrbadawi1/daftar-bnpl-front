// node_modules/.pnpm/@angular+cdk@20.2.9_@angula_18a7503932f3a8396ac879b3b233a3a2/node_modules/@angular/cdk/fesm2022/keycodes.mjs
function hasModifierKey(event, ...modifiers) {
  if (modifiers.length) {
    return modifiers.some((modifier) => event[modifier]);
  }
  return event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
}

export {
  hasModifierKey
};
//# sourceMappingURL=chunk-H2PCKFYO.js.map
