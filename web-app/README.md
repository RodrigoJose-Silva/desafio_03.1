# 🚀 Aplicação Web para Gestão de Login

## 👥 Integrantes do Desafio 3 - Grupo 5

| Nome         | E-mail                      | GitHub                                               |
| ------------ | --------------------------- | ---------------------------------------------------- |
| Rodrigo José | digo.1903@hotmail.com       | [Rodrigo José](https://github.com/RodrigoJose-Silva) |
| Tiago Silva  | auditor.adhoc@gmail.com     | [Tiago Silva](https://github.com/AuditorAdhoc)       |
| Lucas Tiago  | ltsantiago88@egmailmail.com | [Lucas Tiago](https://github.com/ltsantiago)         |
| Bruno Castro | bruno.reis.castro1@gmail.com| [Bruno Reis Castro](https://github.com/bruno-reis-castro)  |

## 📚 Sobre o Projeto

Este projeto é uma Aplicação Web para interação com a API Rest de Gestão de Login, desenvolvida para fins de estudo de testes de software na **MENTORIA 2.0** ministrada por Julio de Lima.

- Interface responsiva com MaterializeCSS.
- Comunicação com a API via Axios.
- Feedback visual com toasts para cada ação.
- Estrutura em camadas (Views, Controllers, Routes).

## 🏗️ Estrutura do Projeto

```
public/
  - css/
    - styles.css         # Estilos personalizados da aplicação
  - js/
    - main.js            # JavaScript principal da aplicação
views/
  - login.ejs            # Página de login
  - register.ejs         # Página de cadastro
  - forgot-password.ejs  # Página de lembrete de senha
  - welcome.ejs          # Página de boas-vindas após login
controllers/
  - authController.js    # Controlador para interação com a API
routes/
  - authRoutes.js        # Rotas da aplicação web
app.js                   # Ponto de entrada da aplicação
tests/
  - cypress.config.js    # Configuração do Cypress (baseUrl, viewport, etc.)
  - cypress/
    - e2e/
      - cadastro.cy.js       # Cenários de cadastro de usuário
      - login.cy.js          # Cenários de login
      - lembrarSenha.cy.js   # Cenários de lembrete de senha
    - page_objects/
      - cadastro.page.js     # Page Object da tela de cadastro
      - login.page.js        # Page Object da tela de login
    - support/
      - commands.js          # Comandos customizados (ex.: waitForToast, cadastrarNovoUsuario)
      - e2e.js               # Bootstrap do Cypress (import dos comandos)
```

## 🔄 Fluxo de Autenticação

1. O usuário acessa a aplicação web e preenche o formulário de login.
2. A aplicação web envia os dados para a API através do controlador.
3. A API processa a requisição e retorna o resultado.
4. A aplicação web exibe o feedback apropriado (toast) e redireciona o usuário conforme necessário.
5. Em caso de login bem-sucedido, o usuário é redirecionado para a página de boas-vindas.

## 🛠️ Funcionalidades

- ✅ Login de usuário
- 🔑 Lembrete de senha
- 👤 Cadastro de novo usuário
- 🎉 Página de boas-vindas personalizada
- 📱 Interface responsiva para dispositivos móveis

## 📦 Instalação

```bash
npm install
```

## ▶️ Como rodar a aplicação

```bash
npm start
```

A aplicação web será iniciada na porta padrão `8080`. Acesse em: http://localhost:8080/

## 🔗 Integração com a API

A aplicação web se comunica com a API REST que deve estar rodando na porta `3030`. Certifique-se de iniciar a API antes de usar a aplicação web:

```bash
cd ../api-rest
npm start
```

## 🎨 Tecnologias Utilizadas

- **Express.js**: Framework web para Node.js
- **EJS**: Template engine para gerar HTML
- **Axios**: Cliente HTTP para comunicação com a API
- **MaterializeCSS**: Framework CSS para design responsivo
- **JavaScript**: Para interatividade no lado do cliente

## 🧪 Testes End-to-End (Cypress)

Pré-requisitos:
- API rodando em `http://localhost:3030` (veja seção anterior)
- Aplicação web rodando em `http://localhost:8080`

O Cypress já está configurado com `baseUrl` em `tests/cypress.config.js`.

Abrir a interface do Cypress:

```bash
npx cypress open --config-file tests/cypress.config.js
```

Executar testes em modo headless:

```bash
npx cypress run --config-file tests/cypress.config.js
```

### Page Objects e Comandos Customizados
- Page Objects: `tests/cypress/page_objects/` encapsulam seletores e ações das telas de Login e Cadastro.
- Comandos: `tests/cypress/support/commands.js` contém utilitários como:
  - `waitForToast(message, type)`: valida toasts de sucesso/erro.
  - `cadastrarNovoUsuario()`: executa o fluxo de cadastro e retorna `{ username, password, email }` gerados.
  - `solicitarLembreteSenha(username)`: solicita o lembrete na tela apropriada.

Esses artefatos foram comentados com JSDoc para facilitar a compreensão e manutenção.