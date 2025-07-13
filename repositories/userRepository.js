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

exports.findByUsername = (username) => {
    return users.find((u) => u.username === username);
}; 