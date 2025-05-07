import react from "eslint-plugin-react"
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import autofixPlugin from "eslint-plugin-autofix"
import eslintReactHooks from "eslint-plugin-react-hooks"
import unusedImports from "eslint-plugin-unused-imports"
import tseslint from "typescript-eslint"
import _import from "eslint-plugin-import"
import sonarPlugin from "eslint-plugin-sonarjs"
import { fixupPluginRules } from "@eslint/compat"
import globals from "globals"
import tsParser from "@typescript-eslint/parser"
import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"
import reactCompiler from "eslint-plugin-react-compiler"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

/**@type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  ...compat.extends(
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ),
  {
    ignores: [
      ".husky/*",
      "dev-dist/*",
      "src/entities/Gant/*",
      "src/shared/lib/gantt-task-react/*",
    ],
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    plugins: {
      react,
      "react-compiler": reactCompiler,
      "react-hooks": fixupPluginRules(eslintReactHooks),
      "@typescript-eslint": typescriptEslintPlugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      "import": fixupPluginRules(_import),
      "autofix": autofixPlugin,
      "sonarjs": sonarPlugin,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: path.resolve(__dirname, "./tsconfig.json"),
      },
    },

    rules: {
      ...eslintReactHooks.configs.recommended.rules,

      /**
       * Please note that the compiler is still in Beta
       * and has many rough edges. While it has been used
       * in production at companies like Meta, rolling out
       * the compiler to production for your app will depend
       * on the health of your codebase and how well you’ve
       * followed the Rules of React.
       */
      "react-compiler/react-compiler": ["warn"],

      "@typescript-eslint/no-var-requires": ["off"],
      "@typescript-eslint/no-unused-vars": ["off"],
      "@typescript-eslint/no-explicit-any": ["off"],
      "@typescript-eslint/sort-type-constituents": ["error"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
        },
      ],
      "autofix/no-debugger": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prettier/prettier": ["error"],
      "simple-import-sort/imports": ["off"],
      "simple-import-sort/exports": ["off"],
      "unused-imports/no-unused-imports": ["warn"],
      "import/no-duplicates": ["error"],
      "react/jsx-no-useless-fragment": ["error"],
      "react/self-closing-comp": ["error"],
      "react/prop-types": ["off"],
      "react/react-in-jsx-scope": ["off"],
      // TODO переключить в error, в последствии нужно обратить на эти ошибки внимание
      "react-hooks/rules-of-hooks": ["warn"],
      "react-hooks/exhaustive-deps": ["warn"],

      "react/jsx-max-depth": [
        "error",
        {
          max: 7,
        },
      ],

      "react/jsx-boolean-value": "warn",

      "react/jsx-sort-props": [
        "error",
        {
          callbacksLast: true,
          shorthandFirst: true,
          multiline: "last",
          ignoreCase: true,
          noSortAlphabetically: false,
          reservedFirst: ["key", "ref"],
        },
      ],

      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../../../", "../../../../", "../../../../../"],
              message: "Importing from parent directories is not allowed.",
            },
            // TODO правило eslint пока не поддерживает регулярки, но планируют затащить в 10 версии
            // {
            //   group: ["(?:\.\./){3,}"],
            //   message:
            //     "Importing from directories above two levels is not allowed.",
            // },
          ],
        },
      ],
      // SonarJS Rules
      // Предупреждает, если два или более условия идентичны в одном контексте
      "sonarjs/no-identical-conditions": "warn",

      // Измеряет когнитивную сложность; предупреждает, если сложность превышает порог
      "sonarjs/cognitive-complexity": ["warn", 5],

      // Ограничивает количество случаев в операторах switch для улучшения читаемости
      "sonarjs/max-switch-cases": ["warn", 3],

      // Предупреждает, если конструкция if-elseif не имеет else
      "sonarjs/elseif-without-else": "warn",

      // Обнаруживает полностью дублированные ветки
      "sonarjs/no-all-duplicated-branches": "warn",

      // Предупреждает о if-условиях, которые можно упростить
      "sonarjs/no-collapsible-if": "warn",

      // Предотвращает проверки размеров коллекций, которые могут привести к логическим ошибкам
      "sonarjs/no-collection-size-mischeck": "warn",

      // Предупреждает, если одна и та же строка определяется несколько раз
      "sonarjs/no-duplicate-string": "warn",

      // Обнаруживает дублированные ветки в условных операторах
      "sonarjs/no-duplicated-branches": "warn",

      // Предупреждает, если переменная перезаписывается без видимой причины
      "sonarjs/no-element-overwrite": "warn",

      // Предупреждает о коллекциях, которые пусты, хотя этого не должно быть
      "sonarjs/no-empty-collection": "warn",

      // Обнаруживает функции, у которых больше аргументов, чем необходимо
      "sonarjs/no-extra-arguments": "warn",

      // Предупреждает о выражениях, которые не вносят вклад в логику или функциональность
      "sonarjs/no-gratuitous-expressions": "warn",

      // Предупреждает о идентичных выражениях, использованных несколько раз в одном контексте
      "sonarjs/no-identical-expressions": "warn",

      // Обнаруживает функции с идентичными телами, чтобы избежать дублирования кода
      "sonarjs/no-identical-functions": ["warn", 3],

      // Предупреждает, когда возвращаемое значение функции игнорируется
      "sonarjs/no-ignored-return": "warn",

      // Предупреждает о ненужных инверсиях булевых проверок
      "sonarjs/no-inverted-boolean-check": "warn",

      // Предотвращает вложенность операторов switch для лучшей ясности
      "sonarjs/no-nested-switch": "warn",

      // Предупреждает о вложенных шаблонных литералах для упрощения
      "sonarjs/no-nested-template-literals": "warn",

      // Обнаруживает циклы, которые выполняются только один раз
      "sonarjs/no-one-iteration-loop": "warn",

      // Предупреждает о избыточных булевых выражениях, которые можно упростить
      "sonarjs/no-redundant-boolean": "warn",

      // Предупреждает о ненужных операциях jump, таких как continue или break
      "sonarjs/no-redundant-jump": "warn",

      // Предупреждает, если условные операторы находятся на одной строке для улучшения читаемости
      "sonarjs/no-same-line-conditional": "warn",

      // Предотвращает использование небольших операторов switch для ясности
      "sonarjs/no-small-switch": "warn",

      // Предупреждает о коллекциях, которые определены, но никогда не используются
      "sonarjs/no-unused-collection": "warn",

      // Предупреждает о возвращаемых значениях, которые пусты или равны null
      "sonarjs/no-use-of-empty-return-value": "warn",

      // Предупреждает о блоках catch, которые не обрабатывают исключения осмысленно
      "sonarjs/no-useless-catch": "warn",

      // Предупреждает, если в выражениях используется несуществующий оператор
      "sonarjs/non-existent-operator": "warn",

      // Поощряет немедленное возвращение для упрощения кода
      "sonarjs/prefer-immediate-return": "warn",

      // Предпочитает использование литералов объектов для ясности и краткости
      "sonarjs/prefer-object-literal": "warn",

      // Рекомендует возвращать одно булевое значение вместо сложной логики
      "sonarjs/prefer-single-boolean-return": "warn",

      // Предпочитает циклы while перед циклами for в подходящих ситуациях для ясности
      "sonarjs/prefer-while": "warn",
    },
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],

    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Packages `react` related packages come first.
            ["^react", "^@?\\w"],
            // Internal packages.
            ["^(src)(/.*|$)"],
            // Side effect imports.
            ["^\\u0000"],
            // Parent imports. Put `..` last.
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Other relative imports. Put same-folder imports and `.` last.
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports.
            ["^.+\\.?(css)$"],
            // svg imports.
            ["^.+\\.?(svg)$"],
          ],
        },
      ],
    },
  },
)
