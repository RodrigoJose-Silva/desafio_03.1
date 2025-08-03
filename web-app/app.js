// app.js
// Arquivo principal da aplicação web para interação com a API de Gestão de Login

// Importa o framework Express para criação do servidor HTTP
const express = require('express');
// Importa o path para manipulação de caminhos de arquivos
const path = require('path');

// Importação das rotas da aplicação web
const authRoutes = require('./routes/authRoutes');

const app = express(); // Cria uma instância do Express
const PORT = process.env.PORT || 8080; // Define a porta do servidor web (diferente da API)

// Configuração do EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para interpretar JSON nas requisições
app.use(express.json());
// Middleware para interpretar dados de formulários
app.use(express.urlencoded({ extended: true }));
// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas de autenticação da aplicação web
app.use('/', authRoutes);

// Inicialização do servidor Express
app.listen(PORT, () => {
    console.log(`Servidor web rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});