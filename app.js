// app.js
// Arquivo principal da aplicação Express para gestão de Login

// Importa o framework Express para criação do servidor HTTP
const express = require('express');
// Importa o Swagger UI e o Swagger JSDoc para documentação automática da API
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
// Importa mongoose para conexão com MongoDB
const mongoose = require('mongoose');
// Importa path para manipulação de caminhos
const path = require('path');
// Importa dotenv para variáveis de ambiente
require('dotenv').config();

// Importação das rotas de autenticação
const authRoutes = require('./routes/authRoutes');

// Importa o repositório para inicializar dados de exemplo (apenas se não estiver em teste)
let userRepository;
if (process.env.NODE_ENV !== 'test') {
    userRepository = require('./repositories/userRepository');
}

const app = express(); // Cria uma instância do Express
const PORT = process.env.PORT || 3030; // Define a porta do servidor

// Conecta ao MongoDB apenas se não estiver em modo de teste
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/login-app', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(async () => {
        console.log('Conectado ao MongoDB');
        
        // Inicializa dados de exemplo
        try {
            await userRepository.initializeSampleData();
        } catch (error) {
            console.error('Erro ao inicializar dados de exemplo:', error);
        }
    })
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));
}

// Middleware para interpretar JSON nas requisições
app.use(express.json());
// Middleware para servir arquivos estáticos
app.use(express.static('public'));

// Configuração do Swagger para documentação da API com tema customizado
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestão de Login - Aplicação Web Responsiva',
            version: '1.0.0',
            description: 'API para estudo de testes de software - Mentoria 2.0 - Interface web responsiva incluída',
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

// Configuração customizada do Swagger UI
const swaggerUiOptions = {
    customCss: `
        .swagger-ui .topbar { display: none }
        .swagger-ui .info .title { color: #1f2937; font-size: 2.5em; }
        .swagger-ui .info .description { color: #6b7280; }
        .swagger-ui .scheme-container { background: #f3f4f6; }
        .swagger-ui .opblock.opblock-post .opblock-summary-method { background: #10b981; }
        .swagger-ui .opblock.opblock-get .opblock-summary-method { background: #3b82f6; }
        .swagger-ui .opblock.opblock-put .opblock-summary-method { background: #f59e0b; }
        .swagger-ui .opblock.opblock-delete .opblock-summary-method { background: #ef4444; }
    `,
    customSiteTitle: "API de Gestão de Login - Documentação",
    customfavIcon: "/favicon.ico"
};

// Rota para acessar a documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOptions));

// Rotas de autenticação (login, lembrete de senha, etc)
app.use('/auth', authRoutes);

// Rotas para as páginas web
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/forgot-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'forgot-password.html'));
});

// Rota raiz apenas para teste rápido da API
app.get('/api', (req, res) => {
    res.json({ mensagem: 'Bem-vindo à API de Gestão de Login!' });
});

// Inicialização do servidor Express
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log(`Aplicação web disponível em http://localhost:${PORT}`);
        console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
    });
}

module.exports = app; 