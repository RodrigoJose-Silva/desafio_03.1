/**
 * Mapa de seletores dos elementos da página de Login.
 */
const elements = {
  usernameInput: "#username",
  passwordInput: "#password",
  inputType: 'input[name="username"]',
  inputTypePassword: 'input[name="password"]',
};

/**
 * Textos e rótulos utilizados na página.
 */
const text = {
  btnSubmitLogin: "Entrar",
};

class LoginPage {
  /**
   * Acessa a URL base da aplicação (tela de login).
   */
  goUrl() {
    cy.visit("/");
  }

  /**
   * Preenche o campo de nome de usuário.
   * @param {string} username - Nome de usuário a ser digitado
   */
  fieldUsername(username) {
    cy.get(`${elements.usernameInput}`)
      .should("be.visible")
      .type(username, { force: true });
  }

  /**
   * Preenche o campo de senha.
   * @param {string} password - Senha a ser digitada
   */
  fieldPassword(password) {
    cy.get(`${elements.passwordInput}`)
      .should("be.visible")
      .type(password, { force: true }, { log: false });
  }

  /**
   * Clica no botão de enviar/login.
   */
  submitLogin() {
    cy.contains("button", `${text.btnSubmitLogin}`).click();
  }

  /**
   * Valida exibição de toast de erro com a mensagem esperada.
   * @param {string} message - Mensagem esperada no toast
   */
  toastMesssageErrorLogin(message) {
    cy.waitForToast(message, "error");
  }

  /**
   * Valida exibição de toast de sucesso com a mensagem esperada.
   * @param {string} message - Mensagem esperada no toast
   */
  toastMesssageSuccessLogin(message) {
    cy.waitForToast(message, "success");
  }

  //Validação de erro nativo HTML5
  /**
   * Valida a mensagem nativa de required no campo username.
   * @param {string} message - Texto esperado na validação nativa do input
   */
  toastHtmlRequiredError(message) {
    cy.get(elements.inputType).then(($input) => {
      expect($input[0].validationMessage).to.eq(message);
    });
  }

  /**
   * Valida a mensagem nativa de required no campo password.
   * @param {string} message - Texto esperado na validação nativa do input
   */
  toastHtmlRequiredErrorPassword(message) {
    cy.get(elements.inputTypePassword).then(($input) => {
      expect($input[0].validationMessage).to.eq(message);
    });
  }
}

export default LoginPage;
