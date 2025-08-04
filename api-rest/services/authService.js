// services/authService.js
// Serviço responsável pela lógica de autenticação e lembrete de senha

const userRepository = require('../repositories/userRepository');

// Objeto para armazenar tentativas de login por usuário
const loginAttempts = {};

/**
 * Realiza o login do usuário.
 * - Verifica se o usuário existe.
 * - Controla tentativas de login e bloqueia após 3 erros.
 * - Reseta tentativas em caso de sucesso.
 * @param {string} username - Nome do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise<object>} Resultado do login (status e mensagem)
 */
exports.login = async (username, password) => {
    const user = userRepository.findByUsername(username);
    if (!user) {
        return { status: 404, body: { mensagem: 'Usuário não cadastrado.' } };
    }
    // Inicializa controle de tentativas se necessário
    if (!loginAttempts[username]) {
        loginAttempts[username] = { count: 0, blocked: false };
    }
    // Verifica se o usuário está bloqueado
    if (loginAttempts[username].blocked) {
        return { status: 403, body: { mensagem: 'Usuário bloqueado por excesso de tentativas.' } };
    }
    // Verifica se a senha está correta
    if (user.password === password) {
        loginAttempts[username] = { count: 0, blocked: false }; // Reseta tentativas
        return { status: 200, body: { mensagem: 'Login realizado com sucesso!' } };
    } else {
        loginAttempts[username].count += 1;
        // Bloqueia após 3 tentativas inválidas
        if (loginAttempts[username].count >= 3) {
            loginAttempts[username].blocked = true;
            return { status: 403, body: { mensagem: 'Usuário bloqueado por excesso de tentativas.' } };
        }
        return { status: 401, body: { mensagem: 'Credenciais inválidas.' } };
    }
};

/**
 * Envia lembrete de senha para o usuário.
 * - Verifica se o usuário existe.
 * - Retorna lembrete cadastrado.
 * @param {string} username - Nome do usuário
 * @returns {Promise<object>} Resultado do lembrete (status e mensagem)
 */
exports.forgotPassword = async (username) => {
    const user = userRepository.findByUsername(username);
    if (!user) {
        return { status: 404, body: { mensagem: 'Usuário não cadastrado.' } };
    }
    return { status: 200, body: { lembrete: user.reminder } };
};

/**
 * Cadastra um novo usuário.
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @returns {Promise<object>} Resultado do cadastro (status e mensagem)
 */
exports.registerUser = async (username, password, email) => {
    if (!username || !password || !email) {
        return { status: 400, body: { mensagem: 'Todos os campos são obrigatórios.' } };
    }
    // Validação de username
    if (username.length < 3 || username.length > 8) {
        return { status: 400, body: { mensagem: 'O nome de usuário deve conter entre 3 e 8 caracteres.' } };
    }
    // Validação de senha
    if (password.length < 5 || password.length > 8) {
        return { status: 400, body: { mensagem: 'A senha deve conter entre 5 e 8 caracteres.' } };
    }
    // Senha deve conter letras e números
    if (!(/[a-zA-Z]/.test(password) && /[0-9]/.test(password))) {
        return { status: 400, body: { mensagem: 'A senha deve conter letras e números.' } };
    }
    // Validação de email
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
        return { status: 400, body: { mensagem: 'O email informado é inválido. Deve conter apenas um @, domínio, e não pode começar ou terminar com @ ou ponto.' } };
    }
    if (userRepository.findByUsername(username)) {
        return { status: 409, body: { mensagem: 'Usuário já cadastrado.' } };
    }
    const reminder = `Seu lembrete de senha foi encaminhado para o email cadastrado: *******@email.com`;
    const success = userRepository.addUser({ username, password, email, reminder });
    if (success) {
        return { status: 201, body: { mensagem: 'Usuário cadastrado com sucesso!' } };
    } else {
        return { status: 409, body: { mensagem: 'Usuário já cadastrado.' } };
    }
}; 