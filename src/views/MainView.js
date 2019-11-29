import React, {Component} from "react";
import Card from "material-ui/Card/Card";
import CardText from "material-ui/Card/CardText";
import AppBar from "material-ui/AppBar";
import Divider from "material-ui/Divider";
import "../styles/MainView.css";
import OverviewIcon from "material-ui/svg-icons/action/home";
import RequestsIcon from "material-ui/svg-icons/communication/chat";
import Overview from "./pages/subpages/Overview";
import Requests from "./pages/subpages/Requests";

class MainView extends Component {

  state = {
  }

  componentDidMount() {
    const self = this;
    window.onhashchange = () => {self.forceUpdate()}
  }

  render() {
    const pages = {
      "#start": { 
        title: "Home", 
        element: <Overview data={this.props.data} />, 
        icon: <OverviewIcon /> 
      },
      "#requests": { 
        title: "Requests", 
        element: <Requests data={this.props.data} />, 
        icon: <RequestsIcon /> 
      },
    };

    var page = {title: "Home", element: <Overview pages={pages}/>, icon: <OverviewIcon/>}
    if (pages.hasOwnProperty(window.location.hash)) {
      page = pages[window.location.hash];
    }    

    return (
      <div>
        <AppBar
          className="md-up-appbar"
          title="DPO Dashboard"
          showMenuIconButton={false}
          iconElementRight={this.props.appBarMenu}
        />
        <Card containerStyle={{paddingBottom: "0px"}}>
          <CardText id="content-container" style={{paddingBottom: "0px"}}>
            <h4><span className="headline">{page.icon}{page.title}</span></h4>
            <Divider/>
            <div className="row">
              <div className="col-12">
                {page.element}
              </div>
            </div>
          </CardText>
       </Card>        

        {/* TODO: update links, push things to GitHub special group */}
        <div id="footer">
          <p>
            <img src="https://www.specialprivacy.eu/images/ressources/EU_logos/eu.jpg" alt=""/>
          </p>
          <p>
            This project received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement
            <a title="Cordis Europa" href="http://cordis.europa.eu/project/rcn/206343_en.html" rel="noopener noreferrer" target="_blank">&nbsp;No. 731601</a>
          </p>
          <p>
            <a href="https://www.specialprivacy.eu/legal-notice" rel="noopener noreferrer" target="_blank">Legal Notice</a> | 
            <a href="https://www.specialprivacy.eu/privacy-policy" rel="noopener noreferrer" target="_blank">&nbsp;Privacy Policy</a>
          </p>
          <div style={{textAlign: "center"}}>
            <h5>Documentation and reporting:</h5>
              <p>
                <b>D4.1 Transparency dashboard and control panel release V1 (M16)</b> |&nbsp;
                <a href="https://www.specialprivacy.eu/images/documents/SPECIAL_D4.1_M16_V1.0.pdf">Report</a> |&nbsp;
                <a href="https://specialprivacy.github.io/D4.1-Privacy-Dashboard-DEMO/">Demo</a> |&nbsp;
                <a href="https://github.com/specialprivacy/D4.1-Privacy-Dashboard">Source code</a>
              </p>
              <p>
                <b>D4.2 Usability testing report V1 (M18)</b> |&nbsp;
                <a href="https://www.specialprivacy.eu/images/documents/SPECIAL_D4.2_M18_V1.0.pdf">Report</a> |&nbsp;
                <a href="https://specialprivacy.github.io/D4.2-Privacy-Dashboard-DEMO/">Demo</a> |&nbsp;
                <a href="https://github.com/specialprivacy/D4.2-Privacy-Dashboard">Source code</a>                
              </p>
              <p>
                <b>D4.3 Transparency dashboard and control panel release V2 (M25)</b> |&nbsp;
                <a href="https://www.specialprivacy.eu/images/documents/SPECIAL_D43_M25_V10.pdf">Report</a> |&nbsp;
                <a href="https://specialprivacy.github.io/D4.3-Privacy-Dashboard-DEMO/">Demo</a> |&nbsp;
                <a href="https://github.com/specialprivacy/D4.3-Privacy-Dashboard">Source code</a>
              </p>
              <p>
                <b>D4.4 Usability testing report V2 (M27)</b> |&nbsp;
                <a href="https://www.specialprivacy.eu/images/documents/SPECIAL_D44_M27_V10.pdf">Report</a> |&nbsp;
                <a href="https://specialprivacy.github.io/D4.4-Privacy-Dashboard-DEMO/">Demo</a> |&nbsp;
                <a href="https://github.com/specialprivacy/D4.4-Privacy-Dashboard">Source code</a>                
              </p>
              <p>
                <b>D4.5 Transparency dashboard and control panel release final release (M35)</b> |&nbsp;
                <a href="https://www.specialprivacy.eu/images/documents/SPECIAL_D45_M35_V10.pdf">Report</a> |&nbsp;
                <a href="https://specialprivacy.github.io/D4.5-Privacy-Dashboard-DEMO/">Demo</a> |&nbsp;
                <a href="https://github.com/specialprivacy/D4.5-Privacy-Dashboard">Source code</a>
              </p>
          </div>
        </div>
      </div>
    );
  }
}

export default MainView;