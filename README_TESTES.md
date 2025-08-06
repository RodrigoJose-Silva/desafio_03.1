# Testes Automatizados - Cadastro de Usuário

## Visão Geral

Este projeto implementa testes automatizados com Cypress para a página de cadastro de usuário da aplicação web. Os testes cobrem cenários positivos e negativos, garantindo a qualidade e funcionalidade da aplicação.

## Estrutura do Projeto

```
cypress/
├── e2e/
│   └── cadastro.cy.js          # Testes da página de cadastro
├── page_objects/
│   └── cadastro.page.js        # Page Object para cadastro
└── support/
    ├── e2e.js                  # Configurações do Cypress
    └── commands.js             # Comandos personalizados
```

## Tecnologias Utilizadas

- **Cypress**: Framework de automação de testes frontend
- **@faker-js/faker**: Biblioteca para geração de dados fictícios
- **MaterializeCSS**: Framework CSS utilizado na aplicação

## Instalação e Configuração

### Pré-requisitos

1. Node.js instalado
2. Aplicação web rodando na porta 3000
3. API REST rodando na porta 3030

### Instalação das Dependências

```bash
npm install
```

### Configuração

O arquivo `cypress.config.js` está configurado com:
- Base URL: `http://localhost:8080`
- Viewport: 1280x720
- Screenshots em caso de falha
- Vídeos desabilitados

## Executando os Testes

### Comandos Disponíveis

```bash
# Executar todos os testes em modo headless
npm test

# Abrir interface gráfica do Cypress
npm run test:open

# Executar testes com navegador visível
npm run test:headed

# Executar testes no Chrome
npm run test:chrome

# Executar testes no Firefox
npm run test:firefox
```

### Execução Manual

```bash
# Executar testes específicos
npx cypress run --spec "cypress/e2e/cadastro.cy.js"

# Executar com interface gráfica
npx cypress open
```

## Cenários de Teste Implementados

### Cenários Positivos ✅

1. **Cadastro com Sucesso**
   - Deve cadastrar usuário e exibir a mensagem: "Usuário cadastrado com sucesso!"
   - Valida redirecionamento para página de login
   - Verifica exibição do toast de sucesso

2. **Elementos da Interface**
   - Valida exibição do título da página
   - Verifica presença de todos os campos do formulário
   - Confirma labels dos campos

3. **Navegação**
   - Testa navegação para página de login
   - Testa navegação para página "Esqueci a Senha"

### Cenários Negativos ❌

#### Campos Vazios
1. **Todos os campos vazios**
   - Deve exibir erro quando todos os campos estiverem vazios

2. **Campo específico vazio**
   - Deve exibir erro quando campo nome de usuário estiver vazio
   - Deve exibir erro quando campo senha estiver vazio
   - Deve exibir erro quando campo email estiver vazio

#### Limites de Caracteres
1. **Nome de usuário**
   - Deve exibir erro quando nome de usuário tiver menos de 3 caracteres
   - Deve exibir erro quando nome de usuário tiver mais de 8 caracteres

2. **Senha**
   - Deve exibir erro quando senha tiver menos de 5 caracteres
   - Deve exibir erro quando senha tiver mais de 8 caracteres

#### Formato de Email
1. **Email inválido**
   - Deve exibir erro quando email não tiver formato válido
   - Deve exibir erro quando email não tiver @
   - Deve exibir erro quando email não tiver domínio

#### Usuário Duplicado
1. **Usuário já cadastrado**
   - Deve exibir erro quando tentar cadastrar usuário já existente

### Cenários de Interface 🎨

1. **Limpeza de Formulário**
   - Deve limpar formulário corretamente

2. **Foco nos Campos**
   - Deve manter foco nos campos após preenchimento

## Page Object Pattern

### CadastroPage Class

O arquivo `cypress/page_objects/cadastro.page.js` implementa o padrão Page Object com:

#### Elementos
- Seletores para todos os campos do formulário
- Botões e links de navegação
- Elementos de toast para mensagens
- Labels e títulos

#### Métodos
- **Navegação**: `visit()`
- **Preenchimento**: `fillUsername()`, `fillPassword()`, `fillEmail()`, `fillForm()`
- **Submissão**: `submitForm()`, `registerUser()`
- **Limpeza**: `clearForm()`
- **Validações**: `shouldShowPageTitle()`, `shouldShowFormFields()`, etc.

## Geração de Dados com Faker

A biblioteca `@faker-js/faker` é utilizada para:

- **Usernames**: Gerados com limite de 8 caracteres
- **Passwords**: Geradas com 5-8 caracteres
- **Emails**: Usando o username como prefixo + "@test.com"

### Exemplo de Uso

```javascript
const username = faker.internet.userName().substring(0, 8)
const password = faker.internet.password({ length: { min: 5, max: 8 } })
const email = `${username}@test.com`
```

## Comandos Personalizados

### waitForToast()
Aguarda e valida a exibição de mensagens toast:
```javascript
cy.waitForToast('Usuário cadastrado com sucesso!', 'success')
cy.waitForToast('Usuário já cadastrado.', 'error')
```

### clearForm()
Limpa todos os campos do formulário:
```javascript
cy.clearForm()
```

## Validações Implementadas

### Validações de Interface
- ✅ Presença de todos os elementos
- ✅ Labels corretos
- ✅ Título da página
- ✅ Navegação entre páginas

### Validações de Formulário
- ✅ Campos obrigatórios
- ✅ Limites de caracteres
- ✅ Formato de email
- ✅ Validação de usuário duplicado

### Validações de Feedback
- ✅ Mensagens de sucesso
- ✅ Mensagens de erro
- ✅ Classes CSS para validação
- ✅ Toast notifications

## Relatórios e Evidências

- **Screenshots**: Capturados automaticamente em caso de falha
- **Vídeos**: Desabilitados para otimizar performance
- **Logs**: Disponíveis no console do Cypress

## Boas Práticas Implementadas

1. **Page Object Pattern**: Separação de responsabilidades
2. **Dados Dinâmicos**: Uso do Faker para dados realistas
3. **Comandos Reutilizáveis**: Custom commands para ações comuns
4. **Validações Específicas**: Cada cenário tem validações específicas
5. **Organização Clara**: Testes organizados por categoria
6. **Nomenclatura Descritiva**: Nomes de testes autoexplicativos

## Troubleshooting

### Problemas Comuns

1. **Aplicação não está rodando**
   - Certifique-se de que a web-app está rodando na porta 3000
   - Certifique-se de que a API está rodando na porta 3030

2. **Testes falhando por timeout**
   - Aumente o timeout no `cypress.config.js`
   - Verifique a performance da aplicação

3. **Elementos não encontrados**
   - Verifique se os seletores estão corretos
   - Confirme se a estrutura HTML não mudou

### Logs e Debug

```bash
# Executar com logs detalhados
npx cypress run --spec "cypress/e2e/cadastro.cy.js" --reporter spec

# Debug mode
npx cypress open --config video=false
```

## Contribuição

Para adicionar novos testes:

1. Crie novos métodos no Page Object se necessário
2. Adicione novos cenários no arquivo de teste
3. Mantenha a organização por categoria
4. Use dados do Faker para cenários dinâmicos
5. Documente novos comandos personalizados

## Conclusão

Esta implementação fornece uma cobertura completa de testes para a página de cadastro de usuário, garantindo:

- ✅ Funcionalidade correta
- ✅ Validações adequadas
- ✅ Feedback apropriado ao usuário
- ✅ Experiência de usuário consistente
- ✅ Manutenibilidade do código de teste 