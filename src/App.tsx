// import { useState, useEffect } from 'react';

// import ThemeTypeContext from './contexts/ThemeTypeContext';

// import AppContainer from './containers/AppContainer';

const App = () => {

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
		</>
	);

};

export default App;