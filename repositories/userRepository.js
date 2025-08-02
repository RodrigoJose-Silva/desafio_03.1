// repositories/userRepository.js
// Repositório de usuários usando MongoDB

const User = require('../models/User');

/**
 * Busca um usuário pelo nome de usuário (username).
 * @param {string} username - Nome do usuário a ser buscado.
 * @returns {Promise<object|null>} Usuário encontrado ou null se não existir.
 */
exports.findByUsername = async (username) => {
    try {
        return await User.findOne({ username: username });
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        throw error;
    }
};

/**
 * Busca um usuário pelo email.
 * @param {string} email - Email do usuário a ser buscado.
 * @returns {Promise<object|null>} Usuário encontrado ou null se não existir.
 */
exports.findByEmail = async (email) => {
    try {
        return await User.findOne({ email: email.toLowerCase() });
    } catch (error) {
        console.error('Erro ao buscar usuário por email:', error);
        throw error;
    }
};

/**
 * Adiciona um novo usuário ao banco de dados.
 * @param {object} userData - Dados do usuário a ser adicionado.
 * @returns {Promise<object>} Usuário criado.
 */
exports.addUser = async (userData) => {
    try {
        const user = new User(userData);
        return await user.save();
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        throw error;
    }
};

/**
 * Atualiza as tentativas de login de um usuário.
 * @param {string} username - Nome do usuário.
 * @param {object} loginAttempts - Dados das tentativas de login.
 * @returns {Promise<object>} Usuário atualizado.
 */
exports.updateLoginAttempts = async (username, loginAttempts) => {
    try {
        return await User.findOneAndUpdate(
            { username: username },
            { loginAttempts: loginAttempts },
            { new: true }
        );
    } catch (error) {
        console.error('Erro ao atualizar tentativas de login:', error);
        throw error;
    }
};

/**
 * Reseta as tentativas de login de um usuário.
 * @param {string} username - Nome do usuário.
 * @returns {Promise<object>} Usuário atualizado.
 */
exports.resetLoginAttempts = async (username) => {
    try {
        return await User.findOneAndUpdate(
            { username: username },
            {
                'loginAttempts.count': 0,
                'loginAttempts.blocked': false,
                'loginAttempts.lastAttempt': Date.now()
            },
            { new: true }
        );
    } catch (error) {
        console.error('Erro ao resetar tentativas de login:', error);
        throw error;
    }
};

/**
 * Busca todos os usuários (para debug/administração).
 * @returns {Promise<Array>} Lista de todos os usuários.
 */
exports.findAll = async () => {
    try {
        return await User.find({}).select('-password'); // Exclui a senha por segurança
    } catch (error) {
        console.error('Erro ao buscar todos os usuários:', error);
        throw error;
    }
};

/**
 * Remove um usuário pelo username.
 * @param {string} username - Nome do usuário a ser removido.
 * @returns {Promise<boolean>} True se removido com sucesso.
 */
exports.deleteUser = async (username) => {
    try {
        const result = await User.findOneAndDelete({ username: username });
        return result !== null;
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        throw error;
    }
};

/**
 * Inicializa o banco com dados de exemplo (apenas para desenvolvimento).
 * @returns {Promise<void>}
 */
exports.initializeSampleData = async () => {
    try {
        // Verifica se já existem usuários
        const count = await User.countDocuments();
        if (count === 0) {
            const sampleUsers = [
                {
                    username: 'usuario1',
                    password: 'senha123',
                    email: 'usuario1@email.com',
                    reminder: 'Seu lembrete de senha foi encaminhado para o email cadastrado: *******@email.com',
                },
                {
                    username: 'usuario2',
                    password: 'senha456',
                    email: 'usuario2@email.com',
                    reminder: 'Seu lembrete de senha foi encaminhado para o email cadastrado: *******@email.com',
                },
            ];

            await User.insertMany(sampleUsers);
            console.log('Dados de exemplo inicializados com sucesso!');
        }
    } catch (error) {
        console.error('Erro ao inicializar dados de exemplo:', error);
    }
}; 