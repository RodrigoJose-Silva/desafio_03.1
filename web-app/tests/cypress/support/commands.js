// ***********************************************
// Arquivo de comandos customizados do Cypress
// Cada comando abaixo encapsula fluxos comuns usados nos testes E2E,
// promovendo reutilização e legibilidade.
// ***********************************************

import { faker } from "@faker-js/faker";
import CadastroPage from "../page_objects/cadastro.page";

/**
 * Aguarda exibição de toast e valida sua mensagem e tipo (cor).
 * @param {string} expectedMessage - Mensagem esperada no toast
 * @param {('success'|'error')} [type='success'] - Tipo do toast para validar a cor
 */
Cypress.Commands.add("waitForToast", (expectedMessage, type = "success") => {
  cy.get(".toast").should("be.visible").and("contain", expectedMessage);

  if (type === "success") {
    cy.get(".toast").should("have.class", "green");
  } else if (type === "error") {
    cy.get(".toast").should("have.class", "red");
  }
});

/**
 * Limpa os campos padrão do formulário de cadastro.
 */
Cypress.Commands.add("clearForm", () => {
  cy.get("#username").clear();
  cy.get("#password").clear();
  cy.get("#email").clear();
});

/**
 * Gera dados básicos de teste (username, password, email) respeitando limites.
 * @returns {{username: string, password: string, email: string}}
 */
Cypress.Commands.add("generateTestData", () => {
  const username = faker.internet.userName().substring(0, 8);
  const password = faker.internet.password({ min: 5, max: 8 });
  const email = `${username}@test.com`;

  return { username, password, email };
});

/**
 * Gera uma senha aleatória contendo pelo menos um número.
 * @param {number} [min=5] - Tamanho mínimo da senha
 * @param {number} [max=8] - Tamanho máximo da senha
 * @returns {Cypress.Chainable<string>} Senha gerada
 */
Cypress.Commands.add("generatePasswordWithNumber", (min = 5, max = 8) => {
  return new Cypress.Promise((resolve) => {
    const length = faker.number.int({ min, max });
    const requiredNumber = faker.number.int({ min: 0, max: 9 }).toString();
    const rest = faker.string.alphanumeric({ length: length - 1 });
    const password = faker.helpers
      .shuffle((requiredNumber + rest).split(""))
      .join("");
    resolve(password);
  });
});

/**
 * Fluxo completo de cadastro via UI e retorno dos dados gerados.
 * Útil para pré-condições de testes que precisam de um usuário válido.
 * @returns {Cypress.Chainable<{username: string, password: string, email: string}>}
 */
Cypress.Commands.add("cadastrarNovoUsuario", () => {
  const cadastroPage = new CadastroPage();
  cadastroPage.visit();

  const username = faker.person.firstName().substring(0, 8);
  const length = faker.number.int({ min: 5, max: 8 });
  const password = faker.string.alphanumeric(length);
  const email = `${username}@test.com`;

  cadastroPage.registerUser(username, password, email);
  cadastroPage.shouldShowSuccessToast("Usuário cadastrado com sucesso!");
  cadastroPage.shouldRedirectToLogin();

  return cy.wrap({ username, password, email });
});

/**
 * Acessa a tela de lembrete de senha e solicita o lembrete para o usuário informado.
 * @param {string} username - Nome de usuário para solicitar lembrete
 */
Cypress.Commands.add("solicitarLembreteSenha", (username) => {
  cy.visit("/forgot-password");
  cy.get("#username").type(username, { force: true });
  cy.get("#btn-forgot-password").click();
});
