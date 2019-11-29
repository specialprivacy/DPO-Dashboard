import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import DataTable from "react-data-table-component";
import JSONPretty from "react-json-pretty";
import IconButton from "material-ui/IconButton";
import MailIcon from "material-ui/svg-icons/communication/email";
import {generateRandomKey} from "../../../AppContainer";

class Requests extends Component {

  state = {
    open: false,
    selectedMessage: "",
  }

  componentDidMount() {
  }

  render() {
    if (this.props.data === null) {
      return <div></div>
    }

    const self = this;
    const columns = [
      { name: "Date", selector: "date", sortable: true, compact: true },
      { name: "Deadline", selector: "deadline", sortable: true, compact: true },
      { name: "Subject", selector: "type", sortable: true, compact: true },
      { name: "Message", selector: "dialogOpener", sortable: false, compact: true, left: true, minWidth: "100px" },
    ];

    const ExpanableComponent = ({ data }) => <JSONPretty data={data.instanceData}></JSONPretty>;

    return (
      <div className="row">
        <div className="col-12">
          <DataTable
            pagination={true}
            striped={true}
            highlightOnHover={true}
            expandableRows={true}
            expandableRowsComponent={<ExpanableComponent/>}            
            columns={columns}
            data={
              this.props.data
                .map((e) => {
                  let dateObj = new Date(e.timestamp);
                  let date = dateObj.toLocaleDateString() + " " + dateObj.toLocaleTimeString();
                  let deadlineObj = new Date(e.timestamp + 1000 * 60 * 60 * 24 * 30);
                  let deadline = deadlineObj.toLocaleDateString() + " " + deadlineObj.toLocaleTimeString();
                  return {
                    id: generateRandomKey(),
                    dialogOpener:
                      <IconButton onClick={() => {self.setState({open: true, selectedMessage: e.instanceData.message})}}>
                        <MailIcon />
                      </IconButton>,    
                    date: date,
                    deadline: deadline,
                    type: e.instanceData.type,
                    instanceData: e.instanceData.data
                  }
                })
            }
          />
          <Dialog
            title="Message content"
            className="message-dialog"
            open={this.state.open}
            onRequestClose={() => { this.setState({ open: false }) }}
            autoScrollBodyContent={true}
            contentStyle={{ width: (window.innerWidth > 992) ? "35%" : "85%", maxWidth: "none" }}
            actions={[
              <FlatButton
                label="Close"
                primary={true}
                onClick={() => { this.setState({ open: false }) }}
              />
            ]}
          >
            {this.state.selectedMessage}
          </Dialog>
        </div>
      </div>
    );
  }
}

export default Requests;