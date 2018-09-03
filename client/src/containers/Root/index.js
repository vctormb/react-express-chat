import React from 'react';

// redux
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducers from '../../redux/rootReducers';

import App from './App';

// rebass
import { Provider as RebassProvider, } from 'rebass';

const store = createStore(rootReducers, {}, composeWithDevTools());

const Root = () => (
	<ReduxProvider store={store}>
		<RebassProvider
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
					right: '0 0 20px rgba(0,0,0,.5), 0 0 21px rgba(0,0,0,.06)',
				},
			}}
		>
			<App />
		</RebassProvider>
	</ReduxProvider>
)

export default Root;