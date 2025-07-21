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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Login realizado com sucesso!"
 *       401:
 *         description: Credenciais inválidas (senha incorreta)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Credenciais inválidas."
 *       403:
 *         description: Usuário bloqueado por excesso de tentativas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Usuário bloqueado por excesso de tentativas."
 *       404:
 *         description: Usuário não cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Usuário não cadastrado."
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lembrete:
 *                   type: string
 *                   example: "Seu lembrete de senha foi encaminhado para o email cadastrado: *******@email.com"
 *       404:
 *         description: Usuário não cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Usuário não cadastrado."
 */
// Rota para lembrete de senha
router.post('/forgot-password', authController.forgotPassword);

module.exports = router; 