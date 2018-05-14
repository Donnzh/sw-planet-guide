import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {createMuiTheme} from 'material-ui/styles';
import registerServiceWorker from './registerServiceWorker';

const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
registerServiceWorker();
