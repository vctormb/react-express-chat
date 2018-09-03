import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';

const LoadableRoot = Loadable({
  loader: () => import('./containers/Root'),
  loading: () => <div>Loading...</div>,
});

const isIE = /*@cc_on!@*/false || !!document.documentMode;

const renderComponent = () => {
	if (isIE) {
		return <div>We suggest you to use a modern web browser! Chrome, Firefox, Opera, Edge or Safari.</div>
	} else {
		return <LoadableRoot />
	}
}

ReactDOM.render(
	renderComponent()
	, document.getElementById('root'));
// registerServiceWorker();
