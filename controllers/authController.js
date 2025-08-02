// controllers/authController.js
// Controller responsável pela lógica de autenticação e lembrete de senha

const authService = require('../services/authService');

/**
 * Realiza o login do usuário.
 * - Valida usuário e senha recebidos na requisição.
 * - Bloqueia o usuário após 3 tentativas inválidas.
 * - Retorna mensagens apropriadas para cada caso.
 */
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Verifica se os campos obrigatórios foram enviados
        if (!username || !password) {
            return res.status(400).json({ mensagem: 'Usuário e senha são obrigatórios.' });
        }
        
        // Chama o serviço de autenticação
        const result = await authService.login(username, password);
        return res.status(result.status).json(result.body);
    } catch (error) {
        console.error('Erro no controller de login:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

/**
 * Envia lembrete de senha para o usuário.
 * - Retorna lembrete se usuário existir.
 * - Retorna erro se usuário não cadastrado.
 */
exports.forgotPassword = async (req, res) => {
    try {
        const { username } = req.body;
        
        // Verifica se o campo obrigatório foi enviado
        if (!username) {
            return res.status(400).json({ mensagem: 'Usuário é obrigatório.' });
        }
        
        // Chama o serviço de lembrete de senha
        const result = await authService.forgotPassword(username);
        return res.status(result.status).json(result.body);
    } catch (error) {
        console.error('Erro no controller de lembrete de senha:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

/**
 * Cadastra um novo usuário.
 * - Valida dados obrigatórios.
 * - Chama o serviço de cadastro.
 */
exports.registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        
        // Chama o serviço de cadastro
        const result = await authService.registerUser(username, password, email);
        return res.status(result.status).json(result.body);
    } catch (error) {
        console.error('Erro no controller de cadastro:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}; 