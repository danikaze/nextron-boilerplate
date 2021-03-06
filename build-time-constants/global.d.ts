/*
 * Data from the build
 */
/** Env constant set to (package.json).name */
declare const PACKAGE_NAME: string;
/** Env constant set to (package.json).version */
declare const PACKAGE_VERSION: string;
/** Env constant set to the git commit hash */
declare const COMMIT_HASH: string;
/** Env constant set to the 7 first characters of the git commit hash */
declare const COMMIT_HASH_SHORT: string;
/** Env constant set to `true` for the production build, `false` for development */
declare const IS_PRODUCTION: boolean;

/*
 * Data from global.js
 */
/** Example of a value available in the whole application */
declare const GLOBAL_EXAMPLE: string;

/*
 * Data from global-secret.js
 */
/** Example of a secret value available in the whole application */
declare const GLOBAL_SECRET_EXAMPLE: string;
