import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// rebass
import { Provider, } from 'rebass';

ReactDOM.render(
	<Provider
		theme={{
			colors: {
				grayxdark: '#202225',
				graydark: '#2f3136',
				graylight: '#36393e',
				graysoft: '#36393f',
				graywhite: '#b9bbbe',
				purple: '#7289da',
				purplesoft: '#677bc4',
				purpledark: '#5b6eae',
			},
			shadows: {
				bottom: '0 1px 0 rgba(0,0,0,.2), 0 2px 0 rgba(0,0,0,.06)',
			},
		}}
	>

		<App />
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();
