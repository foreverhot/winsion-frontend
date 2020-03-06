const chalk = require('chalk')
const fs = require('fs-extra')
let config = ''

module.exports = (projectRootPath, module) => {
    if (!config) {
        config = require('./config')(projectRootPath)
    }
    let filesNumber = config[module] ? config[module].length : 0
    
    for (let index = 0; index < filesNumber; index++) {
        let { sourcePath, targetPath } = config[module][index]
        try {
            fs.copySync(sourcePath, targetPath)
        } catch (error) {
            console.log(`FileError：${chalk.red(error)}`)
        }
    }
}