import "./chunk-OUOAADPF.js";

// node_modules/.pnpm/@ngx-translate+http-loader@_795124c1dd3032cee1b8a4b5f2a4b560/node_modules/@ngx-translate/http-loader/fesm2020/ngx-translate-http-loader.mjs
var TranslateHttpLoader = class {
  constructor(http, prefix = "/assets/i18n/", suffix = ".json") {
    this.http = http;
    this.prefix = prefix;
    this.suffix = suffix;
  }
  /**
   * Gets the translations from the server
   */
  getTranslation(lang) {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`);
  }
};
export {
  TranslateHttpLoader
};
//# sourceMappingURL=@ngx-translate_http-loader.js.map
