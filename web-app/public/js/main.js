// main.js
// Arquivo JavaScript principal para a aplicação web

/**
 * Inicializa os componentes do MaterializeCSS quando o DOM estiver carregado
 */
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o menu lateral para dispositivos móveis
    const sidenavElems = document.querySelectorAll('.sidenav');
    const sidenavInstances = M.Sidenav.init(sidenavElems);
    
    // Inicializa os tooltips
    const tooltipElems = document.querySelectorAll('.tooltipped');
    const tooltipInstances = M.Tooltip.init(tooltipElems);
    
    // Inicializa os selects
    const selectElems = document.querySelectorAll('select');
    const selectInstances = M.FormSelect.init(selectElems);
    
    // Inicializa os modals
    const modalElems = document.querySelectorAll('.modal');
    const modalInstances = M.Modal.init(modalElems);
    
    // Adiciona validação personalizada para o formulário de cadastro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', validateRegisterForm);
    }
    
    // Adiciona validação personalizada para o formulário de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', validateLoginForm);
    }
});

/**
 * Valida o formulário de cadastro antes de enviar
 * @param {Event} event - O evento de submit do formulário
 */
function validateRegisterForm(event) {
    // Obtém os valores dos campos
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    
    let isValid = true;
    let errorMessage = '';
    
    // Validação do nome de usuário
    if (username.length < 3 || username.length > 8) {
        errorMessage += 'O nome de usuário deve conter entre 3 e 8 caracteres.\n';
        isValid = false;
    }
    
    // Validação da senha
    if (password.length < 5 || password.length > 8) {
        errorMessage += 'A senha deve conter entre 5 e 8 caracteres.\n';
        isValid = false;
    }
    
    // Senha deve conter letras e números
    if (!(/[a-zA-Z]/.test(password) && /[0-9]/.test(password))) {
        errorMessage += 'A senha deve conter letras e números.\n';
        isValid = false;
    }
    
    // Validação de email
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
        errorMessage += 'O email informado é inválido. Deve conter apenas um @, domínio, e não pode começar ou terminar com @ ou ponto.';
        isValid = false;
    }
    
    // Se houver erros, exibe um toast com as mensagens
    if (!isValid) {
        event.preventDefault(); // Impede o envio do formulário
        M.toast({html: errorMessage, classes: 'red', displayLength: 6000});
    }
}

/**
 * Valida o formulário de login antes de enviar
 * @param {Event} event - O evento de submit do formulário
 */
function validateLoginForm(event) {
    // Obtém os valores dos campos
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    let isValid = true;
    let errorMessage = '';
    
    // Validação do nome de usuário e senha (campos obrigatórios)
    if (!username || !password) {
        errorMessage = 'Usuário e senha são obrigatórios.';
        isValid = false;
    }
    
    // Se houver erros, exibe um toast com as mensagens
    if (!isValid) {
        event.preventDefault(); // Impede o envio do formulário
        M.toast({html: errorMessage, classes: 'red', displayLength: 4000});
    }
}