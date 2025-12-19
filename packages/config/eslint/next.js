/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    require.resolve("./base.js"),
    "next/core-web-vitals",
    "next/typescript",
  ],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    // Strict rule: apps/* MUST NOT import packages/db directly
    // Data access must go through the API proxy
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["@essencia/db", "@essencia/db/*"],
            message:
              "Direct database imports are not allowed in apps. Use the API proxy instead.",
          },
        ],
      },
    ],
    // Next.js specific rules
    "@next/next/no-html-link-for-pages": "off",
  },
};
