// Copyright 2018 the Deno authors. All rights reserved. MIT license.
/// <reference lib="dom" />
import { Console } from "./console";
import { TextEncoder, TextDecoder } from "text-encoding";

// If you use the eval function indirectly, by invoking it via a reference
// other than eval, as of ECMAScript 5 it works in the global scope rather than
// the local scope. This means, for instance, that function declarations create
// global functions, and that the code being evaluated doesn't have access to
// local variables within the scope where it's being called.
export const globalEval = eval;

// A reference to the global object.
// TODO The underscore is because it's conflicting with @types/node.
export const window = globalEval("this");

// The built-in libdeno functions are moved out of the global variable.
type MessageCallback = (msg: Uint8Array) => void;
interface Libdeno {
  recv(cb: MessageCallback): void;
  send(msg: ArrayBufferView): null | Uint8Array;
  print(x: string): void;
}
export const libdeno = window["libdeno"] as Libdeno;
window["libdeno"] = null;

window["window"] = window; // Create a window object.
// import "./url";

// import * as timer from "./timers";
// window["setTimeout"] = timer.setTimeout;
// window["setInterval"] = timer.setInterval;
// window["clearTimeout"] = timer.clearTimer;
// window["clearInterval"] = timer.clearTimer;

window.console = new Console(libdeno.print);
window.TextEncoder = TextEncoder;
window.TextDecoder = TextDecoder;

// import { fetch } from "./fetch";
// window["fetch"] = fetch;
