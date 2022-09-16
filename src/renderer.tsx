import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

window.React = React;

const rootElement = document.getElementById('root');
if (!rootElement) {
	throw new Error('No root element found in index.html');
}
const root = createRoot(rootElement);
root.render(<App />);