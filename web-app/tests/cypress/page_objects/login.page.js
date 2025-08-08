// Elementos da página
const elements = {
  usernameInput: "#username",
  passwordInput: "#password",
  inputType: 'input[name="username"]',
  inputTypePassword: 'input[name="password"]',
};

const text = {
  btnSubmitLogin: "Entrar",
};

class LoginPage {
  goUrl() {
    cy.visit("/");
  }

  fieldUsername(username) {
    cy.get(`${elements.usernameInput}`)
      .should("be.visible")
      .type(username, { force: true });
  }

  fieldPassword(password) {
    cy.get(`${elements.passwordInput}`)
      .should("be.visible")
      .type(password, { force: true }, { log: false });
  }

  submitLogin() {
    cy.contains("button", `${text.btnSubmitLogin}`).click();
  }

  toastMesssageErrorLogin(message) {
    cy.waitForToast(message, "error");
  }

  toastMesssageSuccessLogin(message) {
    cy.waitForToast(message, "success");
  }

  //Validação de erro nativo HTML5
  toastHtmlRequiredError(message) {
    cy.get(elements.inputType).then(($input) => {
      expect($input[0].validationMessage).to.eq(message);
    });
  }

  toastHtmlRequiredErrorPassword(message) {
    cy.get(elements.inputTypePassword).then(($input) => {
      expect($input[0].validationMessage).to.eq(message);
    });
  }
}

export default LoginPage;
