#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const minimist = require('minimist')

program
    .version(`winsion-cli ${require('../package').version}`)
    .usage('<command> [options]')

program
    .command('create <app-name>')
    .description('创建一个新项目')
    .option('-v, --vue', '创建一个Vue项目')
    .option('-e, --electron', '创建一个Electron项目')
    .action((name, cmd) => {
        const options = cleanArgs(cmd)
        if (minimist(process.argv.slice(3))._.length > 1) {
            console.log(chalk.yellow('\n Info: 你提供了多个参数，仅把第一个参数作为项目名，忽略其他参数'))
        }
        if (Object.keys(options).length > 1) {
            console.log(chalk.red('\n Error: 你仅能提供一个构建模板选项'))
            process.exit(1)
        }
        require('../lib/create')(name, options)
    })

program
    .arguments('<command>')
    .action((cmd) => {
        program.outputHelp()
        console.log(chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    })

// 用来处理 未知的otions 错误
program.Command.prototype.unknownOption = function(optionName) {
    // 这个this很关键
    this.outputHelp()
    console.log(`${chalk.red('Unknown option')} ${chalk.yellow(optionName)}.`)
    console.log()
    process.exit(1)
}

program.on('--help', () => {
    console.log()
    console.log(`Run ${chalk.cyan(`vue <command> --help`)} for detailed usage of given command.`)
    console.log()
})

program.commands.forEach(c => c.on('--help', () => console.log()))

if (!process.argv.slice(2).length) {
    program.outputHelp()
}

program.parse(process.argv)

function camelize(str) {
    return str.replace(/-(\w)/g,(_, c) => c ? c.toUpperCase() : '')
}

// 整理options参数
function cleanArgs(cmd) {
    const args = {}
    cmd.options.forEach(o => {
        const key = camelize(o.long.replace(/^--/, ''))
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            args[key] = cmd[key]
        }
    })
    return args
}


