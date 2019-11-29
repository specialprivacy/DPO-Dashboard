import React, {Component} from "react";
import Card from "material-ui/Card/Card";
import CardHeader from "material-ui/Card/CardHeader";
import CardText from "material-ui/Card/CardText";
import { ResponsiveBar } from "@nivo/bar"

class BarChart extends Component {

  state = {
    heatMapYear: new Date().toISOString().split("-")[0]
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
          avatar="images/logAvatar.png"
          showExpandableButton={true}
          title={
            <div>
              <h4>Request types</h4>
            </div>
          }
          subtitle={<span>Types of data privacy requests per month</span>}>
        </CardHeader>
        <CardText expandable={true}>
          <div className="row">
            <div className="col-12">
              <div style={{height: "400px"}}>
                <ResponsiveBar
                  data={
                    this.props.data
                      .map((e) => {
                        let date = new Date(e.timestamp);
                        let isoString = date.toISOString().split("T")[0].split("-");
                        let monthYear = isoString[0] + "-" + isoString[1];
                        return {
                          monthYear: monthYear,
                          type: e.instanceData.type
                        };
                      }).reduce((result, e) => {
                        let wasInside = false;
                        for (var i=0; i < result.length; i++) {
                          if (result[i].monthYear === e.monthYear) {
                            if (result[i].hasOwnProperty(e.type)) {
                              result[i][e.type] += 1;
                            } else {
                              result[i][e.type] = 1;
                            }
                            wasInside = true;
                          }
                        }
                        if (!wasInside) {
                          let obj = {monthYear: e.monthYear};
                          obj[e.type] = 1;
                          
                          result.push(obj);
                        }
                        return result;
                      }, [])
                  }
                  keys={
                    this.props.data
                      .map((e) => e.instanceData.type)
                      .filter((value, index, self) => self.indexOf(value) === index)
                  }
                  indexBy="monthYear"
                  margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                  padding={0.3}
                  colors={{ scheme: "nivo" }}
                  borderColor={{ from: "color", modifiers: [ [ "darker", 1.6 ] ] }}
                  axisTop={null}
                  axisRight={null}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{ from: "color", modifiers: [ [ "darker", 1.6 ] ] }}
                  legends={[{
                      dataFrom: "keys",
                      anchor: "bottom",
                      direction: "row",
                      justify: false,
                      translateY: 45,
                      itemsSpacing: 64,
                      itemWidth: 100,
                      itemHeight: 20,
                      itemDirection: "left-to-right",
                      itemOpacity: 0.85,
                      symbolSize: 20,
                      effects: [{
                          on: "hover",
                          style: {
                            itemOpacity: 1
                          }
                      }]
                    }
                  ]}
                />
              </div>                               
            </div>
          </div>
        </CardText>
      </Card>
    );
  }
}

export default BarChart;