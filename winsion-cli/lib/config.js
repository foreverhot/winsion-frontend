module.exports = (projectRootPath) => {
    const path = require('path')
    return {
        "babel": [
            {
                "sourcePath": path.resolve(__dirname, `../templates/babel`),
                "targetPath": projectRootPath
            }
        ],
        "router": [
            {
                "sourcePath": path.resolve(__dirname, `../templates/router/router`),
                "targetPath": path.resolve(projectRootPath, './src')
            },
            {
                "sourcePath": path.resolve(__dirname, `../templates/router/views`),
                "targetPath": path.resolve(projectRootPath, './src')
            }
        ],
        "vuex": [
            {
                "sourcePath": path.resolve(__dirname, `../templates/vuex`),
                "targetPath": path.resolve(projectRootPath, './src') 
            }
        ],
        "eslint": [
            {
                "sourcePath": path.resolve(__dirname, `../templates/eslint/eslintrc`),
                "targetPath": projectRootPath 
            },
            {
                "sourcePath": path.resolve(__dirname, `../templates/eslint/prettierrc`),
                "targetPath": projectRootPath 
            }
        ],
        "jest": [
            {
                "sourcePath": path.resolve(__dirname, `../templates/jest/config`),
                "targetPath": projectRootPath 
            },
            {
                "sourcePath": path.resolve(__dirname, `../templates/jest/tests`),
                "targetPath": projectRootPath 
            }
        ]
    }
}