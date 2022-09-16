import fs from 'fs';
import path from 'path';
import {
	app,
	BrowserWindow,
	ipcMain,
	screen,
} from 'electron';

import { configStoreSchema, ConfigStore } from './schemas/config';

import { Ipc } from './types/ipc';
import util from 'util';

const stat = util.promisify(fs.stat);
const mkdir = util.promisify(fs.mkdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
	app.quit();
}

const createWindow = () => {

	const size = screen.getPrimaryDisplay().size;
	const isBiggerScreen = (size.width >= 1024) && (size.height >= 600);
	const width = isBiggerScreen ? 1024 : 800;
	const height = isBiggerScreen ? 600 : 480;

	const mainWindow = new BrowserWindow({
		width,
		height,
		resizable: false,
		backgroundColor: '#F4F4FE',
		autoHideMenuBar: true,
		icon: path.join(app.getAppPath(), 'src', 'images', 'favicon.png'),
		// // frame: false,
		title: 'Fabric Processing Monitoring System',
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: app.isPackaged ? MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY : path.join(app.getAppPath(), 'src', 'preload.js'),
		},
	});

	// and load the index.html of the app.
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	if (!app.isPackaged) {
		mainWindow.webContents.openDevTools({ mode: 'detach' });
	}

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

const configFolder = app.getPath('userData');
const configStorePath = path.join(
	configFolder,
	'config.json'
);

const getConfigStore: Ipc['getConfigStore'] = async () => {
	const file = await readFile(configStorePath, 'utf-8');
	const json = JSON.parse(file);
	const configStore = configStoreSchema.parse(json);
	return configStore;
};

const changeConfigStore: Ipc['changeConfigStore'] = async (newConfigStore: ConfigStore) => {
	return writeFile(
		configStorePath,
		JSON.stringify(newConfigStore),
		'utf-8'
	);
};

ipcMain.handle('getIsPackaged', () => app.isPackaged);
ipcMain.handle('getConfigStore', () => getConfigStore());
ipcMain.handle('changeConfigStore', (_event, newConfig) => changeConfigStore(newConfig));
ipcMain.on('closeApplication', () => app.exit());