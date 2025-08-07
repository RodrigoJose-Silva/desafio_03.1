// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to wait for toast messages
Cypress.Commands.add('waitForToast', (expectedMessage, type = 'success') => {
    cy.get('.toast').should('be.visible')
    cy.get('.toast').should('contain', expectedMessage)

    if (type === 'success') {
        cy.get('.toast').should('have.class', 'green')
    } else if (type === 'error') {
        cy.get('.toast').should('have.class', 'red')
    }
})

// Custom command to clear form fields
Cypress.Commands.add('clearForm', () => {
    cy.get('#username').clear()
    cy.get('#password').clear()
    cy.get('#email').clear()
})

// Custom command to generate test data
Cypress.Commands.add('generateTestData', () => {
    const { faker } = require('@faker-js/faker')

    const username = faker.internet.userName().substring(0, 8)
    const password = faker.internet.password({ min: 5, max: 8 })
    const email = `${username}@test.com`

    return { username, password, email }
})


//Custom command to generate password

import { faker } from '@faker-js/faker';
Cypress.Commands.add('generatePasswordWithNumber', (min = 5, max = 8) => {
    return new Cypress.Promise((resolve) => {
      const length = faker.number.int({ min, max });
      const requiredNumber = faker.number.int({ min: 0, max: 9 }).toString();
      const rest = faker.string.alphanumeric({ length: length - 1 });
      const password = faker.helpers.shuffle((requiredNumber + rest).split('')).join('');
      resolve(password);
    });
  });