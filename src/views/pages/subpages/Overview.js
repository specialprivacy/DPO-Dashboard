import React, {Component} from "react";
import HeatMap from "./HeatMap";
import BarChart from "./BarChart";
import GeoMap from "./GeoMap";

class Overview extends Component {

  state = {
  }

  componentDidMount() {
  }

  render() {
    if (this.props.data === null) {
      return <div></div>
    }
    
    return (
      <div className="row">
        <div className="col-12">
          <HeatMap data={this.props.data} />
          <BarChart data={this.props.data} />
          <GeoMap data={this.props.data} />
        </div>
      </div>
    );
  }
}

export default Overview;