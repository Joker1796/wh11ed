// What the core may use beyond the ECMAScript library: the WHATWG text codecs, which every host it
// runs in has — a browser, Node, a worker (the importer repairs mis-decoded text with them). Read only
// by tsconfig.core.json; the app's own check has them from the DOM library already.
declare class TextDecoder {
  constructor(label?: string, options?: { fatal?: boolean, ignoreBOM?: boolean })
  decode(input?: ArrayBuffer | ArrayBufferView, options?: { stream?: boolean }): string
}
declare class TextEncoder {
  encode(input?: string): Uint8Array
}
