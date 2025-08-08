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

    // Métodos de navegação
    visit() {
        cy.visit('/register')
    }

    // Métodos de preenchimento de campos
    fillUsername(username) {
        cy.get('#username').type(username, { force: true })
    }

    fillPassword(password) {
        cy.get('#password').type(password, { force: true })
    }

    fillEmail(email) {
        cy.get('#email').type(email, { force: true })
    }

    // Método para preencher todos os campos
    fillForm(username, password, email) {
        this.fillUsername(username)
        this.fillPassword(password)
        this.fillEmail(email)
    }

    // Método para limpar formulário
    clearForm() {
        cy.get('#username').clear()
        cy.get('#password').clear()
        cy.get('#email').clear()
    }

    // Método para submeter formulário
    submitForm() {
        cy.get('#btn-register').click()
    }

    // Método para cadastrar usuário completo
    registerUser(username, password, email) {
        this.fillForm(username, password, email)
        this.submitForm()
    }

    // Validações de mensagens de erro
    shouldShowUsernameError() {
        cy.get('#register-form > div:nth-child(1) > span').should('be.visible')
    }

    shouldShowPasswordError() {
        cy.get('#register-form > div:nth-child(2) > span').should('be.visible')
    }

    shouldShowEmailError() {
        cy.get('#register-form > div:nth-child(3) > span').should('be.visible')
    }

    // Validações de toast
    shouldShowSuccessToast(message) {
        cy.waitForToast(message, 'success')
    }

    shouldShowErrorToast(message) {
        cy.waitForToast(message, 'error')
    }

    // Validações de redirecionamento
    shouldRedirectToLogin() {
        cy.get('h4').should('have.text', 'Login'); 
        // cy.url().should('include', '/')
    }

    // Validações de limites de caracteres
    shouldShowUsernameLengthError() {
        cy.get('.toast').contains('O nome de usuário deve conter entre 3 e 8 caracteres.')
    }

    shouldShowPasswordLengthError() {
        cy.get('.toast').should('have.text', 'A senha deve conter entre 5 e 8 caracteres.\nA senha deve conter letras e números.\n')
    }

    // Validação de email inválido
    shouldShowInvalidEmailError() {
        cy.get('#register-form > div:nth-child(3) > span').should('be.visible')
    }
}

export default CadastroPage