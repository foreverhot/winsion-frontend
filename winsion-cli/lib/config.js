module.exports = (projectRootPath) => {
    const path = require('path')
    const vueFilesBase = '../templates/vue/'
    const electronFileBase = '../templates/electron'
    return {
        "vue": {
            "gitURL": "github:foreverhot/winsion-frontend#vue2-template",
            "babel": [
                {
                    "sourcePath": path.resolve(__dirname, `${vueFilesBase}babel`),
                    "targetPath": projectRootPath
                }
            ],
            "router": [
                {
                    "sourcePath": path.resolve(__dirname, `${vueFilesBase}/router/router`),
                    "targetPath": path.resolve(projectRootPath, './src')
                },
                {
                    "sourcePath": path.resolve(__dirname, `${vueFilesBase}/router/views`),
                    "targetPath": path.resolve(projectRootPath, './src')
                }
            ],
            "vuex": [
                {
                    "sourcePath": path.resolve(__dirname, `${vueFilesBase}/vuex`),
                    "targetPath": path.resolve(projectRootPath, './src') 
                }
            ],
            "eslint": [
                {
                    "sourcePath": path.resolve(__dirname, `${vueFilesBase}/eslint/eslintrc`),
                    "targetPath": projectRootPath 
                },
                {
                    "sourcePath": path.resolve(__dirname, `${vueFilesBase}/eslint/prettierrc`),
                    "targetPath": projectRootPath 
                }
            ],
            "jest": [
                {
                    "sourcePath": path.resolve(__dirname, `${vueFilesBase}/jest/config`),
                    "targetPath": projectRootPath 
                },
                {
                    "sourcePath": path.resolve(__dirname, `${vueFilesBase}/jest/tests`),
                    "targetPath": projectRootPath 
                }
            ]
        },
        "electron": {
            "gitURL": "github:foreverhot/winsion-frontend#electron-vue2-template",
            "router": [
                {
                    "sourcePath": path.resolve(__dirname, `${electronFileBase}/router`),
                    "targetPath": path.resolve(projectRootPath, './src/renderer')
                }
            ],
            "vuex": [
                {
                    "sourcePath": path.resolve(__dirname, `${electronFileBase}/vuex`),
                    "targetPath": path.resolve(projectRootPath, './src/renderer')
                }
            ],
            "eslint": [
                {
                    "sourcePath": path.resolve(__dirname, `${electronFileBase}/eslint/eslintrc`),
                    "targetPath": projectRootPath 
                },
                {
                    "sourcePath": path.resolve(__dirname, `${electronFileBase}/eslint/prettierrc`),
                    "targetPath": projectRootPath 
                }
            ]
        }
    }
}