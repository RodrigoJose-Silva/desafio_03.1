# Sistema de Gestão de Login - Aplicação Web Responsiva

Uma aplicação web completa para gestão de login, desenvolvida para estudos de teste de software. A aplicação inclui interface responsiva, API RESTful e banco de dados MongoDB.

## 🚀 Funcionalidades

### Autenticação
- ✅ **Login com validação** - Sistema de autenticação seguro
- ✅ **Bloqueio após 3 tentativas** - Proteção contra ataques de força bruta
- ✅ **Validação de usuário não cadastrado** - Tratamento de usuários inexistentes
- ✅ **Lembrete de senha** - Recuperação de credenciais

### Cadastro
- ✅ **Registro de novos usuários** - Formulário completo com validações
- ✅ **Validação de dados** - Regras específicas para usuário, senha e email
- ✅ **Verificação de usuário único** - Prevenção de duplicatas

### Interface Web
- ✅ **Design responsivo** - Funciona em desktop, tablet e mobile
- ✅ **Tailwind CSS** - Framework moderno para estilização
- ✅ **Toast notifications** - Feedback visual para o usuário
- ✅ **Validação em tempo real** - Feedback imediato nos formulários
- ✅ **Acessibilidade** - Seguindo boas práticas de UX/UI

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **bcryptjs** - Criptografia de senhas

### Frontend
- **HTML5** - Estrutura semântica
- **Tailwind CSS** - Framework CSS utilitário
- **JavaScript ES6+** - Funcionalidades interativas
- **Toastify** - Notificações toast
- **Font Awesome** - Ícones

### DevOps
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers
- **Swagger** - Documentação da API

## 📁 Estrutura do Projeto

```
desafio_03.1/
├── app.js                          # Arquivo principal da aplicação
├── package.json                    # Dependências e scripts
├── Dockerfile                      # Configuração Docker
├── docker-compose.yml             # Orquestração de containers
├── tailwind.config.js             # Configuração Tailwind CSS
├── README.md                      # Documentação
├── controllers/                   # Controladores da API
│   └── authController.js
├── services/                      # Lógica de negócio
│   └── authService.js
├── repositories/                  # Acesso a dados
│   └── userRepository.js
├── models/                        # Modelos do MongoDB
│   └── User.js
├── routes/                        # Rotas da API
│   └── authRoutes.js
├── test/                         # Testes automatizados
│   └── login.test.js
├── public/                       # Arquivos estáticos
│   ├── index.html                # Página principal
│   ├── login.html                # Página de login
│   ├── register.html             # Página de cadastro
│   ├── forgot-password.html      # Página de recuperação
│   ├── css/
│   │   ├── input.css            # CSS de entrada Tailwind
│   │   └── output.css           # CSS compilado
│   └── js/
│       ├── main.js              # JavaScript principal
│       ├── login.js             # JS específico login
│       ├── register.js          # JS específico cadastro
│       └── forgot-password.js   # JS específico recuperação
└── fixtures/                     # Dados de teste
    └── postLogin.json
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- Docker e Docker Compose (opcional)
- MongoDB (se não usar Docker)

### Opção 1: Execução Local

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd desafio_03.1
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. **Compile o CSS**
   ```bash
   npm run build:css-prod
   ```

5. **Inicie o servidor**
   ```bash
   npm start
   # ou para desenvolvimento
   npm run dev
   ```

### Opção 2: Execução com Docker (Recomendado)

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd desafio_03.1
   ```

2. **Execute com Docker Compose**
   ```bash
   docker-compose up --build -d
   ```

3. **Acesse a aplicação**
   - Aplicação: http://localhost:3030
   - API Docs: http://localhost:3030/api-docs
   - MongoDB Express: http://localhost:8081

## 📱 Páginas da Aplicação

### Home (`/`)
- Apresentação da aplicação
- Cards com funcionalidades
- Links para login e cadastro

### Login (`/login`)
- Formulário de autenticação
- Validação em tempo real
- Dados de teste disponíveis
- Link para recuperação de senha

### Cadastro (`/register`)
- Formulário de registro completo
- Validações específicas
- Confirmação de senha
- Aceite de termos

### Recuperação (`/forgot-password`)
- Formulário de lembrete
- Validação de usuário
- Feedback de sucesso/erro

## 🔧 API Endpoints

### Autenticação
- `POST /auth/login` - Realizar login
- `POST /auth/register` - Cadastrar usuário
- `POST /auth/forgot-password` - Recuperar senha

### Documentação
- `GET /api-docs` - Swagger UI

## 🧪 Testes

### Executar Testes
```bash
# Testes básicos
npm test

# Testes com relatório HTML
npm run test-html
```

### Dados de Teste
- **Usuário:** testuser
- **Senha:** test123

## 📋 Regras de Validação

### Usuário
- Entre 3 e 8 caracteres
- Deve ser único no sistema

### Senha
- Entre 5 e 8 caracteres
- Deve conter letras e números

### Email
- Formato válido de email
- Deve conter @ e domínio

## 🔒 Segurança

- **Bloqueio após 3 tentativas** - Proteção contra força bruta
- **Criptografia de senhas** - bcryptjs para hash seguro
- **Validação de entrada** - Sanitização de dados
- **CORS configurado** - Controle de acesso

## 🎨 Design System

### Cores
- **Primária:** Azul (#3b82f6)
- **Sucesso:** Verde (#10b981)
- **Erro:** Vermelho (#ef4444)
- **Aviso:** Amarelo (#f59e0b)

### Tipografia
- **Fonte:** Inter (Google Fonts)
- **Pesos:** 300, 400, 500, 600, 700

### Componentes
- **Botões:** Estados hover, focus, loading
- **Inputs:** Validação visual, focus states
- **Cards:** Sombras, hover effects
- **Toasts:** Notificações temporárias

## 📊 Monitoramento

### Logs
- Console logs para debug
- Tratamento de erros
- Validação de dados

### Métricas
- Tempo de resposta da API
- Taxa de sucesso/erro
- Uso de recursos

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Mentoria 2.0** - Aplicação para estudos de teste de software

## 📞 Suporte

Para dúvidas ou suporte:
- Abra uma issue no GitHub
- Entre em contato via email
- Consulte a documentação da API

---

**Desenvolvido com ❤️ para estudos de teste de software**
