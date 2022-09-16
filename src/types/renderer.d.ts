import { Ipc } from './ipc';

declare global {
	interface Window {
		electron: Ipc,
	}
}