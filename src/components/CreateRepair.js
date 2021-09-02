import React from "react";
import "../style/CreateRepair.css"
import "../style/Error.css";
import { validateForm } from "../ValidateRepairForm";

class CreateRepair extends React.Component {
    state = { issue: "", materialCosts: 0.0, laborCosts: 0.0, issueError: "", materialCostsError: "", laborCostsError: "" };

    onAddRepairClick = (event) => {
        event.preventDefault();
        const [isValid, issueError, materialCostsError, laborCostsError] = validateForm(this.state.issue, this.state.materialCosts, this.state.laborCosts);

        if (isValid) {
            const repairEstimate = {};

            repairEstimate["issue"] = this.state.issue;
            repairEstimate["materialCosts"] = this.state.materialCosts;
            repairEstimate["laborCosts"] = this.state.laborCosts;
            repairEstimate["allInclusiveCosts"] = this.state.materialCosts + this.state.laborCosts;

            const repairId = this.props.repairId + 1;
            const repairData = this.props.repairData;
            repairData[`${repairId}`] = repairEstimate;
            this.props.handleCreateRepair(repairData, repairId);
            this.setState({ issueError: "", materialCostsError: "", laborCostsError: "" });
        } else {
            this.setState({ issueError: issueError, materialCostsError: materialCostsError, laborCostsError: laborCostsError });
        }
    }

    handleIssueChange = (event) => {
        this.setState({ issue: event.target.value });
    }

    handleMaterialCostsChange = (event) => {
        this.setState({ materialCosts: parseFloat(event.target.value) });
    }

    handleLaborCostsChange = (event) => {
        this.setState({ laborCosts: parseFloat(event.target.value) });
    }

    render() {
        return (
            <div>
                <form className="row g-3 repairInput" >
                    <div className="col-sm">
                        <input type="text" className="form-control" placeholder="Enter Issue" aria-label="Issue" onChange={this.handleIssueChange} />
                        <div className="error">{this.state.issueError}</div>
                    </div>
                    <div className="col-sm">
                        <input type="number" step="0.01" className="form-control" placeholder="Enter Material Costs ($)" aria-label="MaterialCosts" onChange={this.handleMaterialCostsChange} />
                        <div className="error">{this.state.materialCostsError}</div>
                    </div>
                    <div className="col-sm">
                        <input type="number" step="0.01" className="form-control" placeholder="Enter Labor Costs ($)" aria-label="LaborCosts" onChange={this.handleLaborCostsChange} />
                        <div className="error">{this.state.laborCostsError}</div>
                    </div>
                </form>
                <button type="submit" className="btn btn-primary btn-lg btn-size" onClick={this.onAddRepairClick}>Add Repair</button>
            </div>
        );
    }
}

export default CreateRepair;