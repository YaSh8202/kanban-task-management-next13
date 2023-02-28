import { defineConfig } from "cypress";
const { GoogleSocialLogin } = require("cypress-social-logins").plugins;

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        GoogleSocialLogin: GoogleSocialLogin,
      });
    },
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
    specPattern: [
      "cypress/e2e/01_login.cy.js",
      "cypress/e2e/02_board.cy.js",
      "cypress/e2e/03_logout.cy.js",
    ],
    experimentalRunAllSpecs: true,
  },
});
