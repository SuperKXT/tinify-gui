import { ConfigStore } from './ipc';

declare global {
	const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
	const MAIN_WINDOW_WEBPACK_ENTRY: string;
	const electron: ConfigStore;
}