// controllers/authController.js
// Controller responsável pela lógica de autenticação e lembrete de senha

const authService = require('../services/authService');

/**
 * Realiza o login do usuário.
 * - Valida usuário e senha recebidos na requisição.
 * - Bloqueia o usuário após 3 tentativas inválidas.
 * - Retorna mensagens apropriadas para cada caso.
 */
exports.login = (req, res) => {
    const { username, password } = req.body;
    // Verifica se os campos obrigatórios foram enviados
    if (!username || !password) {
        return res.status(400).json({ mensagem: 'Usuário e senha são obrigatórios.' });
    }
    // Chama o serviço de autenticação
    return authService.login(username, password)
        .then(result => res.status(result.status).json(result.body))
        .catch(err => res.status(500).json({ mensagem: 'Erro interno do servidor.' }));
};

/**
 * Envia lembrete de senha para o usuário.
 * - Retorna lembrete se usuário existir.
 * - Retorna erro se usuário não cadastrado.
 */
exports.forgotPassword = (req, res) => {
    const { username } = req.body;
    // Verifica se o campo obrigatório foi enviado
    if (!username) {
        return res.status(400).json({ mensagem: 'Usuário é obrigatório.' });
    }
    // Chama o serviço de lembrete de senha
    return authService.forgotPassword(username)
        .then(result => res.status(result.status).json(result.body))
        .catch(err => res.status(500).json({ mensagem: 'Erro interno do servidor.' }));
};

/**
 * Cadastra um novo usuário.
 * - Valida dados obrigatórios.
 * - Chama o serviço de cadastro.
 */
exports.registerUser = (req, res) => {
    const { username, password, email } = req.body;
    return authService.registerUser(username, password, email)
        .then(result => res.status(result.status).json(result.body))
        .catch(err => res.status(500).json({ mensagem: 'Erro interno do servidor.' }));
}; 