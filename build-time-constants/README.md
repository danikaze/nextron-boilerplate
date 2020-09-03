# Build-time constants

This folder contains the definitions for the data defined in build-time. This data will be available as global constants in their specified context, depending on the file where it's declared.

| File                   | Main | Renderer/Server | Renderer/Client |
| ---------------------- | ---- | --------------- | --------------- |
| global                 | ✔    | ✔               | ✔               |
| global-secret          | ✔    | ✔               | ✔               |
| main                   | ✔    |                 |                 |
| main-secret            | ✔    |                 |                 |
| renderer               |      | ✔               | ✔               |
| renderer-secret        |      | ✔               | ✔               |
| renderer-server        |      | ✔               |                 |
| renderer-server-secret |      | ✔               |                 |
| renderer-client        |      |                 | ✔               |
| renderer-client-secret |      |                 | ✔               |

Each context consist of 2 files:

- Declaration file: a `.d.ts` file describing the data type of each constant.
- Definition file: a `.js` file defining the value of each constant

Furthermore, if a `.js` file ends in `-secret` (i.e. `main-secret.js`) it won't be included in the repository, being useful for declaring secret keys, passwords, etc.

The definitions of the `-secret` file must be in the same declaration file as the non-secret one (i.e. type declarations for `main-secret.js` **and** `main.js` will be specified in `main.d.ts`)

Note that in the case of the renderer, both cases, server and client will be available for TypeScript, but not their value, which will be provided correctly.

i.e: The **declaration** for a server-exclusive value will be visible in the client side, but their **values** will be undefined resulting in an runtime error if wrongly used.

Precedence for the values goes as the table is described, from low to high (values with the same name declared in `main.js` will override values of `global.js`).
