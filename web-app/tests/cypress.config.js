// Configuração do Cypress para os testes E2E da aplicação web.
// O baseUrl aponta para a aplicação Express rodando localmente.
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // URL base da aplicação web (servidor Express)
    baseUrl: 'http://localhost:8080',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
