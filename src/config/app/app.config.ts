import { Ipc } from '../../types/ipc';
import { ConfigStore } from '../../schemas/config';

const {
	getIsPackaged,
	closeApplication,
} = window.electron;

const defaultConfigStore: ConfigStore = {
	isDarkMode: window.matchMedia('prefers-color-scheme: dark').matches,
};

const getConfigStore: Ipc['getConfigStore'] = async () => {
	try {
		return await window.electron.getConfigStore();
	}
	catch (error) {
		return defaultConfigStore;
	}
};

const changeConfigStore = async (
	newConfig: Partial<ConfigStore>
) => {

	const configStore = await getConfigStore();

	const newConfigStore = {
		...configStore,
		...newConfig,
	};

	await window.electron.changeConfigStore(newConfigStore);

};

const isFetchMockedConfig = {
	development: true,
	production: false,
	test: true,
};


const getIsFetchMocked = async () => (
	await getIsPackaged()
		? isFetchMockedConfig.production
		: isFetchMockedConfig.development
);

export {
	getIsPackaged,
	getConfigStore,
	closeApplication,
	changeConfigStore,
	getIsFetchMocked,
};