module.exports = {
  plugins: [
    "@typescript-eslint",
    "eslint-comments",
    "jest",
    "no-relative-import-paths",
    "promise",
    "simple-import-sort",
    "unicorn",
  ],
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:eslint-comments/recommended",
    "plugin:jest/recommended",
    "plugin:promise/recommended",
    "plugin:unicorn/recommended",
    "next/core-web-vitals",
    "prettier",
  ],
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    // https://basarat.gitbook.io/typescript/main-1/defaultisbad
    "import/no-default-export": "error",
    // It's not accurate in the monorepo style
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    "no-prototype-builtins": "off",
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    "react/destructuring-assignment": "off",
    // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
    "react/jsx-filename-extension": "off",
    "react/jsx-props-no-spreading": [
      "warn",
      {
        exceptions: ["Component"],
      },
    ],
    "react/jsx-sort-props": [
      "warn",
      {
        callbacksLast: true,
        ignoreCase: true,
        locale: "auto",
        multiline: "last",
        reservedFirst: true,
        shorthandLast: true,
      },
    ],
    "react/require-default-props": "off",
    // Use function hoisting to improve code readability
    "no-use-before-define": ["error", { functions: false, classes: true, variables: true }],
    // Breaks conditional rendering
    "consistent-return": "off",
    // Allow most functions to rely on type inference. If the function is exported, then `@typescript-eslint/explicit-module-boundary-types` will ensure it's typed.
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
    // Common abbreviations are known and readable
    "unicorn/prevent-abbreviations": "off",
    "unicorn/no-array-for-each": "off",
    // Use PascalCase for components/pages and camelCase for rest
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
    "no-relative-import-paths/no-relative-import-paths": [
      "error",
      { allowSameFolder: true, rootDir: "src" },
    ],
  },
  ignorePatterns: [".eslintrc.js"],
  overrides: [
    // Allow CJS until ESM support improves
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "unicorn/prefer-module": "off",
      },
    },
    // NextJS requires default exports for pages
    {
      files: ["src/pages/*"],
      rules: {
        "import/no-default-export": "off",
        "import/prefer-default-export": "error",
      },
    },
  ],
};
