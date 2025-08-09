// ***********************************************
// Arquivo de comandos customizados do Cypress
// ***********************************************

import { faker } from "@faker-js/faker";
import CadastroPage from "../page_objects/cadastro.page";

// Aguarda e valida mensagens de toast
Cypress.Commands.add("waitForToast", (expectedMessage, type = "success") => {
  cy.get(".toast").should("be.visible").and("contain", expectedMessage);

  if (type === "success") {
    cy.get(".toast").should("have.class", "green");
  } else if (type === "error") {
    cy.get(".toast").should("have.class", "red");
  }
});

// Limpa campos do formulário padrão de cadastro
Cypress.Commands.add("clearForm", () => {
  cy.get("#username").clear();
  cy.get("#password").clear();
  cy.get("#email").clear();
});

// Gera dados de teste básicos
Cypress.Commands.add("generateTestData", () => {
  const username = faker.internet.userName().substring(0, 8);
  const password = faker.internet.password({ min: 5, max: 8 });
  const email = `${username}@test.com`;

  return { username, password, email };
});

// Gera senha contendo pelo menos um número
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

// Cadastra um novo usuário aleatório e retorna os dados gerados
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

// Solicita lembrete de senha para um usuário
Cypress.Commands.add("solicitarLembreteSenha", (username) => {
  cy.visit("/forgot-password");
  cy.get("#username").type(username, { force: true });
  cy.get("#btn-forgot-password").click();
});
