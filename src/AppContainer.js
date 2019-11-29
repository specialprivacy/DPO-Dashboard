import React, {Component} from 'react';
import App from "./App";
import LoginForm from './views/LoginForm';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from "material-ui/styles/getMuiTheme";
import specialTheme from "./themes/specialTheme";

export var theme = specialTheme;

var bUrl = "";
if (process.env.NODE_ENV === "production") {
  bUrl = "https://backend.special.tlabs.cloud/api";
} else {
  bUrl = "http://localhost:3000/api";
}
export const backendUrl = bUrl;

var key = "acadd8ae-1f8e-4148-9bb5-fe0d821e2a03";
export const apiKey = key;

export var defaultHeaders = {
  "Authorization": "Bearer " + window.localStorage.getItem(apiKey + ":token"),
  "Content-Type": "application/json",
  "x-api-key": apiKey
};

class AppContainer extends Component {

  state = {
    theme: specialTheme,
    loggedIn: false,
  };

  componentDidMount() {
    var token = window.localStorage.getItem(apiKey + ":token");
    if (token !== null) {
      this.setLoggedIn(true, token);
    }
  }

  setLoggedIn = (loggedIn, token) => {
    if (loggedIn) {
      window.localStorage.setItem(apiKey + ":token", token);
      defaultHeaders.Authorization = "Bearer " + window.localStorage.getItem(apiKey + ":token");
    } else {
      window.localStorage.removeItem(apiKey + ":token");
    }
    this.setState({loggedIn: loggedIn});
  }

  render() {
    var content;
    if (!this.state.loggedIn) {
      content = <LoginForm setLoggedIn={this.setLoggedIn} />
    } else {
      content = 
        <App 
          setLoggedIn={this.setLoggedIn} 
        />
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(this.state.theme)}>
        <div>
          <div className="background-container">
            <div className="background-image" style={{background: theme.background}}/>
          </div>
          {content}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default AppContainer;


// https://stackoverflow.com/a/27747377
function dec2hex(dec) {
  return ("0" + dec.toString(16)).substr(-2);
}

export const generateRandomKey = () => {
  var arr = new Uint8Array((12 || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
};