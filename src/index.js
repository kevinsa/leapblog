import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './containers/app/App';
import registerServiceWorker from './registerServiceWorker';

import {Root} from './containers/root/Root';
import {Home} from './containers/home/Home';

class App extends React.Component {
  render() {
    return(
      <Root>
        <Home></Home>
      </Root>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
