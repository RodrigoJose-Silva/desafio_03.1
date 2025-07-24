# 🚀 API de Gestão de Login

## 👥 Integrantes do Desafio 3 - Grupo 5

| Nome         | E-mail                      | GitHub                                               |
| ------------ | --------------------------- | ---------------------------------------------------- |
| Rodrigo José | digo.1903@hotmail.com       | [Rodrigo José](https://github.com/RodrigoJose-Silva) |
| Tiago Silva  | auditor.adhoc@gmail.com     | [Tiago Silva](https://github.com/AuditorAdhoc)       |
| Lucas Tiago  | ltsantiago88@egmailmail.com | [Lucas Tiago](https://github.com/ltsantiago)         |
| Bruno Castro | bruno.reis.castro1@gmail.com| [Bruno Reis Castro](https://github.com/bruno-reis-castro)  |

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

## ▶️ Como rodar o servidor

```bash
npm start
```

O servidor será iniciado na porta padrão `3030`. Acesse a API em: http://localhost:3030/

## ▶️ Como rodar os testes automatizados

### Para usuários **Linux/Mac**

Utilize o script `run.sh` para automatizar a execução do servidor e dos testes:

1. Dê permissão de execução ao script:
   ```bash
   chmod +x run.sh
   ```
2. Execute:
   ```bash
   ./run.sh
   ```

#### Execução automatizada dos testes (sem interação)

Para rodar todos os testes de forma não-interativa (ex: em CI/CD ou sem precisar responder perguntas), use:

```bash
./run.sh --ci
```

O script irá iniciar o servidor, aguardar até que esteja pronto e executar todos os testes automaticamente.

### Para usuários **Windows**

Utilize o script `run.bat` para automatizar a execução do servidor e dos testes:

1. No Prompt de Comando (cmd), execute:
   ```bat
   run.bat
   ```

O script irá:
- Encerrar processos antigos do Node rodando `app.js`.
- Iniciar o servidor em background.
- Aguardar o servidor responder em `http://localhost:3030/`.
- Executar os testes automatizados.
- Encerrar o servidor ao final dos testes.

> **Dica:** Você também pode rodar manualmente:
> 1. `npm start` (em um terminal)
> 2. `npm test` (em outro terminal)

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

## 📁 Pastas e Arquivos do Projeto

| Caminho/Arquivo                  | Descrição                                                                                |
| -------------------------------- | ---------------------------------------------------------------------------------------- |
| `app.js`                         | Ponto de entrada da aplicação. Configura o Express, rotas, middleware e Swagger.         |
| `controllers/authController.js`  | Controller responsável por receber requisições HTTP de autenticação e lembrete de senha. |
| `services/authService.js`        | Lógica de negócio de autenticação, controle de tentativas e lembrete de senha.           |
| `repositories/userRepository.js` | Simula um banco de dados em memória e fornece métodos para buscar usuários.              |
| `routes/authRoutes.js`           | Define as rotas de autenticação (`/auth/login`, `/auth/forgot-password`).                |
| `fixtures/postLogin.json`        | Dados de exemplo para testes automatizados de login.                                     |
| `test/login.test.js`             | Testes automatizados (Mocha/Chai/Supertest) para login e lembrete de senha.              |
| `run.sh`                         | Script para automatizar execução do servidor, testes e geração de relatórios (Linux/Mac).|
| `run.bat`                        | Script para automatizar execução do servidor e testes no Windows.                        |
| `mochawesome-report/`            | Pasta gerada automaticamente com relatórios HTML/JSON dos testes.                        |

### Descrição das principais pastas:

- **controllers/**: Contém os controllers responsáveis por receber e tratar as requisições HTTP.
- **services/**: Implementa as regras de negócio da aplicação.
- **repositories/**: Responsável pelo acesso e manipulação dos dados dos usuários (em memória).
- **routes/**: Define as rotas/endpoints da API.
- **fixtures/**: Armazena dados de exemplo para uso nos testes automatizados.
- **test/**: Contém os testes automatizados da aplicação.
- **mochawesome-report/**: Pasta de saída dos relatórios de testes gerados automaticamente.

---

<p align="center">
  <img src="https://img.shields.io/badge/mentoria-2.0-blue" alt="Mentoria 2.0" />
  <img src="https://img.shields.io/badge/express.js-API-green" alt="Express.js" />
  <img src="https://img.shields.io/badge/swagger-docs-yellow" alt="Swagger" />
</p>
