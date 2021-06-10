import { app, BrowserWindow } from 'electron';
/// #if DEV_MODE
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
/// #endif
import * as path from 'path';
import { dialog }  from 'electron';

async function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 768,
    width: 1024,
    webPreferences: {
      nodeIntegration: true
    }
  });

  /// #if DEV_MODE
  // In development mode load the page from webpack-dev-server
  try {
    await mainWindow.loadURL('http://localhost:3000/index.html');
  } catch (e) {
    dialog.showErrorBox('Startup error', "Startup error - did you forget to run 'yarn start'?\n" + e.message);
  }
  /// #else
  // In release mode load the page from the asar
  await mainWindow.loadFile(path.join(__dirname, 'index.html'));
  /// #endif
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
(async () => {
  await app.whenReady();

  try {
    /// #if DEV_MODE
    await installExtension(REACT_DEVELOPER_TOOLS);
    /// #endif

    await createWindow();
  } catch (e) {
    dialog.showErrorBox('Startup error', e.message)
  }


  app.on('activate', async () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
})();

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
