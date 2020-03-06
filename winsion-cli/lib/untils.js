const validateProjectName = require('validate-npm-package-name')

exports.validateProjectName = (projectName) => {
    const { validForNewPackages, warnings, errors } = validateProjectName(projectName)
    return { validForNewPackages, warnings, errors }
}