export interface ConfigStore {
	isDarkMode: boolean,
}

export interface Ipc {
	getIsPackaged: () => Promise<boolean>,
	getConfigStore: () => Promise<ConfigStore>,
	changeConfigStore: (configStore: ConfigStore) => Promise<ConfigStore>,
	closeApplication: () => void,
}