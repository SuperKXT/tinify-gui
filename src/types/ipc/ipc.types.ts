import { ConfigStore } from '../../schemas/config';

export interface Ipc {
	getIsPackaged: () => Promise<boolean>,
	getConfigStore: () => Promise<ConfigStore>,
	changeConfigStore: (configStore: ConfigStore) => Promise<void>,
	closeApplication: () => void,
}