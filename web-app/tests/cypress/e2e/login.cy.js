import { faker } from "@faker-js/faker";
import LoginPage from "../page_objects/login.page";
import CadastroPage from "../page_objects/cadastro.page";



describe("Cadastro e Cenários de Login", () => {
  let cadastroPage;
  let loginPage;
  let username;
  let password;
  let email;

  before(() => {
    cadastroPage = new CadastroPage();
    cadastroPage.visit();

    // Gerar dados válidos usando faker
    username = faker.internet.userName().substring(0, 8);
    password = faker.internet.password({ min: 5, max: 8 });
    email = `${username}@test.com`;

    // Preencher formulário e submeter
    cadastroPage.registerUser(username, password, email);

    // Validar redirecionamento para login
    cadastroPage.shouldRedirectToLogin();

    // Validar mensagem de sucesso
    cadastroPage.shouldShowSuccessToast("Usuário cadastrado com sucesso!");
  });

  describe("Login com usuário recém cadastrado", () => {
    beforeEach(() => {
      loginPage = new LoginPage();
      loginPage.goUrl();
    });

    it("Deve fazer login com sucesso usando o usuário cadastrado", () => {
      loginPage.fieldUsername(username);
      loginPage.fieldPassword(password);
      loginPage.submitLogin();
      loginPage.toastMesssageSuccessLogin("Login realizado com sucesso!");
      cy.url().should("include", "/login");
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
