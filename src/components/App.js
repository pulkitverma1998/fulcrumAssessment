import React from 'react';
import CreateEstimate from './CreateEstimate';
import CreateRepair from './CreateRepair';
import EstimateTable from "./EstimateTable";
import EditRepair from './EditRepair';
import '../style/App.css';

class App extends React.Component {
  state = { showCreateEstimate: true, missionName: "", repairData: {}, repairId: 0, editRepair: {}, repairBool: false };

  handleCreateEstimate = (missionName) => {
    this.setState({ showCreateEstimate: false, missionName: missionName });
  }

  handleCreateRepair = (repairData, repairId) => {
    this.setState({ repairData: repairData, repairId: repairId });
  }

  handleEditRepair = (editRepair) => {
    this.setState({ editRepair: editRepair, repairBool: true });
  }

  handleUpdateRepair = (updatedRepairData) => {
    this.setState({ repairData: updatedRepairData, repairBool: false });
  }

  onCreateNewEstimateClick = () => {
    this.setState({ showCreateEstimate: true, repairData: {}, repairId: 0 });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          {this.state.showCreateEstimate && <CreateEstimate handleCreateEstimate={this.handleCreateEstimate} />}
          {
            this.state.showCreateEstimate === false &&
            <>
              <h1>{this.state.missionName}</h1>
              {
                this.state.repairBool === false ?
                  <CreateRepair missionName={this.state.missionName} handleCreateRepair={this.handleCreateRepair} repairData={this.state.repairData} repairId={this.state.repairId} />
                  :
                  <EditRepair repairData={this.state.repairData} editRepair={this.state.editRepair} handleUpdateRepair={this.handleUpdateRepair} />
              }
              <EstimateTable repairData={this.state.repairData} handleEditRepair={this.handleEditRepair} />
              <button className="btn btn-primary btn-lg create-new-estimate-btn" onClick={this.onCreateNewEstimateClick}>Create New Estimate</button>
            </>
          }
        </div>
      </div>);
  }
}

export default App;
