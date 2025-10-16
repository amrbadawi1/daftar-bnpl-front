import {
  ElementRef
} from "./chunk-HEIFUZFQ.js";

// node_modules/.pnpm/@angular+cdk@20.2.9_@angula_18a7503932f3a8396ac879b3b233a3a2/node_modules/@angular/cdk/fesm2022/element.mjs
function coerceNumberProperty(value, fallbackValue = 0) {
  if (_isNumberValue(value)) {
    return Number(value);
  }
  return arguments.length === 2 ? fallbackValue : 0;
}
function _isNumberValue(value) {
  return !isNaN(parseFloat(value)) && !isNaN(Number(value));
}
function coerceElement(elementOrRef) {
  return elementOrRef instanceof ElementRef ? elementOrRef.nativeElement : elementOrRef;
}

export {
  coerceNumberProperty,
  _isNumberValue,
  coerceElement
};
//# sourceMappingURL=chunk-FVWR5PNE.js.map
