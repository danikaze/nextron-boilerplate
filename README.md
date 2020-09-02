# nextron-boilerplate

A boilerplate based in nextron with common utilities to work with Next.js and Electron.

## Features

### Ready

- TypeScript support
- [Material UI](https://material-ui.com/)
- [Prettier](https://prettier.io/)
- [Linting](https://palantir.github.io/tslint/)
- [Git hooks](https://github.com/typicode/husky)

### Planned

- [TypeScript source path aliases support](https://stackoverflow.com/questions/51319613/in-vs-code-ts-cannot-find-module-src-xxx)
- Build time constants (including [git revisions](https://www.npmjs.com/package/git-revision-webpack-plugin))
- Build time secret constants
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
git remote set-url YOUR_REMOTE_REPOSITORY.git
```

3. Change the `name`, `description` and `version` if needed in [package.json].

4. Install the needed packages

```
npm install
```



