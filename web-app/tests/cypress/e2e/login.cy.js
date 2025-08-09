import { faker } from "@faker-js/faker";
import LoginPage from "../page_objects/login.page";



// Suite que cobre o fluxo de cadastro prévio e os cenários de login.
describe("Cadastro e Cenários de Login", () => {
  let loginPage;

  // Caso de uso: validar login imediatamente após um cadastro bem-sucedido.
  describe("Login com usuário recém cadastrado", () => {
    it("Deve fazer login com sucesso usando o usuário cadastrado", () => {
      cy.cadastrarNovoUsuario().then(({ username, password }) => {
        const loginPage = new LoginPage();
        // Já estamos na tela de login após o cadastro
        loginPage.fieldUsername(username);
        loginPage.fieldPassword(password);
        loginPage.submitLogin();
        loginPage.toastMesssageSuccessLogin("Login realizado com sucesso!");
        cy.url().should("include", "/login");
      });
    });
  });

  // Cenários genéricos de validação de login.
  describe("Cenários de Login", () => {
    beforeEach(() => {
      loginPage = new LoginPage();
      loginPage.goUrl();
    });

    // Cenário negativo: usuário e senha existem apenas localmente (não cadastrados).
    it("Deve retornar mensagem :'usuário não cadastrado' quando credenciais inválidas", () => {
      const fakeUsername = faker.internet.userName().substring(0, 8);
      const fakePassword = faker.internet.password({ min: 5, max: 8 });
      loginPage.fieldUsername(fakeUsername);
      loginPage.fieldPassword(fakePassword);
      loginPage.submitLogin();
      loginPage.toastMesssageErrorLogin("Usuário não cadastrado.");
    });

    // Validação nativa de required quando ambos os campos estão vazios.
    it("Deve retornar mensagem quando usuário e senha não preenchidos", () => {
      loginPage.submitLogin();
      loginPage.toastHtmlRequiredError("Preencha este campo.");
    });

    // Validação nativa de required quando apenas a senha é preenchida.
    it("Deve retornar mensagem quando usuário preenche somente o campo senha", () => {
      const fakePassword = faker.internet.password({ min: 5, max: 8 });
      loginPage.fieldPassword(fakePassword);
      loginPage.submitLogin();
      loginPage.toastHtmlRequiredError("Preencha este campo.");
    });

    // Validação nativa de required quando apenas o usuário é preenchido.
    it("Deve retornar mensagem quando usuário preenche somente o campo usuário", () => {
      const fakeUsername = faker.internet.userName().substring(0, 8);
      loginPage.fieldUsername(fakeUsername);
      loginPage.submitLogin();
      loginPage.toastHtmlRequiredErrorPassword("Preencha este campo.");
    });
  });
});
