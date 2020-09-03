import { app } from 'electron';
import serve from 'electron-serve';
import { createWindow } from '@utils/create-window';

if (IS_PRODUCTION) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();
  printBuildConstants();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  if (IS_PRODUCTION) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});

/*
 * To be removed in the real app,
 * this just tests that all the constants are accessible
 */
function printBuildConstants() {
  // tslint:disable: object-literal-shorthand no-console
  console.log({
    PACKAGE_NAME: PACKAGE_NAME,
    PACKAGE_VERSION: PACKAGE_VERSION,
    COMMIT_HASH: COMMIT_HASH,
    COMMIT_HASH_SHORT: COMMIT_HASH_SHORT,
    IS_PRODUCTION: IS_PRODUCTION,
    GLOBAL_EXAMPLE: GLOBAL_EXAMPLE,
    GLOBAL_SECRET_EXAMPLE: GLOBAL_SECRET_EXAMPLE,
    MAIN_EXAMPLE: MAIN_EXAMPLE,
    MAIN_SECRET_EXAMPLE: MAIN_SECRET_EXAMPLE,
  });
}
