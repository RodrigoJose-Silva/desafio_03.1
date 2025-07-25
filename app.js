// app.js
// Arquivo principal da aplicação Express para gestão de Login

// Importa o framework Express para criação do servidor HTTP
const express = require('express');
// Importa o Swagger UI e o Swagger JSDoc para documentação automática da API
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Importação das rotas de autenticação
const authRoutes = require('./routes/authRoutes');

const app = express(); // Cria uma instância do Express
const PORT = process.env.PORT || 3030; // Define a porta do servidor

// Middleware para interpretar JSON nas requisições
app.use(express.json());

// Configuração do Swagger para documentação da API
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestão de Login',
            version: '1.0.0',
            description: 'API para estudo de testes de software - Mentoria 2.0',
        },
        servers: [
            {
                url: 'http://localhost:' + PORT,
            },
        ],
    },
    apis: ['./routes/*.js'], // Caminho dos arquivos de rotas para documentação
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
// Rota para acessar a documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas de autenticação (login, lembrete de senha, etc)
app.use('/auth', authRoutes);

// Rota raiz apenas para teste rápido da API
app.get('/', (req, res) => {
    res.json({ mensagem: 'Bem-vindo à API de Gestão de Login!' });
});

// Inicialização do servidor Express
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
}); 

