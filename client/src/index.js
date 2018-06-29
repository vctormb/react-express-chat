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
                graydark: '#202225',
                graylight: '#2f3136',
            }
        }}
    >

        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
