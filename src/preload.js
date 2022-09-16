const { ipcRenderer, contextBridge } = require('electron'); // eslint-disable-line @typescript-eslint/no-var-requires

contextBridge.exposeInMainWorld(
	'electron',
	{

		/** @type {import('./types/ipc').Ipc['getIsPackaged']} */
		getIsPackaged: () => ipcRenderer.invoke('getIsPackaged'),

		/** @type {import('./types/ipc').Ipc['getConfigStore']} */
		getConfigStore: () => ipcRenderer.invoke('getConfigStore'),

		/** @type {import('./types/ipc').Ipc['changeConfigStore']} */
		changeConfigStore: (configStore) => ipcRenderer.invoke('changeConfigStore', configStore),

		/** @type {import('./types/ipc').Ipc['closeApplication']} */
		closeApplication: () => ipcRenderer.send('closeApplication'),

	}
);