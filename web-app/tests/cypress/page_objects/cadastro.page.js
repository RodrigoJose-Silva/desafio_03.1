/**
 * Page Object do fluxo de Cadastro.
 * Centraliza seletores e ações da tela de `register` para
 * promover reutilização e legibilidade nos testes E2E.
 */
class CadastroPage {
    // Elementos da página
    elements = {
        // Campos do formulário
        usernameInput: '#username',
        passwordInput: '#password',
        emailInput: '#email',

        // Botão de cadastro
        registerButton: '#btn-register',

        // Toast de mensagens
        toast: '.toast',
        successToast: '.toast.green',
        errorToast: '.toast.red',

        // Links de navegação
        loginLink: 'a[href="/"]',

        // Formulário
        registerForm: '#register-form'
    }

    /**
     * Navega para a página de cadastro.
     */
    visit() {
        cy.visit('/register')
    }

    /**
     * Preenche o campo de nome de usuário.
     * @param {string} username - Nome de usuário a ser digitado
     */
    fillUsername(username) {
        cy.get('#username').type(username, { force: true })
    }

    /**
     * Preenche o campo de senha.
     * @param {string} password - Senha a ser digitada
     */
    fillPassword(password) {
        cy.get('#password').type(password, { force: true })
    }

    /**
     * Preenche o campo de e-mail.
     * @param {string} email - E-mail a ser digitado
     */
    fillEmail(email) {
        cy.get('#email').type(email, { force: true })
    }

    /**
     * Preenche todos os campos do formulário de cadastro.
     * @param {string} username - Nome de usuário
     * @param {string} password - Senha
     * @param {string} email - E-mail
     */
    fillForm(username, password, email) {
        this.fillUsername(username)
        this.fillPassword(password)
        this.fillEmail(email)
    }

    /**
     * Limpa todos os campos do formulário de cadastro.
     */
    clearForm() {
        cy.get('#username').clear()
        cy.get('#password').clear()
        cy.get('#email').clear()
    }

    /**
     * Submete o formulário de cadastro.
     */
    submitForm() {
        cy.get('#btn-register').click()
    }

    /**
     * Executa o fluxo completo de cadastro.
     * @param {string} username - Nome de usuário
     * @param {string} password - Senha
     * @param {string} email - E-mail
     */
    registerUser(username, password, email) {
        this.fillForm(username, password, email)
        this.submitForm()
    }

    /**
     * Valida visualização de erro no campo de nome de usuário.
     */
    shouldShowUsernameError() {
        cy.get('#register-form > div:nth-child(1) > span').should('be.visible')
    }

    /**
     * Valida visualização de erro no campo de senha.
     */
    shouldShowPasswordError() {
        cy.get('#register-form > div:nth-child(2) > span').should('be.visible')
    }

    /**
     * Valida visualização de erro no campo de e-mail.
     */
    shouldShowEmailError() {
        cy.get('#register-form > div:nth-child(3) > span').should('be.visible')
    }

    /**
     * Aguarda e valida toast de sucesso com mensagem esperada.
     * @param {string} message - Mensagem esperada no toast
     */
    shouldShowSuccessToast(message) {
        cy.waitForToast(message, 'success')
    }

    /**
     * Aguarda e valida toast de erro com mensagem esperada.
     * @param {string} message - Mensagem esperada no toast
     */
    shouldShowErrorToast(message) {
        cy.waitForToast(message, 'error')
    }

    /**
     * Valida redirecionamento para a tela de login após cadastro.
     */
    shouldRedirectToLogin() {
        cy.get('h4').should('have.text', 'Login');
        // cy.url().should('include', '/')
    }

    /**
     * Valida mensagem de limite de caracteres do nome de usuário.
     */
    shouldShowUsernameLengthError() {
        cy.get('.toast').contains('O nome de usuário deve conter entre 3 e 8 caracteres.')
    }

    /**
     * Valida mensagem de limite de caracteres da senha.
     */
    shouldShowPasswordLengthError() {
        cy.get('.toast').should('have.text', 'A senha deve conter entre 5 e 8 caracteres.\nA senha deve conter letras e números.\n')
    }

    /**
     * Valida feedback visual de e-mail inválido no formulário.
     */
    shouldShowInvalidEmailError() {
        cy.get('#register-form > div:nth-child(3) > span').should('be.visible')
    }
}

export default CadastroPage