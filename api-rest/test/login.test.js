const request = require('supertest')
const { expect } = require('chai')
require("dotenv").config();
const postLogin = require('../fixtures/postLogin.json')
const postRegister = require('../fixtures/postRegister.json')

describe('Autenticação', () => {
    describe('POST/auth/login', () => {
        it('Deve retornar CODE 200 e mensagem "Login realizado com sucesso" quando usar credenciais válidas ', async () => {
            const bodyLogin = { ...postLogin }
            bodyLogin.password = "senha123"
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
            expect(resposta.status).to.equal(200);
            expect(resposta.body.mensagem).to.equal("Login realizado com sucesso!")
        })
        it('Deve retornar CODE 404 e mensagem "Usuário não cadastrado." quando usar credenciais não cadastradas', async () => {
            const bodyLogin = { ...postLogin }
            bodyLogin.username = "usuario-nao-cadastrado"
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
            expect(resposta.status).to.equal(404);
            expect(resposta.body.mensagem).to.equal("Usuário não cadastrado.")
        })
        it('Deve retornar CODE 401 e mensagem "Credenciais inválidas." quando usar credenciais inválidas', async () => {
            const bodyLogin = { ...postLogin }
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
            expect(resposta.status).to.equal(401);
            expect(resposta.body.mensagem).to.equal("Credenciais inválidas.")
        })

        it('Deve retornar CODE 403 e mensagem "Usuário bloqueado por excesso de tentativas." quando usar credenciais inválidas por 3 tentativas', async () => {
            const bodyLogin = { ...postLogin }
            await request(process.env.BASE_URL)
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
            await request(process.env.BASE_URL)
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
            expect(resposta.status).to.equal(403);
            expect(resposta.body.mensagem).to.equal("Usuário bloqueado por excesso de tentativas.")
        })


    })

    describe('POST/auth/forgot-password', () => {
        it('Deve retornar CODE 200 quando o lembrete de senha for enviado com sucesso', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/forgot-password')
                .set('Content-Type', 'application/json')
                .send({
                    'username': "usuario1"
                })
            expect(resposta.status).to.equal(200);
            expect(resposta.body.lembrete).to.equal("Seu lembrete de senha foi encaminhado para o email cadastrado: *******@email.com")
        })
        it('Deve retornar CODE 404 quando o usuário não estiver cadastrado', async () => {
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/forgot-password')
                .set('Content-Type', 'application/json')
                .send({
                    'username': "usuario-nao-cadastrado"
                })
            expect(resposta.status).to.equal(404);
            expect(resposta.body.mensagem).to.equal("Usuário não cadastrado.")
        })

    })

    describe('POST/auth/register', () => {
        it('Deve retornar CODE 201 quando o usuário for cadastrado com sucesso', async () => {
            const bodyRegister = { ...postRegister }
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/register')
                .set('Content-Type', 'application/json')
                .send(bodyRegister)
            expect(resposta.status).to.equal(201);
            expect(resposta.body.mensagem).to.equal("Usuário cadastrado com sucesso!")
        })
        it('Deve retornar CODE 409 durante cadastro de usuário quando o usuário já estiver cadastrado', async () => {
            const bodyRegister = { ...postRegister }
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/register')
                .set('Content-Type', 'application/json')
                .send(bodyRegister)
            expect(resposta.status).to.equal(409);
            expect(resposta.body.mensagem).to.equal("Usuário já cadastrado.")
        })
        it('Deve retornar CODE 400 e mensagem "Todos os campos são obrigatórios" quando o dados obrigatórios não forem informados durante cadastro - usuário não informado', async () => {
            const bodyRegister = { ...postRegister }
            bodyRegister.username = undefined;
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/register')
                .set('Content-Type', 'application/json')
                .send(bodyRegister)
            expect(resposta.status).to.equal(400);
            expect(resposta.body.mensagem).to.equal("Todos os campos são obrigatórios.")
        })

        it('Deve retornar CODE 400 e mensagem "Todos os campos são obrigatórios" quando o dados obrigatórios não forem informados durante cadastro - senha não informado', async () => {
            const bodyRegister = { ...postRegister }
            bodyRegister.password = undefined;
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/register')
                .set('Content-Type', 'application/json')
                .send(bodyRegister)
            expect(resposta.status).to.equal(400);
            expect(resposta.body.mensagem).to.equal("Todos os campos são obrigatórios.")
        })

        it('Deve retornar CODE 400 e mensagem "Todos os campos são obrigatórios" quando o dados obrigatórios não forem informados durante cadastro - email não informado', async () => {
            const bodyRegister = { ...postRegister }
            bodyRegister.email = undefined
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/register')
                .set('Content-Type', 'application/json')
                .send(bodyRegister)
            expect(resposta.status).to.equal(400);
            expect(resposta.body.mensagem).to.equal("Todos os campos são obrigatórios.")
        })

        it('Deve retornar CODE 400 e mensagem "O nome de usuário deve conter entre 3 e 8 caracteres." quando o nome do usuário conter menos menos de 3 caracteres', async () => {
            const bodyRegister = { ...postRegister }
            bodyRegister.username = "ne"
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/register')
                .set('Content-Type', 'application/json')
                .send(bodyRegister)
            expect(resposta.status).to.equal(400);
            expect(resposta.body.mensagem).to.equal("O nome de usuário deve conter entre 3 e 8 caracteres.")
        })

        it('Deve retornar CODE 400 e mensagem "O nome de usuário deve conter entre 3 e 8 caracteres." quando o nome do usuário conter mais de 8 caracteres', async () => {
            const bodyRegister = { ...postRegister }
            bodyRegister.username = "new-user-muito-longo"
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/register')
                .set('Content-Type', 'application/json')
                .send(bodyRegister)
            expect(resposta.status).to.equal(400);
            expect(resposta.body.mensagem).to.equal("O nome de usuário deve conter entre 3 e 8 caracteres.")
        })

        it('Deve retornar CODE 400 e mensagem "A senha deve conter entre 5 e 8 caracteres." quando a senha conter menos de 5 caracteres', async () => {
            const bodyRegister = { ...postRegister }
            bodyRegister.password = "nova"
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/register')
                .set('Content-Type', 'application/json')
                .send(bodyRegister)
            expect(resposta.status).to.equal(400);
            expect(resposta.body.mensagem).to.equal("A senha deve conter entre 5 e 8 caracteres.")
        })

        it('Deve retornar CODE 400 e mensagem "A senha deve conter entre 5 e 8 caracteres." quando a senha conter mais de 8 caracteres', async () => {
            const bodyRegister = { ...postRegister }
            bodyRegister.password = "nova12345"
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/register')
                .set('Content-Type', 'application/json')
                .send(bodyRegister)
            expect(resposta.status).to.equal(400);
            expect(resposta.body.mensagem).to.equal("A senha deve conter entre 5 e 8 caracteres.")
        })

        it('Deve retornar CODE 400 e mensagem "A senha deve conter letras e números." quando a senha conter apenas letras', async () => {
            const bodyRegister = { ...postRegister }
            bodyRegister.password = "nova-sen"
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/register')
                .set('Content-Type', 'application/json')
                .send(bodyRegister)
            expect(resposta.status).to.equal(400);
            expect(resposta.body.mensagem).to.equal("A senha deve conter letras e números.")
        })

        it('Deve retornar CODE 400 e mensagem "A senha deve conter letras e números." quando a senha conter apenas números', async () => {
            const bodyRegister = { ...postRegister }
            bodyRegister.password = "12345678"
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/register')
                .set('Content-Type', 'application/json')
                .send(bodyRegister)
            expect(resposta.status).to.equal(400);
            expect(resposta.body.mensagem).to.equal("A senha deve conter letras e números.")
        })

        it('Deve retornar CODE 400 e mensagem "O email informado é inválido. Deve conter apenas um @, domínio, e não pode começar ou terminar com @ ou ponto." quando o email conter mais de um @', async () => {
            const bodyRegister = { ...postRegister }
            bodyRegister.email = "novo-usuario@@email.com.br"
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/register')
                .set('Content-Type', 'application/json')
                .send(bodyRegister)
            expect(resposta.status).to.equal(400);
            expect(resposta.body.mensagem).to.equal("O email informado é inválido. Deve conter apenas um @, domínio, e não pode começar ou terminar com @ ou ponto.")
        }) 

        it('Deve retornar CODE 400 e mensagem "O email informado é inválido. Deve conter apenas um @, domínio, e não pode começar ou terminar com @ ou ponto." quando o email terminar com .', async () => {
            const bodyRegister = { ...postRegister }
            bodyRegister.email = "novo-usuario@email.com.br."
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/register')
                .set('Content-Type', 'application/json')
                .send(bodyRegister)
            expect(resposta.status).to.equal(400);
            expect(resposta.body.mensagem).to.equal("O email informado é inválido. Deve conter apenas um @, domínio, e não pode começar ou terminar com @ ou ponto.")
        })

        it('Deve retornar CODE 400 e mensagem "O email informado é inválido. Deve conter apenas um @, domínio, e não pode começar ou terminar com @ ou ponto." quando o email começar com .', async () => {
            const bodyRegister = { ...postRegister }
            bodyRegister.email = ".novo-usuario@email.com.br"
            const resposta = await request(process.env.BASE_URL)
                .post('/auth/register')
                .set('Content-Type', 'application/json')
                .send(bodyRegister)
            expect(resposta.status).to.equal(400);
            expect(resposta.body.mensagem).to.equal("O email informado é inválido. Deve conter apenas um @, domínio, e não pode começar ou terminar com @ ou ponto.")
        })

        it('Deve retornar CODE 400 e mensagem "O email informado é inválido. Deve conter apenas um @, domínio, e não pode começar ou terminar com @ ou ponto." quando o email terminar com @', async () => {
                const bodyRegister = { ...postRegister }
                bodyRegister.email = "novo-usuario@email.com.br@"
                const resposta = await request(process.env.BASE_URL)
                    .post('/auth/register')
                    .set('Content-Type', 'application/json')
                    .send(bodyRegister)
                expect(resposta.status).to.equal(400);
                expect(resposta.body.mensagem).to.equal("O email informado é inválido. Deve conter apenas um @, domínio, e não pode começar ou terminar com @ ou ponto.")
        })
    
        it('Deve retornar CODE 400 e mensagem "O email informado é inválido. Deve conter apenas um @, domínio, e não pode começar ou terminar com @ ou ponto." quando o email começar com @', async () => {
                const bodyRegister = { ...postRegister }
                bodyRegister.email = "@novo-usuario@email.com.br"
                const resposta = await request(process.env.BASE_URL)
                    .post('/auth/register')
                    .set('Content-Type', 'application/json')
                    .send(bodyRegister)
                expect(resposta.status).to.equal(400);
                expect(resposta.body.mensagem).to.equal("O email informado é inválido. Deve conter apenas um @, domínio, e não pode começar ou terminar com @ ou ponto.")
        })
    })  
})  
