module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 15,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: { "prettier/prettier": "error" },
};
