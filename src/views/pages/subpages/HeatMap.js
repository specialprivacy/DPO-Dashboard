import React, {Component} from "react";
import Card from "material-ui/Card/Card";
import CardHeader from "material-ui/Card/CardHeader";
import CardText from "material-ui/Card/CardText";
import IconButton from "material-ui/IconButton";
import { ResponsiveCalendar } from "@nivo/calendar";
import ArrowBack from "material-ui/svg-icons/navigation/arrow-back";
import ArrowForward from "material-ui/svg-icons/navigation/arrow-forward";

class HeatMap extends Component {

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
          avatar="images/heatMapAvatar.png"
          showExpandableButton={true}
          title={
            <div>
              <h4>Activity heat map</h4>
            </div>
          }
          subtitle={<span>Data privacy requests over the year</span>}>
        </CardHeader>
        <CardText expandable={true}>
          <div className="row">
            <div className="col-1">
              <IconButton 
                onClick={() => 
                  this.setState({heatMapYear: Number.parseInt(this.state.heatMapYear)-1})
                }
                tooltip="See last year">
                  <ArrowBack />
              </IconButton>
            </div>
            <div className="col-10">
              <div style={{height: "200px"}}>
                <ResponsiveCalendar
                  data={
                    this.props.data
                      .map((entry) => {
                        let date = new Date(entry.timestamp);
                        let day = date.toISOString().split("T")[0]
                        return {
                          day: day,
                        };
                      }).reduce((result, day) => {
                        let wasInside = false;
                        for (var i=0; i < result.length; i++) {
                          if (result[i].day === day.day) {
                            result[i].value += 1;
                            wasInside = true;
                          }
                        }
                        if (!wasInside) {
                          result.push({day: day.day, value: 1});
                        }
                        return result;
                      }, [])
                  }
                  from={this.state.heatMapYear + "-01-01"}
                  to={this.state.heatMapYear + "-12-31"}
                  emptyColor="#eeeeee"
                  colors={[ "#61cdbb", "#97e3d5", "#e8c1a0", "#f47560" ]}
                  margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                  yearSpacing={40}
                  monthBorderColor="#ffffff"
                  dayBorderWidth={2}
                  dayBorderColor="#ffffff"
                  legends={[{
                    anchor: "bottom",
                    direction: "row",
                    translateY: 36,
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    itemDirection: "right-to-left"
                  }]}
                />            
              </div>                               
            </div>
            <div className="col-1">
              <IconButton 
                onClick={() => 
                  this.setState({heatMapYear: Number.parseInt(this.state.heatMapYear)+1})
                }
                tooltip="See next year">
                  <ArrowForward />
              </IconButton>
            </div>
          </div>
        </CardText>
      </Card>
    );
  }
}

export default HeatMap;