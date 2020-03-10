const chalk = require('chalk')
const fs = require('fs-extra')
let config = ''

module.exports = ({ projectRootPath, framework, moduleItem} = args) => {
    if (!config) {
        config = require('./config')(projectRootPath)
    }
    let filesNumber = config[framework][moduleItem] ? config[framework][moduleItem].length : 0

    for (let index = 0; index < filesNumber; index++) {
        let { sourcePath, targetPath } = config[framework][moduleItem][index]
        try {
            fs.copySync(sourcePath, targetPath)
        } catch (error) {
            console.log(`FileError：${chalk.red(error)}`)
        }
    }
}