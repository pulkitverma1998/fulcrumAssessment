import React from "react";
import "../style/CreateRepair.css"
import { validateForm } from "../ValidateRepairForm";

class EditRepair extends React.Component {
    state = { issue: this.props.editRepair.issue, materialCosts: this.props.editRepair.materialCosts, laborCosts: this.props.editRepair.laborCosts, issueError: "", materialCostsError: "", laborCostsError: "" };

    componentDidUpdate(nextProps) {
        if (nextProps !== this.props) {
            this.setState({ issue: this.props.editRepair.issue, materialCosts: this.props.editRepair.materialCosts, laborCosts: this.props.editRepair.laborCosts })
        }
    }

    onUpdateRepairClick = (event) => {
        event.preventDefault();
        const [isValid, issueError, materialCostsError, laborCostsError] = validateForm(this.state.issue, this.state.materialCosts, this.state.laborCosts);

        if (isValid) {
            let repairData = this.props.repairData;
            const editRepair = this.props.editRepair;
            const updatedRepair = { id: editRepair.id, issue: this.state.issue, materialCosts: this.state.materialCosts, laborCosts: this.state.laborCosts, allInclusiveCosts: this.state.materialCosts + this.state.laborCosts };
            repairData[editRepair.id] = updatedRepair;
            this.props.handleUpdateRepair(repairData);
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
                        <input type="text" value={this.state.issue} className="form-control" placeholder="Enter Issue" aria-label="Issue" onChange={this.handleIssueChange} />
                        <div className="error">{this.state.issueError}</div>
                    </div>
                    <div className="col-sm">
                        <input type="number" value={this.state.materialCosts} step="0.01" className="form-control" placeholder="Enter Material Costs ($)" aria-label="MaterialCosts" onChange={this.handleMaterialCostsChange} />
                        <div className="error">{this.state.materialCostsError}</div>
                    </div>
                    <div className="col-sm">
                        <input type="number" value={this.state.laborCosts} step="0.01" className="form-control" placeholder="Enter Labor Costs ($)" aria-label="LaborCosts" onChange={this.handleLaborCostsChange} />
                        <div className="error">{this.state.laborCostsError}</div>
                    </div>
                </form>
                <button type="submit" className="btn btn-primary btn-lg btn-size" onClick={this.onUpdateRepairClick}>Update Repair</button>
            </div>
        );
    }
}

export default EditRepair;