// app.js
// Arquivo principal da aplicação Express para gestão de Login

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Importação das rotas de autenticação (a serem criadas)
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3030;

// Middleware para interpretar JSON nas requisições
app.use(express.json());

// Configuração do Swagger
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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas de autenticação
app.use('/auth', authRoutes);

// Rota raiz
app.get('/', (req, res) => {
    res.json({ mensagem: 'Bem-vindo à API de Gestão de Login!' });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
}); 