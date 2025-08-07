const baseUrl = Cypress.config('baseUrl');
console.log(baseUrl); 

describe('Lembrete de senha', () => {

    beforeEach(() => {
        
    })

    it('Deve mostrar mensagem de usuário não cadastrado quando inserido um usuário não cadastrado', () => {

            cy.visit('http://localhost:8080/forgot-password')
            cy.get('#username').type('usuário-não-cadastrado', { force: true })
            cy.get('#btn-forgot-password').click()
            cy.get('.toast').should('be.visible').should('have.text','Usuário não cadastrado.')
          
    })

    it('Deve cadastrar usuário e quando inserido esse usuário deve mostrar mensagem que email foi enviado para email cadastrado', () => {
        cy.visit('http://localhost:8080/register')
        
        const { faker } = require('@faker-js/faker')
        const lengthName = faker.number.int({ min: 3, max: 8 });
        const username = faker.string.alphanumeric({ length: lengthName }).toLowerCase();
        const email = `${username}@test.com`
        
        cy.generatePasswordWithNumber().then((password) => {
            cy.log(password);
            cy.get('#password').type(password, { force: true })
          });
        
    
        cy.get('#username').type(username, { force: true })
        cy.get('#email').type(email, { force: true })
        cy.get('#btn-register').click()
        cy.get('.toast').should('be.visible').should('have.text','Usuário cadastrado com sucesso!')
        
        cy.visit('http://localhost:8080/forgot-password')
        cy.get('#username').type(username, { force: true })
        cy.get('#btn-forgot-password').click()
        cy.get('.toast').should('be.visible').should('have.text',`Seu lembrete de senha foi encaminhado para o email cadastrado: ${email}`)
    
    })   
    
})