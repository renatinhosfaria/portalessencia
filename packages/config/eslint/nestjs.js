/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [require.resolve("./base.js")],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    // NestJS commonly uses decorators which may look unused
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    // Allow empty constructors for dependency injection
    "@typescript-eslint/no-empty-function": [
      "error",
      { allow: ["constructors"] },
    ],
  },
};
