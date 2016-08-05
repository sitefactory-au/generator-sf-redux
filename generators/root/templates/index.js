import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import DevTools from './utils/DevTools';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './pages/Home';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)
/* TDOD: Populated by sf-redux:component */

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <div>
        <Router history={history}>
          <Route path="/" component={Home} />
        </Router>
        { !window.devToolsExtension ? <DevTools /> : null }
      </div>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
