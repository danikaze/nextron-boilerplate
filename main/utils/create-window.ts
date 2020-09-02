import {
  screen,
  BrowserWindow,
  BrowserWindowConstructorOptions,
} from 'electron';
import { default as ElectronStore } from 'electron-store';

interface WindowBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface StoredData extends WindowBounds {
  name: string;
  'window-state'?: {
    width?: number;
    height?: number;
  };
}

export function createWindow(
  windowName: string,
  options: BrowserWindowConstructorOptions
): BrowserWindow {
  const key = 'window-state';
  const name = `window-state-${windowName}`;
  const store = new ElectronStore<StoredData>({ name });
  const defaultSize = {
    width: options.width,
    height: options.height,
  };
  let state = {} as WindowBounds;
  let win: BrowserWindow;

  const restore = () => store.get(key, defaultSize);

  const getCurrentPosition = () => {
    const position = win.getPosition();
    const size = win.getSize();
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1],
    };
  };

  const windowWithinBounds = (
    windowState: WindowBounds,
    bounds: WindowBounds
  ) => {
    return (
      windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
    );
  };

  const resetToDefaults = (): WindowBounds => {
    const bounds = screen.getPrimaryDisplay().bounds;
    return {
      ...defaultSize,
      x: (bounds.width - defaultSize.width!) / 2,
      y: (bounds.height - defaultSize.height!) / 2,
    } as WindowBounds;
  };

  const ensureVisibleOnSomeDisplay = (
    windowState: WindowBounds
  ): WindowBounds => {
    const visible = screen.getAllDisplays().some((display) => {
      return windowWithinBounds(windowState, display.bounds);
    });
    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return resetToDefaults();
    }
    return windowState;
  };

  const saveState = () => {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition());
    }
    store.set(key, state);
  };

  state = ensureVisibleOnSomeDisplay(restore() as StoredData);

  const browserOptions: BrowserWindowConstructorOptions = {
    ...options,
    ...state,
    webPreferences: {
      nodeIntegration: true,
      ...options.webPreferences,
    },
  };
  win = new BrowserWindow(browserOptions);

  win.on('close', saveState);

  return win;
}
