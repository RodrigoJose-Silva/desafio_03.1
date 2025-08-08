import { faker } from '@faker-js/faker'
import LoginPage from "../page_objects/login.page";



describe("Login", () => {

  let loginPage;
  loginPage = new LoginPage();
  

  beforeEach(() => {
    //Ações a serem executadas antes de cada teste
    loginPage.goUrl();
  });
  
  it("Deve realizar login com sucesso!!", () => {
  
    loginPage.fieldUsername(username);
    loginPage.fieldPassword(password)
    loginPage.submitLogin();
  });

  it("Deve retornar mensagem :'usuário não cadastrado' quando credenciais inválidas ", () => {
    const username = faker.internet.userName().substring(0, 8) // Máximo 8 caracteres
    const password = faker.internet.password({ min: 5, max: 8 })
    loginPage.fieldUsername(username);
    loginPage.fieldPassword(password)
    loginPage.submitLogin();
    loginPage.toastMesssageErrorLogin('Usuário não cadastrado.')
  });

  it("Deve retornar mensagem quando usuário e senha não preenchidos", () => {
    loginPage.submitLogin();
    loginPage.toastHtmlRequiredError("Preencha este campo.");
  });

  it("Deve retornar mensagem quando usuário preenche somente o campo senha", () => {
    const password = faker.internet.password({ min: 5, max: 8 })
    loginPage.fieldPassword(password)
    loginPage.submitLogin();
    loginPage.toastHtmlRequiredError("Preencha este campo.");
  });

  it("Deve retornar mensagem quando usuário preenche somente o campo usuário", () => {
    const username = faker.internet.userName().substring(0, 8) // Máximo 8 caracteres
    loginPage.fieldUsername(username);
    loginPage.submitLogin();
    loginPage.toastHtmlRequiredErrorPassword("Preencha este campo.");
  });

});
