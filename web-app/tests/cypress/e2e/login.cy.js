import { faker } from "@faker-js/faker";
import LoginPage from "../page_objects/login.page";



describe("Cadastro e Cenários de Login", () => {
  let loginPage;

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

  describe("Cenários de Login", () => {
    beforeEach(() => {
      loginPage = new LoginPage();
      loginPage.goUrl();
    });

    it("Deve retornar mensagem :'usuário não cadastrado' quando credenciais inválidas", () => {
      const fakeUsername = faker.internet.userName().substring(0, 8);
      const fakePassword = faker.internet.password({ min: 5, max: 8 });
      loginPage.fieldUsername(fakeUsername);
      loginPage.fieldPassword(fakePassword);
      loginPage.submitLogin();
      loginPage.toastMesssageErrorLogin("Usuário não cadastrado.");
    });

    it("Deve retornar mensagem quando usuário e senha não preenchidos", () => {
      loginPage.submitLogin();
      loginPage.toastHtmlRequiredError("Preencha este campo.");
    });

    it("Deve retornar mensagem quando usuário preenche somente o campo senha", () => {
      const fakePassword = faker.internet.password({ min: 5, max: 8 });
      loginPage.fieldPassword(fakePassword);
      loginPage.submitLogin();
      loginPage.toastHtmlRequiredError("Preencha este campo.");
    });

    it("Deve retornar mensagem quando usuário preenche somente o campo usuário", () => {
      const fakeUsername = faker.internet.userName().substring(0, 8);
      loginPage.fieldUsername(fakeUsername);
      loginPage.submitLogin();
      loginPage.toastHtmlRequiredErrorPassword("Preencha este campo.");
    });
  });
});
