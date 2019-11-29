import React, {Component} from "react";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import Subheader from "material-ui/Subheader";
import Card from "material-ui/Card";
import CardText from "material-ui/Card/CardText";
import Tabs from "material-ui/Tabs";
import Tab from "material-ui/Tabs/Tab";
import Badge from "material-ui/Badge";
import Divider from "material-ui/Divider";
import "../styles/MainMenu.css";
import Startpage from "material-ui/svg-icons/action/home";
import OverviewIcon from "material-ui/svg-icons/action/home";
import RequestsIcon from "material-ui/svg-icons/communication/chat";
import { generateRandomKey } from "../AppContainer";

class MainMenu extends Component {

  render() {
    const startHash = "#start"
    const tabStyle = {
      background: "white", 
      width: "auto", 
      padding: "0 20px", 
      color: "black", 
      borderRadius: "0 0 10px 10px", 
      border: "0 2px 2px 0 solid lightgrey"
    };

    var router = [{
      name: "Main", 
      entries: [
        {label: "Overview", icon: <OverviewIcon/>, hash: "#start", badge: false},
        {label: "Requests", icon: <RequestsIcon />, hash: "#requests", badge: false},
    ]}];

    return (
      <div id="main-menu">
        <Card className="d-none d-lg-block d-xl-block">
          <CardText>
            <List>
              {
                router.map((group) => {
                  return (
                    <div key={generateRandomKey()}>
                      <Subheader>{group.name}</Subheader>
                      <Divider/>
                      {
                        group.entries.map((entry) => {
                          return (
                            <ListItem
                              key={generateRandomKey()}
                              leftIcon={entry.icon}
                              primaryText={entry.label}
                              rightIcon={(entry.badge) ? <Badge badgeContent="!" primary={true}/> : <span></span>}
                              onClick={() => {
                                if (entry.hasOwnProperty("hash")) {
                                  window.location.hash = entry.hash;
                                } else if (entry.hasOwnProperty("href")) {
                                  window.location.href = entry.href;
                                }
                              }}
                              style={{borderRadius: "20px"}}
                            />
                          )
                        })
                      }
                    </div>     
                  )
                })
              }
            </List>
          </CardText>
        </Card>

        <Tabs 
          ref="tabs"
          className="d-block d-lg-none d-xl-none" 
          style={{overflowX: "scroll"}}
          tabItemContainerStyle={{background: "#fff"}}
          inkBarStyle={{display: "none"}}>
            <Tab 
              icon={<Startpage/>}
              label="Home"
              onActive={(tab) => {window.location.hash = startHash;}}
              style={tabStyle}
            />
          {
            router.map((group) => {
              return group.entries.map((entry) => {
                return (
                  <Tab 
                    key={generateRandomKey()}
                    icon={entry.icon}
                    label={entry.label} 
                    onActive={(tab) => {window.location.hash = entry.hash;}}
                    style={tabStyle}
                  />
                )
              })
            })
          }
        </Tabs>
      </div>
    );
  };
}

export default MainMenu;
