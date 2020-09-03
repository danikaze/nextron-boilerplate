# nextron-boilerplate

A boilerplate based in nextron with common utilities to work with Next.js and Electron.

## Features

### Ready

- TypeScript support
- [Material UI](https://material-ui.com/)
- [Prettier](https://prettier.io/)
- [Linting](https://palantir.github.io/tslint/)
- [Git hooks](https://github.com/typicode/husky)
- [TypeScript source path aliases support](https://stackoverflow.com/questions/51319613/in-vs-code-ts-cannot-find-module-src-xxx)
- Build time constants (including [git revisions](https://www.npmjs.com/package/git-revision-webpack-plugin))
- Build time secret constants

### Planned

- Read settings from files
- Server and client logs
- i18n
- Migrate to [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)
- Unit testing
- Visual regression testing

## Setup

1. Clone this repository

```
git clone https://github.com/danikaze/nextron-boilerplate.git PROJECT_FOLDER
```

2. Change the origin to the new repository

```
cd PROJECT_FOLDER
git remote rm origin
git remote add origin YOUR_REMOTE_REPOSITORY.git
git branch --set-upstream-to=origin/master master
```

3. Change the `name`, `description` and `version` if needed in [package.json].

4. Install the needed packages

```
npm install
```

## Configuration

### TypeScript path aliases

- For path aliases to be available in the main process, edit the [main/tsconfig.json](./main/tsconfig.json) file.
- For path aliases to be available in the renderer process, edit the [renderer/tsconfig.json](./renderer/tsconfig.json) file.
- Add the union of all the added aliases to the `no-implicit-dependencies` rule in the [tslint.yaml](./tslint.yaml) file.

### Build-time constants definition

This boilerplate already provide with basic global constants accessible in different contexts. Check [this document](./build-time-constants/README.md) for more information.

Basic constants list is this:

| Constant          | Main | Renderer |
| ----------------- | ---- | -------- |
| PACKAGE_NAME      | ✔    | ✔        |
| PACKAGE_VERSION   | ✔    | ✔        |
| COMMIT_HASH       | ✔    | ✔        |
| COMMIT_HASH_SHORT | ✔    | ✔        |
| IS_PRODUCTION     | ✔    | ✔        |
| IS_SERVER         |      | ✔        |
| BUILD_ID          |      | ✔        |
