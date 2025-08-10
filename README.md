# 🔐 Sistema de Gestão de Login

## ℹ️ Sobre o Projeto
Este projeto contém uma Aplicação Web para interação com a API Rest de Gestão de Login, desenvolvido com o propósito de estudar testes de software na **MENTORIA 2.0** ministrada por Julio de Lima.

---

## 👥 Participantes do Desafio
| Nome         | E-mail                      | GitHub                                               |
| ------------ | --------------------------- | ---------------------------------------------------- |
| Rodrigo José | digo.1903@hotmail.com       | [Rodrigo José](https://github.com/RodrigoJose-Silva) |
| Tiago Silva  | auditor.adhoc@gmail.com     | [Tiago Silva](https://github.com/AuditorAdhoc)       |
| Lucas Tiago  | ltsantiago88@egmailmail.com | [Lucas Tiago](https://github.com/ltsantiago)         |
| Bruno Castro | bruno.reis.castro1@gmail.com| [Bruno Reis Castro](https://github.com/bruno-reis-castro)  |

---

## 🗂️ Estrutura do Projeto
O projeto está dividido em duas aplicações principais:

### 🚀 API Rest (`./api-rest`)
- **Tecnologias:**  
  ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)  
  Node.js, Express.js, Swagger UI, Mocha, Chai, SuperTest, Mochawesome

- **Estrutura:**
```
api-rest/
  ├── controllers/     # Controladores da API
  ├── services/        # Lógica de negócio
  ├── repositories/    # Acesso aos dados
  ├── routes/          # Definição das rotas
  ├── test/            # Testes automatizados
  └── fixtures/        # Dados para testes
```

### 🌐 Aplicação Web (`./web-app`)
- **Tecnologias:**  
  ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)  
  Node.js, Express.js, EJS, Axios, MaterializeCSS, Cypress, Faker.js

- **Estrutura:**
```
web-app/
  ├── views/          # Templates EJS
  ├── public/         # Arquivos estáticos
  ├── controllers/    # Controladores da aplicação
  ├── routes/         # Rotas da aplicação
  └── tests/          # Testes E2E com Cypress
```

---

## 📋 Regras de Negócio

### 🔑 Login
- Usuário deve estar cadastrado
- Senha deve estar correta
- Após 3 tentativas incorretas, usuário é bloqueado

### 📝 Cadastro
- Nome de usuário: 3 a 8 caracteres
- Senha: 5 a 8 caracteres, deve conter letras e números
- Email: formato válido com um @
- Não permite usuários duplicados

### 🕑 Lembrete de Senha
- Disponível apenas para usuários cadastrados
- Envia lembrete para o email cadastrado

---

## ⚙️ Instalação e Execução

### 🚀 API Rest
1. Instalar dependências:
```bash
cd api-rest
npm install
```

2. Iniciar servidor:
```bash
npm start
```
A API estará disponível em http://localhost:3030

3. Executar testes:
```bash
npm test
```

### 🌐 Aplicação Web
1. Instalar dependências:
```bash
cd web-app
npm install
```

2. Iniciar servidor:
```bash
npm start
```
A aplicação estará disponível em http://localhost:8080

3. Executar testes E2E:
```bash
npx cypress open --config-file tests/cypress.config.js
```

---

## 🧪 Testes

### 🚀 API Rest
- **Testes Unitários e de Integração:**
  - Framework: Mocha + Chai
  - Relatórios: Mochawesome
  - Cobertura: Login, Cadastro, Lembrete de Senha

### 🌐 Aplicação Web
- **Testes End-to-End:**
  - Framework: Cypress
  - Page Objects para cada tela
  - Cenários: Cadastro, Login, Lembrete de Senha
  - Comandos customizados para ações comuns

---

## 📚 Documentação
- API: Swagger UI disponível em http://localhost:3030/api-docs
- Postman Collection: Disponível em `/api-rest/mentoria-api.postman_collection.json`