const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const { start } = require('repl');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  
  const startUrl = url.format({
    pathname: path.join(__dirname , '../build/index.html'),
    protocol: 'file',
  });

  mainWindow.loadURL('http://localhost:3000');

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
