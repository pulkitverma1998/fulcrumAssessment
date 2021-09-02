import React from "react";
import '../style/EstimateTable.css';

class EstimateTable extends React.Component {

    calculateTotalCost = () => {
        let totalCost = 0;
        Object.keys(this.props.repairData).forEach((key) => {
            const estimate = this.props.repairData[key];
            totalCost += estimate.allInclusiveCosts;
        });

        return totalCost;
    }

    onEditClick = (key) => {
        let repair = this.props.repairData[key];
        repair = { id: key, ...repair }
        this.props.handleEditRepair(repair);
    }

    render() {
        const repairs = Object.keys(this.props.repairData).map((key) => {
            const estimate = this.props.repairData[key];
            return (
                <tr key={key}>
                    <th scope="row">{key}</th>
                    <td>{estimate.issue}</td>
                    <td>${estimate.materialCosts}</td>
                    <td>${estimate.laborCosts}</td>
                    <td>${estimate.allInclusiveCosts}</td>
                    <td><button className="btn btn-primary" onClick={() => this.onEditClick(key)}>Edit</button></td>
                </tr>
            );
        });

        return (
            <div className="div-size">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Repair Id</th>
                            <th scope="col">Issue</th>
                            <th scope="col">Material Costs</th>
                            <th scope="col">Labor Costs</th>
                            <th scope="col">All Inclusive Costs</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repairs.length === 0 && <td colSpan="6" className="table-active">No repairs yet!</td>}
                        {repairs}
                    </tbody>
                </table>
                {repairs.length !== 0 && <h5>Total Cost: ${this.calculateTotalCost()}</h5>}
            </div>);
    }
}

export default EstimateTable;