import React from "react";
import "../style/CreateEstimate.css";
import "../style/Error.css"

class CreateEstimate extends React.Component {
    state = { missionName: "", missionError: "" };

    validateMission = () => {
        let missionError = "";
        console.log(this.state.missionName)
        if (this.state.missionName.length === 0) {
            missionError = "Enter a mission name."
        }

        if (missionError) {
            this.setState({ missionError: missionError });
            return false;
        } else {
            return true;
        }
    }

    onCreateEstimateClick = (event) => {
        event.preventDefault();
        const isValid = this.validateMission();

        if (isValid) {
            this.props.handleCreateEstimate(this.state.missionName);
        }
    }

    handleMissionName = (event) => {
        this.setState({ missionName: event.target.value });
    }

    render() {
        return (
            <div>
                <h1 className>Cost of Repair Estimater</h1>
                <form className="mission">
                    <label className="form-label">Enter mission name</label>
                    <input type="text" className="input form-control" onChange={this.handleMissionName} />
                    <div className="error">{this.state.missionError}</div>
                </form>
                <button type="button" className="btn btn-primary btn-lg" onClick={this.onCreateEstimateClick}>Create Estimate</button>
            </div>);
    }
}

export default CreateEstimate;