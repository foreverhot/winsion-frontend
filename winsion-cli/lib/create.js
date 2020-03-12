const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { validateProjectName } = require('./untils')

function create(name, options) {
    // require('./prompt')(name, options)
    // return
    const cwd = process.cwd() //node执行环境的当前路径
    const isCurrentFolder = name === '.'
    const projectName = isCurrentFolder ? path.relative('../', cwd) : name
    const projectRootPath = path.resolve(cwd, name)
    
    // 验证项目名是否正确
    const { validForNewPackages, warnings, errors } = validateProjectName(projectName)
    if (!validForNewPackages) {
        console.log()
        console.log(chalk.yellow(`项目名称不规范，不能使用 ${chalk.red(projectName)}`))
        console.log(chalk.yellow(`Error：${ warnings || errors }`))
        console.log()
        process.exit(1)
    }
    
    // 验证当前目录文件夹是否存在
    if (!isCurrentFolder && fs.existsSync(projectRootPath)) {
        console.log()
        console.log(chalk.red(`当前项目文件夹已存在，请删除后重试`))
        console.log()
        process.exit(1)
    }
    
    // 询问配置
    require('./prompt')(name, options)
}

module.exports = (...args) => {
    create(...args)
}