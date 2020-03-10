/**
 * 数据类型
 * {
    projectName: 'name',
    framework: 'electron',
    modules: [ 'babel', 'router', 'vuex', 'sass', 'eslint', 'jest' ]      
    }
 */
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const ora = require('ora')
const ejs = require('ejs')

module.exports = ({ projectRootPath, answers } = args) => {
   const createFiles = require('./createFiles')
   const readmeURL = path.resolve(projectRootPath, './README.md')
   const packageURL = path.resolve(projectRootPath, './package.json')
   const rendererMainURL = path.resolve(projectRootPath, './src/renderer/main.js')
   const rendererAppURL = path.resolve(projectRootPath, './src/renderer/App.vue')

   const setFileLoad = ora(chalk.green('开始配置文件')).start()
   try {
      // 配置README.md
      const readmeCtx = fs.readFileSync(readmeURL).toString()
      let readmeNews = ejs.render(readmeCtx, answers)
      fs.writeFileSync(readmeURL, readmeNews, 'utf8')

      // 配置package.json
      const packageCtx = fs.readFileSync(packageURL).toString()
      let packageNews = ejs.render(packageCtx, answers)
      fs.writeFileSync(packageURL, packageNews, 'utf8')
      
      // 配置renderer/main.js
      const mianCtx = fs.readFileSync(rendererMainURL).toString()
      let mainNews = ejs.render(mianCtx, answers)
      fs.writeFileSync(rendererMainURL, mainNews, 'utf8')

      // 配置renderer/App.vue
      const appCtx = fs.readFileSync(rendererAppURL).toString()
      let appNews = ejs.render(appCtx, answers)
      fs.writeFileSync(rendererAppURL, appNews, 'utf8')

      // 创建模块文件
      answers.modules.map(moduleItem => {

         createFiles({ projectRootPath, moduleItem, framework: answers.framework, }) 
      })
      setFileLoad.succeed(chalk.green('配置文件完成！'))
      ipInstall()
   } catch (error) {
      setFileLoad.fail(chalk.red('配置文件失败'))
      console.log(chalk.red(error))
   }
   setFileLoad.stop()

   function ipInstall() {
      let font = fs.readFileSync(path.resolve(__dirname, './font.txt'))
      console.log()
      console.log(chalk.green(font))
      console.log()
      console.log(chalk.bgYellow(chalk.black('  欢迎使用winson-cli  ')))
      console.log()
      console.log(chalk.green(` cd ${answers.projectName}`))
      console.log()
      console.log(chalk.green(` npm install`))
      console.log()
      console.log(chalk.green(` npm run serve`))
      console.log()
   }
}
 