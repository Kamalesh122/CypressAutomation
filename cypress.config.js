const { defineConfig } = require("cypress");

const browserify = require("@cypress/browserify-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprendTransformerToOptions,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");

// async function setupNodeEvents(on, config) {
//   // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
//   require('cypress-mochawesome-reporter/plugin')(on);
//   await addCucumberPreprocessorPlugin(on, config);

//   on(
//     "file:preprocessor",
//     browserify(preprendTransformerToOptions(config, browserify.defaultOptions)),
//   );

//   // Make sure to return the config object as it might have been modified by the plugin.
//   return config;
// }


module.exports = defineConfig({
  projectId: 'q17qph',
  defaultCommandTimeout: 4000,
  reporter: 'cypress-mochawesome-reporter',
  projectId: "p6rn5d",
  env: {
    url: "https://rahulshettyacademy.com",
    userId: "KamaleshSakthi",
    password: "testing@123"
  },
  //To Retry failed Test cases
  // retries: {
  //   runMode: 1,
  // },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    specPattern: 'cypress/Integration/LinkedIn/*.js',
    //specPattern: 'cypress/Integration/examples/BDD/*.feature',
    video: true,
  }
});
