import { faker } from '@faker-js/faker'
import CadastroPage from '../page_objects/cadastro.page.js'

describe('Cadastro de Usuário', () => {
    let cadastroPage

    beforeEach(() => {
        cadastroPage = new CadastroPage()
        cadastroPage.visit()
    })

    describe('Cenários Positivos', () => {
        it('Deve cadastrar usuário e exibir a mensagem: Usuário cadastrado com sucesso!', () => {
            cy.generateTestData().then(({ username, password, email }) => {
                cadastroPage.registerUser(username, password, email)
                cadastroPage.shouldRedirectToLogin()
                cadastroPage.shouldShowSuccessToast('Usuário cadastrado com sucesso!')
            })
        })
    })

    describe('Cenários Negativos - Campos Vazios', () => {
        it('Deve exibir erro quando campo nome de usuário estiver vazio', () => {
            // Preencher apenas senha e email
            const password = faker.internet.password({ min: 5, max: 8 })
            const email = `${faker.internet.userName()}@test.com`

            cadastroPage.fillPassword(password)
            cadastroPage.fillEmail(email)
            cadastroPage.submitForm()

            // Validar erro no campo username
            cadastroPage.shouldShowUsernameError()
        })

        it('Deve exibir erro quando campo senha estiver vazio', () => {
            // Preencher apenas username e email
            const username = faker.internet.userName().substring(0, 8)
            const email = `${username}@test.com`

            cadastroPage.fillUsername(username)
            cadastroPage.fillEmail(email)
            cadastroPage.submitForm()

            // Validar erro no campo password
            cadastroPage.shouldShowPasswordError()
        })

        it('Deve exibir erro quando campo email estiver vazio', () => {
            // Preencher apenas username e password
            const username = faker.internet.userName().substring(0, 8)
            const password = faker.internet.password({ min: 5, max: 8 })

            cadastroPage.fillUsername(username)
            cadastroPage.fillPassword(password)
            cadastroPage.submitForm()

            // Validar erro no campo email
            cadastroPage.shouldShowEmailError()
        })
    })

    describe('Cenários Negativos - Limites de Caracteres', () => {
        it('Deve exibir erro quando nome de usuário tiver menos de 3 caracteres', () => {
            const shortUsername = 'ab' // 2 caracteres
            const password = faker.internet.password({ min: 5, max: 8 })
            const email = `${shortUsername}@test.com`

            cadastroPage.registerUser(shortUsername, password, email)

            // Validar erro de tamanho mínimo
            cadastroPage.shouldShowUsernameLengthError()
        })

        it('Deve exibir erro quando senha tiver menos de 5 caracteres', () => {
            const username = faker.internet.userName().substring(0, 8)
            const shortPassword = '1234' // 4 caracteres
            const email = `${username}@test.com`

            cadastroPage.registerUser(username, shortPassword, email)

            // Validar erro de tamanho mínimo da senha
            cadastroPage.shouldShowPasswordLengthError()
        })
    })

    describe('Cenários Negativos - Formato de Email', () => {
        it('Deve exibir erro quando email não tiver formato válido', () => {
            const username = faker.internet.userName().substring(0, 8)
            const password = faker.internet.password({ min: 5, max: 8 })
            const invalidEmail = 'emailinvalido'

            cadastroPage.registerUser(username, password, invalidEmail)

            // Validar erro de email inválido
            cadastroPage.shouldShowInvalidEmailError()
        })

        it('Deve exibir erro quando email não tiver @', () => {
            const username = faker.internet.userName().substring(0, 8)
            const password = faker.internet.password({ min: 5, max: 8 })
            const invalidEmail = 'emailtest.com'

            cadastroPage.registerUser(username, password, invalidEmail)

            // Validar erro de email inválido
            cadastroPage.shouldShowInvalidEmailError()
        })

        it('Deve exibir erro quando email não tiver domínio', () => {
            const username = faker.internet.userName().substring(0, 8)
            const password = faker.internet.password({ min: 5, max: 8 })
            const invalidEmail = 'email@'

            cadastroPage.registerUser(username, password, invalidEmail)

            // Validar erro de email inválido
            cadastroPage.shouldShowInvalidEmailError()
        })
    })

    describe('Cenários Negativos - Usuário Já Cadastrado', () => {
        it('Deve exibir erro quando tentar cadastrar usuário já existente', () => {
            // Primeiro cadastro
            const username = faker.internet.userName().substring(0, 8)
            const password = faker.internet.password({ min: 5, max: 8 })
            const email = `${username}@test.com`

            cadastroPage.registerUser(username, password, email)

            // Tentar cadastrar o mesmo usuário novamente
            cy.visit('/register')
            cadastroPage.registerUser(username, password, email)

            // Validar mensagem de erro
            cadastroPage.shouldShowErrorToast('Usuário já cadastrado.')
        })
    })
})