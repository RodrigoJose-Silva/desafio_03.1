// controllers/authController.js
// Controller responsável pela lógica de autenticação e lembrete de senha

const authService = require('../services/authService');

/**
 * Função para realizar o login do usuário
 * - Valida usuário e senha
 * - Bloqueia após 3 tentativas inválidas
 * - Retorna mensagens apropriadas para cada caso
 */
exports.login = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ mensagem: 'Usuário e senha são obrigatórios.' });
    }
    return authService.login(username, password)
        .then(result => res.status(result.status).json(result.body))
        .catch(err => res.status(500).json({ mensagem: 'Erro interno do servidor.' }));
};

/**
 * Função para lembrete de senha
 * - Retorna lembrete se usuário existir
 * - Retorna erro se usuário não cadastrado
 */
exports.forgotPassword = (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ mensagem: 'Usuário é obrigatório.' });
    }
    return authService.forgotPassword(username)
        .then(result => res.status(result.status).json(result.body))
        .catch(err => res.status(500).json({ mensagem: 'Erro interno do servidor.' }));
}; 