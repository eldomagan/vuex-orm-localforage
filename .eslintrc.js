module.exports = {
  extends: ["airbnb-base"],
  plugins: ['jest'],
  parserOptions: {
    parser: "babel-eslint",
  },
  env: {
    "jest/globals": true,
  },
  rules: {
    "no-param-reassign": [2, { "props": false }],
    "no-underscore-dangle": 0
  }
}
