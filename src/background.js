'use strict';

import { app, shell, protocol, BrowserWindow, Menu, ipcMain, dialog } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import defaultMenu from 'electron-default-menu';
const isDevelopment = process.env.NODE_ENV !== 'production';

let mainWindow;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
]);

async function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    title: 'Mini Bookkeeping',
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    mainWindow.loadURL('app://./index.html');
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  createWindow();
  buildMenu();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

function routerPush (route) {
  mainWindow.webContents.send('router:push', route);
}

let mainMenuTemplate = [
  {
    label: 'Data Management',
    submenu: [
      {
        label: 'Employees',
        click () {
          routerPush({
            name: 'EmployeesView'
          });
        }
      },
      {
        label: 'Departments',
        click () {
          routerPush({
            name: 'DepartmentsView'
          });
        }
      },
      {
        label: 'Shops',
        click () {
          routerPush({
            name: 'ShopsView'
          });
        }
      },
      {
        label: 'TypesOfCosts',
        click () {
          routerPush({
            name: 'TypesOfCostsView'
          });
        }
      },
      {
        label: 'Expenses',
        click () {
          routerPush({
            name: 'ExpensesView'
          });
        }
      }
    ]
  },
  {
    label: 'Analytics',
    submenu: [
      {
        label: 'Open Analytics',
        click () {
          routerPush({
            name: 'Analytics'
          });
        }
      }
    ]
  },
  {
    label: 'Administration',
    submenu: [
      {
        label: 'Open Admin Tools',
        click () {
          routerPush({
            name: 'Administration'
          });
        }
      }
    ]
  }
];

function buildMenu () {
  // Build menu from template
  if (isDevelopment) {
    mainMenuTemplate = defaultMenu(app, shell).concat(mainMenuTemplate);
  }
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
}

ipcMain.on('show-save-dialog', (e, options) => {
  dialog.showSaveDialog(mainWindow, options)
    .then(dialogDoneInfo => e.reply('save-dialog-callback', dialogDoneInfo));
});
