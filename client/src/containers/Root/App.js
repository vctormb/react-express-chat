import React, { Component } from 'react';
import { BrowserRouter as Router, Route, } from "react-router-dom";

// styled components
import { injectGlobal } from 'styled-components';

// components
import PrivateRoute from '../../components/Routing/PrivateRoute';

// containers
import Wrapper from '../../containers/Chat/Wrapper';
import Login from '../../containers/Login/Login';

injectGlobal`
	html, body {
		height: 100%;
	}

	body { 
		margin: 0; 
		padding: 0;
	}

  * { box-sizing: border-box; }

  #root, #root>div {
			height: 100%;
      display: flex;
      flex-direction: row;
			background-color: #202225;
  }

  #root>div {
    flex: 1;
  }
`;

class App extends Component {
	state = {}

	render() {
		return (
			<Router>
				<React.Fragment>
					<Route exact path="/" component={Login} />
					<Route path="/login" component={Login} />
					<PrivateRoute exact path="/chat/:id?" component={Wrapper} />
				</React.Fragment>
			</Router>
		);
	}
}

export default App;
