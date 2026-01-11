/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as addAlgorithms401to600 from "../addAlgorithms401to600.js";
import type * as addRemaining200 from "../addRemaining200.js";
import type * as algorithms from "../algorithms.js";
import type * as auth from "../auth.js";
import type * as auth_emailOtp from "../auth/emailOtp.js";
import type * as diagnostics from "../diagnostics.js";
import type * as http from "../http.js";
import type * as seed200Algorithms from "../seed200Algorithms.js";
import type * as seedAllAlgorithms from "../seedAllAlgorithms.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  addAlgorithms401to600: typeof addAlgorithms401to600;
  addRemaining200: typeof addRemaining200;
  algorithms: typeof algorithms;
  auth: typeof auth;
  "auth/emailOtp": typeof auth_emailOtp;
  diagnostics: typeof diagnostics;
  http: typeof http;
  seed200Algorithms: typeof seed200Algorithms;
  seedAllAlgorithms: typeof seedAllAlgorithms;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
