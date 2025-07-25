# 🚀 API de Gestão de Login

## 👥 Integrantes do Desafio 3 - Grupo 5

| Nome         | E-mail                | GitHub                                               |
| ------------ | --------------------- | ---------------------------------------------------- |git pull
| Rodrigo José | digo.1903@hotmail.com | [Rodrigo José](https://github.com/RodrigoJose-Silva) |
| Lucas Tiago | ltsantiago88@egmailmail.com  | [Lucas Tiago](https://github.com/ltsantiago)  |        |
| Bruno Castro | bruno.reis.castro1@gmail.com     | [Bruno Reis Castro](https://github.com/bruno-reis-castro)          |

## 📚 Sobre o Projeto

Este projeto é uma API Rest para gestão de Login, desenvolvida para fins de estudo de testes de software na **MENTORIA 2.0** ministrada por Julio de Lima.

- Não utiliza banco de dados, apenas armazenamento em memória.
- Comunicação via JSON.
- Documentação interativa via Swagger.
- Estrutura em camadas (Controller, Service, Repository).

## 🏗️ Estrutura do Projeto

```
controllers/
  - authController.js      # Recebe requisições HTTP, valida dados e chama o service
services/
  - authService.js         # Lógica de negócio de autenticação e lembrete de senha
repositories/
  - userRepository.js      # Acesso e manipulação dos dados dos usuários (em memória)
routes/
  - authRoutes.js          # Rotas de autenticação
app.js                     # Ponto de entrada da aplicação
```

## 🔄 Fluxo de Autenticação

1. O controller recebe a requisição HTTP e valida os dados.
2. O controller chama o método apropriado do service.
3. O service executa a lógica de negócio e consulta o repository para acessar os dados.
4. O repository retorna os dados necessários ao service.
5. O service retorna o resultado ao controller, que responde ao cliente.

## 🛠️ Funcionalidades

- ✅ Validação de login de sucesso
- ❌ Validação de login inválido
- 🔒 Bloqueio após 3 tentativas inválidas
- 📨 Lembrete de senha
- 👤 Usuário não cadastrado
- 📊 Report de relátorio

## 📦 Instalação

```bash
npm install
```

## ▶️ Como rodar

```bash
npm run dev
```

## ▶️ Utilizando o run.sh para rodar as suites de testes(em andamento)

Na seu terminal após estar no projeto, dê permissão para rodar o .sh da seguinte forma:

-✅ **Digite**: chmod +x run.sh

Feito isso basta somente digitar: **./run.sh** e começar a utilizar


Acesse a API em: `http://localhost:3030/`

## 📖 Documentação Swagger

Acesse a documentação interativa em: [http://localhost:3030/api-docs](http://localhost:3030/api-docs)

## 📑 Rotas Disponíveis

- `POST /auth/login` - Realiza o login do usuário
- `POST /auth/forgot-password` - Envia lembrete de senha para o usuário

## 📝 Observações

- Projeto para fins de estudo, não utilizar em produção.
- Desenvolvido com boas práticas de Clean Code.
- Branch principal: `main`

---

<p align="center">
  <img src="https://img.shields.io/badge/mentoria-2.0-blue" alt="Mentoria 2.0" />
  <img src="https://img.shields.io/badge/express.js-API-green" alt="Express.js" />
  <img src="https://img.shields.io/badge/swagger-docs-yellow" alt="Swagger" />
</p>
