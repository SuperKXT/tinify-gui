import { useState, useEffect, FormEventHandler } from 'react';

import { changeConfigStore, closeApplication, getConfigStore, getIsPackaged } from './config/app';
import { ConfigStore } from './schemas/config';

// import ThemeTypeContext from './contexts/ThemeTypeContext';

// import AppContainer from './containers/AppContainer';

const App = () => {

	const [status, setStatus] = useState<'Checking...' | 'Packaged' | 'Not Packaged'>('Checking...');
	const [config, setConfig] = useState<null | ConfigStore>(null);

	useEffect(() => {
		getIsPackaged().then(value =>
			setStatus(value ? 'Packaged' : 'Not Packaged')
		);
	}, [getIsPackaged]);

	const getConfig = async () => {
		const config = await getConfigStore();
		setConfig(config);
	};

	const updateConfig: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		const form = Object.fromEntries(new FormData(event.target as HTMLFormElement));
		console.info(form);
		changeConfigStore({
			isDarkMode: form.isDarkMode === 'on',
		});
	};

	// const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	// const [isDarkTheme, setIsDarkTheme] = useState(false);

	// useEffect(() => {
	// 	setIsDarkTheme(prefersDarkMode);
	// }, [prefersDarkMode]);

	// return (
	// 	<ThemeTypeContext.Provider
	// 		value={{ isDarkTheme, setIsDarkTheme }}
	// 	>
	// 		<AppContainer />
	// 	</ThemeTypeContext.Provider>

	// );
	return (
		<>
			<h1>💖 Hello World!</h1>
			<p>Welcome to your Electron application</p>
			<p>The app is: {status}</p>

			<button onClick={getConfig}>{config ? 'Re' : ''}Load Config</button>

			{!config && <p>Config Not Loaded!</p>}

			{config &&
				<form onSubmit={updateConfig}>
					<label>
						Is Dark Mode?
						<input
							name='isDarkMode'
							type='checkbox'
							defaultChecked={config.isDarkMode}
						/>
					</label>
					<button type='submit'>Update</button>
				</form>
			}
			<button onClick={closeApplication}>Close</button>
		</>
	);

};

export default App;