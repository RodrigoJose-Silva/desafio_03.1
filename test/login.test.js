import request from 'supertest';
import { expect } from 'chai';

describe('Login', () => {
    describe('POST/auth/login', () => {
        it('Deve retornar CODE 200 e mensagem "Login realizado com sucesso" quando usar credenciais válidas ', async () => {
            const resposta = await request("http://localhost:3030")
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': "usuario1",
                    'password': "senha123"
                })
            expect(resposta.status).to.equal(200);
            expect(resposta.body.mensagem).to.equal("Login realizado com sucesso!")
        })
        it('Deve retornar CODE 404 e mensagem "Usuário não cadastrado." quando usar credenciais não cadastradas', async () => {
            const resposta = await request("http://localhost:3030")
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': "usuario-nao-cadastrado",
                    'password': "senha-invalida"
                })
            expect(resposta.status).to.equal(404);
            expect(resposta.body.mensagem).to.equal("Usuário não cadastrado.")
        })
        it('Deve retornar CODE 401 e mensagem "Credenciais inválidas." quando usar credenciais inválidas', async () => {
            const resposta = await request("http://localhost:3030")
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': "usuario1",
                    'password': "senha-invalida"
                })
            expect(resposta.status).to.equal(401);
            expect(resposta.body.mensagem).to.equal("Credenciais inválidas.")
        })

        it('Deve retornar CODE 401 e mensagem "Usuário bloqueado por excesso de tentativas." quando usar credenciais inválidas por 3 tentativas', async () => {
            await request("http://localhost:3030")
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': "usuario1",
                    'password': "senha-invalida"
                })
            await request("http://localhost:3030")
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': "usuario1",
                    'password': "senha-invalida"
                })
            const resposta = await request("http://localhost:3030")
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': "usuario1",
                    'password': "senha-invalida"
                })
            expect(resposta.status).to.equal(401);
            expect(resposta.body.mensagem).to.equal("Usuário bloqueado por excesso de tentativas.")
        })


    })

    describe('POST/auth/forgot-password', () => {
        it('Deve retornar CODE 200 quando o lembrete de senha for enviado com sucesso', async () => {
            const resposta = await request("http://localhost:3030")
                .post('/auth/forgot-password')
                .set('Content-Type', 'application/json')
                .send({
                    'username': "usuario1"
                })
            expect(resposta.status).to.equal(200);
            expect(resposta.body.lembrete).to.equal("Seu lembrete de senha foi encaminhado para o email cadastrado: *******@email.com")
        })
        it('Deve retornar CODE 404 quando o usuário não estiver cadastrado', async () => {
            const resposta = await request("http://localhost:3030")
                .post('/auth/forgot-password')
                .set('Content-Type', 'application/json')
                .send({
                    'username': "usuario-nao-cadastrado"
                })
            expect(resposta.status).to.equal(404);
            expect(resposta.body.mensagem).to.equal("Usuário não cadastrado.")
        })

    })


})