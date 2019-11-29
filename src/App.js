import React, {Component} from "react";
import "./styles/App.css";
import {backendUrl, defaultHeaders} from "./AppContainer";
import MainMenu from "./views/MainMenu";
import MainView from "./views/MainView";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import SignOut from "material-ui/svg-icons/action/power-settings-new";

var request = require("request");

class App extends Component {

  state = {
    data: null,
    numberMessages: 0,
    showMessageBadge: false,
    messageSectionOpen: false
  };

  componentDidMount() {
    const self = this;

    var options = {
      method: "get",
      url: backendUrl + "/dpo/pull",
      headers: defaultHeaders,
      qs: {
        from: Date.now() - 1000 * 60 * 60 * 24 * 365 * 3,
        to: Date.now()
      },
      json: true
    }
    request(options, function(err, res, body) {
      if (err) {
        return
      }

      if (!body.success) {
        self.setState({error: true, errorMsg: body.message});
      } else {
        self.setState({data: body.result});
      }
      self.forceUpdate();
    });
  }

  AppBarMenu = <span>
    <IconButton 
      className="logout-btn"
      tooltip="Sign out" 
      tooltipPosition="top-center" 
      onClick={() => {this.props.setLoggedIn(false, "")}}>
      <SignOut/>
    </IconButton>
  </span>

  render() {
    return (
      <div id="main-container" className="container-fluid">
        <AppBar
          className="xs-sm-appbar"
          title={<span>DPO Dasboard</span>}
          showMenuIconButton={false}
          iconElementRight={this.AppBarMenu}
        />

        <div className="row">
          <div className="col-lg-3">
            <MainMenu 
              setLoggedIn={this.props.setLoggedIn}
            />
          </div>

          <div id="main-view-container" className="col-lg-9">
            <MainView 
              appBarMenu={this.AppBarMenu} 
              data={this.state.data} 
              setLoggedIn={this.props.setLoggedIn} 
            />
          </div>            
        </div>
      </div>
    );
  }
}

export default App;