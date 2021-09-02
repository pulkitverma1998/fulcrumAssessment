export const validateForm = (issue, materialCosts, laborCosts) => {
    let issueError = "";
    let materialCostsError = "";
    let laborCostsError = "";

    if (issue.length === 0) {
        issueError = "Enter an issue."
    }

    if (materialCosts < 0.0) {
        materialCostsError = "Please enter a positive value."
    }

    if (laborCosts < 0.0) {
        laborCostsError = "Please enter a positive value."
    }

    if (issueError || materialCostsError || laborCostsError) {
        return [false, issueError, materialCostsError, laborCostsError];
    }

    return [true, issueError, materialCostsError, laborCostsError];
}