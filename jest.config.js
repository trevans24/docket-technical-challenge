module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "**/src/**/*.js",
    "!src/index.js",
    "!src/reportWebVitals.js",
    "!src/setupTests.js",
  ],
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
}
