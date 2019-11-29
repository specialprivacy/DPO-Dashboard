import React, {Component} from "react";
import Card from "material-ui/Card/Card";
import CardHeader from "material-ui/Card/CardHeader";
import CardText from "material-ui/Card/CardText";
import { ResponsiveGeoMap } from "@nivo/geo";
import countries from "./WorldCountries.json";

class GeoMap extends Component {

  state = {
  }

  componentDidMount() {
  }

  render() {
    if (this.props.data === null) {
      return <div></div>
    }

    return (
      <Card 
        className="custom-card" 
        expandable={true} 
        style={{marginTop: "20px"}}>
        <CardHeader
          avatar="images/locationAvatar.png"
          showExpandableButton={true}
          title={
            <div>
              <h4>Request origins</h4>
            </div>
          }
          subtitle={<span>Geographical origin of data privacy requests</span>}>
        </CardHeader>
        <CardText expandable={true}>
          <div className="row">
            <div className="col-12">
              <div style={{height: "600px"}}>
                <ResponsiveGeoMap
                  features={countries.features}
                  margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                  projectionTranslation={[0.5, 0.5]}
                  projectionRotation={[0, 0, 0]}
                  fillColor="#eeeeee"
                  borderWidth={0.5}
                  borderColor="#333333"
                  enableGraticule={true}
                  graticuleLineColor="#666666"
                />                    
              </div>                               
            </div>
          </div>
        </CardText>
      </Card>
    );
  }
}

export default GeoMap;