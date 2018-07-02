import React, { Component } from 'react';
import { BrowserRouter as Router, Route, } from "react-router-dom";

// styled components
import { injectGlobal } from 'styled-components';

// containers
import Wrapper from './containers/Chat/Wrapper';

injectGlobal`
  * { box-sizing: border-box; }
  #root, #root>div {
      height: 100vh;
      display: flex;
      flex-direction: row;
			background-color: #202225;
  }

  #root>div {
    flex: 1;
  }
  
  body { margin: 0; }
`;

class App extends Component {
  state = {}

  render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" component={Wrapper} />
          <Route path="/chat" component={Wrapper} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
