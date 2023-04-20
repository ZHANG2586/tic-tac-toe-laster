/*
  这里使用的是 AlloyTeam ESLint 的 TypeScript 规则
*/
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": '@typescript-eslint/parser',
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "typescript"
    ],
    "rules": {
         // @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
        'eqeqeq': [
            'error',
            'always',
            {
                null: 'ignore'
            }
        ],
        // '@typescript-eslint/rule-name': 'error',
        // 类和接口的命名必须遵守帕斯卡命名法，比如 PersianCat
        'typescript/class-name-casing': 'error'
    },
    settings: {
        react: {
            version: "detect"
        }
    }
}