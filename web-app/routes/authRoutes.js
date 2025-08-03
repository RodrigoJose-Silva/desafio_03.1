// routes/authRoutes.js
// Define as rotas da aplicação web para interação com a API de autenticação

// Importa o framework Express para definição das rotas
const express = require('express');
// Cria um router do Express para organizar as rotas
const router = express.Router();
// Importa o controlador de autenticação da aplicação web
const authController = require('../controllers/authController');

/**
 * Rota para a página inicial (formulário de login)
 * Método: GET
 * URL: /
 */
router.get('/', authController.getLoginPage);

/**
 * Rota para processar o login
 * Método: POST
 * URL: /login
 * Corpo: { username, password }
 */
router.post('/login', authController.processLogin);

/**
 * Rota para a página de lembrete de senha
 * Método: GET
 * URL: /forgot-password
 */
router.get('/forgot-password', authController.getForgotPasswordPage);

/**
 * Rota para processar o lembrete de senha
 * Método: POST
 * URL: /forgot-password
 * Corpo: { username }
 */
router.post('/forgot-password', authController.processForgotPassword);

/**
 * Rota para a página de cadastro de usuário
 * Método: GET
 * URL: /register
 */
router.get('/register', authController.getRegisterPage);

/**
 * Rota para processar o cadastro de usuário
 * Método: POST
 * URL: /register
 * Corpo: { username, password, email }
 */
router.post('/register', authController.processRegister);

/**
 * Rota para a página de boas-vindas após login bem-sucedido
 * Método: GET
 * URL: /welcome
 */
router.get('/welcome', authController.getWelcomePage);

module.exports = router;