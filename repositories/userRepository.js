// repositories/userRepository.js
// Simula um banco de dados de usuários em memória

// Lista de usuários cadastrados (simulação)
const users = [
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

/**
 * Busca um usuário pelo nome de usuário (username).
 * @param {string} username - Nome do usuário a ser buscado.
 * @returns {object|undefined} Usuário encontrado ou undefined se não existir.
 */
exports.findByUsername = (username) => {
    return users.find((u) => u.username === username);
}; 