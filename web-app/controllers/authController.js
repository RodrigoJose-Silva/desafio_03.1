// controllers/authController.js
// Controlador responsável pela lógica da aplicação web para interação com a API

// Importa o módulo axios para fazer requisições HTTP para a API
const axios = require('axios');

// URL base da API
const API_URL = 'http://localhost:3030';

/**
 * Renderiza a página de login
 * @param {object} req - Objeto de requisição do Express
 * @param {object} res - Objeto de resposta do Express
 */
exports.getLoginPage = (req, res) => {
    // Renderiza a view de login, passando uma mensagem vazia (não há erro inicialmente)
    res.render('login', { message: '', type: '' });
};

/**
 * Processa a requisição de login, enviando os dados para a API
 * @param {object} req - Objeto de requisição do Express
 * @param {object} res - Objeto de resposta do Express
 */
exports.processLogin = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // Faz uma requisição POST para a API de login
        const response = await axios.post(`${API_URL}/auth/login`, {
            username,
            password
        });
        
        // Se o login for bem-sucedido, redireciona para a página de boas-vindas
        if (response.status === 200) {
            return res.render('welcome', { username });
        }
    } catch (error) {
        // Captura erros da API e exibe mensagens apropriadas
        let message = 'Erro ao conectar com o servidor.';
        let type = 'error';
        
        if (error.response) {
            const { status, data } = error.response;
            
            // Define mensagens específicas baseadas no status da resposta
            switch (status) {
                case 400:
                    message = data.mensagem || 'Dados inválidos.';
                    break;
                case 401:
                    message = 'Credenciais inválidas.';
                    break;
                case 403:
                    message = 'Usuário bloqueado por excesso de tentativas.';
                    break;
                case 404:
                    message = 'Usuário não cadastrado.';
                    break;
                default:
                    message = data.mensagem || 'Erro desconhecido.';
            }
        }
        
        // Renderiza a página de login novamente com a mensagem de erro
        return res.render('login', { message, type });
    }
};

/**
 * Renderiza a página de lembrete de senha
 * @param {object} req - Objeto de requisição do Express
 * @param {object} res - Objeto de resposta do Express
 */
exports.getForgotPasswordPage = (req, res) => {
    // Renderiza a view de lembrete de senha, passando uma mensagem vazia (não há erro inicialmente)
    res.render('forgot-password', { message: '', type: '' });
};

/**
 * Processa a requisição de lembrete de senha, enviando os dados para a API
 * @param {object} req - Objeto de requisição do Express
 * @param {object} res - Objeto de resposta do Express
 */
exports.processForgotPassword = async (req, res) => {
    const { username } = req.body;
    
    try {
        // Faz uma requisição POST para a API de lembrete de senha
        const response = await axios.post(`${API_URL}/auth/forgot-password`, {
            username
        });
        
        // Se a requisição for bem-sucedida, exibe o lembrete
        if (response.status === 200) {
            return res.render('forgot-password', {
                message: response.data.lembrete,
                type: 'success'
            });
        }
    } catch (error) {
        // Captura erros da API e exibe mensagens apropriadas
        let message = 'Erro ao conectar com o servidor.';
        let type = 'error';
        
        if (error.response) {
            const { status, data } = error.response;
            
            // Define mensagens específicas baseadas no status da resposta
            switch (status) {
                case 400:
                    message = data.mensagem || 'Dados inválidos.';
                    break;
                case 404:
                    message = 'Usuário não cadastrado.';
                    break;
                default:
                    message = data.mensagem || 'Erro desconhecido.';
            }
        }
        
        // Renderiza a página de lembrete de senha novamente com a mensagem de erro
        return res.render('forgot-password', { message, type });
    }
};

/**
 * Renderiza a página de cadastro de usuário
 * @param {object} req - Objeto de requisição do Express
 * @param {object} res - Objeto de resposta do Express
 */
exports.getRegisterPage = (req, res) => {
    // Renderiza a view de cadastro, passando uma mensagem vazia (não há erro inicialmente)
    res.render('register', { message: '', type: '' });
};

/**
 * Processa a requisição de cadastro de usuário, enviando os dados para a API
 * @param {object} req - Objeto de requisição do Express
 * @param {object} res - Objeto de resposta do Express
 */
exports.processRegister = async (req, res) => {
    const { username, password, email } = req.body;
    
    try {
        // Faz uma requisição POST para a API de cadastro
        const response = await axios.post(`${API_URL}/auth/register`, {
            username,
            password,
            email
        });
        
        // Se o cadastro for bem-sucedido, redireciona para a página de login com mensagem de sucesso
        if (response.status === 201) {
            return res.render('login', {
                message: 'Usuário cadastrado com sucesso!',
                type: 'success'
            });
        }
    } catch (error) {
        // Captura erros da API e exibe mensagens apropriadas
        let message = 'Erro ao conectar com o servidor.';
        let type = 'error';
        
        if (error.response) {
            const { status, data } = error.response;
            
            // Define mensagens específicas baseadas no status da resposta
            switch (status) {
                case 400:
                    message = data.mensagem || 'Dados inválidos.';
                    break;
                case 409:
                    message = 'Usuário já cadastrado.';
                    break;
                default:
                    message = data.mensagem || 'Erro desconhecido.';
            }
        }
        
        // Renderiza a página de cadastro novamente com a mensagem de erro
        return res.render('register', { message, type });
    }
};

/**
 * Renderiza a página de boas-vindas após login bem-sucedido
 * @param {object} req - Objeto de requisição do Express
 * @param {object} res - Objeto de resposta do Express
 */
exports.getWelcomePage = (req, res) => {
    // Verifica se o nome de usuário está disponível na query string
    const username = req.query.username || 'Usuário';
    
    // Renderiza a view de boas-vindas com o nome do usuário
    res.render('welcome', { username });
};