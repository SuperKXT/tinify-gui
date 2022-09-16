const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld(
	'electron',
	{
		getIsPackaged: () => ipcRenderer.invoke('getIsPackaged'),
		getConfigStore: () => ipcRenderer.invoke('getConfigStore'),
		changeConfigStore: (newConfigStore: any) => ipcRenderer.invoke('changeConfigStore', newConfigStore),
		closeApplication: () => ipcRenderer.send('closeApplication'),
	}
);

export { };