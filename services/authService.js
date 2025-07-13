const userRepository = require('../repositories/userRepository');

const loginAttempts = {};

exports.login = async (username, password) => {
    const user = userRepository.findByUsername(username);
    if (!user) {
        return { status: 404, body: { mensagem: 'Usuário não cadastrado.' } };
    }
    if (!loginAttempts[username]) {
        loginAttempts[username] = { count: 0, blocked: false };
    }
    if (loginAttempts[username].blocked) {
        return { status: 401, body: { mensagem: 'Usuário bloqueado por excesso de tentativas.' } };
    }
    if (user.password === password) {
        loginAttempts[username] = { count: 0, blocked: false };
        return { status: 200, body: { mensagem: 'Login realizado com sucesso!' } };
    } else {
        loginAttempts[username].count += 1;
        if (loginAttempts[username].count >= 3) {
            loginAttempts[username].blocked = true;
            return { status: 401, body: { mensagem: 'Usuário bloqueado por excesso de tentativas.' } };
        }
        return { status: 401, body: { mensagem: 'Credenciais inválidas.' } };
    }
};

exports.forgotPassword = async (username) => {
    const user = userRepository.findByUsername(username);
    if (!user) {
        return { status: 404, body: { mensagem: 'Usuário não cadastrado.' } };
    }
    return { status: 200, body: { lembrete: user.reminder } };
}; 