// routes/authRoutes.js
// Define as rotas relacionadas à autenticação de usuários

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas ou usuário bloqueado
 *       404:
 *         description: Usuário não cadastrado
 */
// Rota para login
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Envia lembrete de senha para o usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Lembrete de senha enviado
 *       404:
 *         description: Usuário não cadastrado
 */
// Rota para lembrete de senha
router.post('/forgot-password', authController.forgotPassword);

module.exports = router; 