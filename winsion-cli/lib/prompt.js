const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const chalk = require('chalk')
const ora = require('ora')
const download = require('download-git-repo')
const { validateProjectName } = require('./untils')
const config = require('./config')

module.exports  = (name, initOptions) => {
    const cwd = process.cwd()
    const isCurrentFolder = name === '.'
    let projectRootPath = path.resolve(cwd, name)
    let projectName = isCurrentFolder ? path.relative('../', cwd) : name
    // 测试
    require('./configTemplate-electron')({
        projectRootPath,
        answers:{
            projectName: 'name3',
            framework: 'electron',
            modules: ['router', 'vuex', 'sass', 'eslint']
        }
    })
    return
    
    let promptList = [
        {
            type: 'input',
            name: 'projectName',
            message: `请确认项目名：`,
            default: projectName,
            when: () => {
                return !isCurrentFolder
            },
            validate: function(inputName) {
                let done = this.async()
                let { validForNewPackages, warnings, errors } = validateProjectName(inputName)
                if (!validForNewPackages) {
                    done(`${chalk.yellow(`项目名称不规范，不能使用 ${chalk.red(inputName)}`)}\n${chalk.yellow(`Error：${ warnings || errors }`)}
                    `)
                    return; 
                } else {
                    projectName = inputName
                    projectRootPath = path.resolve(cwd, projectName)
                    done(null, true)
                }
            }
        },
        {
            type: 'list',
            name: 'framework',
            message: '请选择框架：',
            choices: [
                {
                    name: 'Vue',
                    value: 'vue'
                },
                {
                    name: 'Electron + Vue',
                    value: 'electron' 
                }
            ],
            when: () => {
                return !initOptions.vue && !initOptions.electron
            }
        },
        {   
            //  vue-template 选项
            type: 'checkbox',
            name: 'modules',
            message: '请选择需要集成的功能：',
            choices: [
                {
                    name: 'Babel',
                    value: 'babel',
                    checked: true
                },
                {
                    name: 'Router',
                    value: 'router',
                    checked: true
                },
                {
                    name: 'Vuex',
                    value: 'vuex'
                },
                {
                    name: 'Sass',
                    value: 'sass'
                },
                {
                    name: 'Eslint',
                    value: 'eslint',
                    checked: true
                },
                {
                    name: 'Jest Testing',
                    value: 'jest'
                }
            ],
            when: (select) => {
                return initOptions.vue || select.framework === 'vue'
            },
            validate: function(select) {
                let done = this.async()
                if (select.includes('jest') && !select.includes('babel')) {
                    done('选择Jest测试时，必须选择Babel')
                    return; 
                } else {
                    done(null, true)
                }
            }
        },
        {
            // electron 选项
            type: 'checkbox',
            name: 'modules',
            message: '请选择需要集成的功能：',
            choices: [
                {
                    name: 'Router',
                    value: 'router',
                    checked: true
                },
                {
                    name: 'Vuex',
                    value: 'vuex'
                },
                {
                    name: 'Sass',
                    value: 'sass'
                },
                {
                    name: 'Eslint',
                    value: 'eslint',
                    checked: true
                }
            ],
            when: (select) => {
                return initOptions.electron || select.framework === 'electron'
            }
        }
    ]
    
    inquirer
        .prompt(promptList)
        .then(answers => {
            answers.projectName = projectName
            answers.framework = answers.framework || Object.keys(initOptions)[0]
            downloadBasicsTemplate(answers)
        })
        .catch(error => {
            console.log(chalk.red(error))
        })

    // 下载基础模板
    function downloadBasicsTemplate(answers) {
        const downTemp = ora(chalk.green('开始下载模板')).start()
        const framework = answers.framework
        download(config(projectRootPath)[framework].gitURL, isCurrentFolder ? '.' : projectName, (error) => {
            if (error) {
                downTemp.fail(chalk.red('下载模板失败！'))
                console.log(chalk.red(error))
                downTemp.stop()
            } else {
                moveBasicsFiles(framework)
                downTemp.succeed(chalk.green('模板下载完成！'))
                downTemp.stop()
                require(`./configTemplate-${framework}`)({
                    projectRootPath,
                    answers
                })
            }
        })
    }

    // 移动模板文件
    function moveBasicsFiles(framework) {
        let templateList = {
            'vue': './vue2-template',
            'electron': './electron-vue2-template'
        }
        const srcPath = path.resolve(projectRootPath,templateList[framework] )
        try {
            fs.copySync(srcPath, projectRootPath)
            fs.removeSync(srcPath)
        } catch (error) {
            console.log(`FileError：chalk.red(${error})`)
        }
    }
}