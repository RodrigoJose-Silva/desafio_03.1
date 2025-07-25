import { expect } from 'chai'
import request from 'supertest'
import dotenv from 'dotenv'
dotenv.config()
import { faker } from '@faker-js/faker';


describe(" [login] Login", () => {
  describe(" POST/auth/login", () => {
    it(' Deve retornar status 200 e mensagem "Login realizado com sucesso" quando usar credenciais válidas ', async () => {
      const resposta = await request(process.env.BASE_URL)
        .post("/auth/login")
        .set("Content-Type", "application/json")
        .send({
            username: "usuario1",
            password: "senha123",
        })
      expect(resposta.status).to.equal(200);
      expect(resposta.body.mensagem).to.equal("Login realizado com sucesso!");
    });
    it(' Deve retornar status 404 e mensagem "Usuário não cadastrado." quando usar credenciais não cadastradas', async () => {
        const login404 = {
            username: faker.internet.username(), 
            password: faker.internet.password(), 
        }
      const resposta = await request(process.env.BASE_URL)
        .post("/auth/login")
        .set("Content-Type", "application/json")
        .send(login404);
        expect(resposta.status).to.equal(404);
        expect(resposta.body.mensagem).to.equal("Usuário não cadastrado.");
    });
    it('  Deve retornar status 401 e mensagem "Credenciais inválidas." quando usar credenciais inválidas', async () => {
      const resposta = await request(process.env.BASE_URL)
        .post("/auth/login")
        .set("Content-Type", "application/json")
        .send({
          username: "usuario1",
          password: "senha-invalida",
        });
      expect(resposta.status).to.equal(401);
      expect(resposta.body.mensagem).to.equal("Credenciais inválidas.");
    });

    it(' Deve retornar status 401 e mensagem "Usuário bloqueado por excesso de tentativas." quando usar credenciais inválidas por 3 tentativas', async () => {
      await request(process.env.BASE_URL)
        .post("/auth/login")
        .set("Content-Type", "application/json")
        .send({
          username: "usuario1",
          password: "senha-invalida",
        });
      await request(process.env.BASE_URL)
        .post("/auth/login")
        .set("Content-Type", "application/json")
        .send({
          username: "usuario1",
          password: "senha-invalida",
        });
      const resposta = await request(process.env.BASE_URL)
        .post("/auth/login")
        .set("Content-Type", "application/json")
        .send({
          username: "usuario1",
          password: "senha-invalida",
        });
      expect(resposta.status).to.equal(401);
      expect(resposta.body.mensagem).to.equal(
        "Usuário bloqueado por excesso de tentativas."
      );
    });

    it(' Deve retornar status 400 e mensagem "Usuário e senha são obrigatórios." quando não preencher campo password', async () => {
      const resposta = await request(process.env.BASE_URL)
        .post("/auth/login")
        .set("Content-Type", "application/json")
        .send({
          username: faker.internet.username(),
          password: "",
        });
      expect(resposta.status).to.equal(400);
      expect(resposta.body.mensagem).to.equal(
        "Usuário e senha são obrigatórios."
      );
    });
  });
 
  describe("[forgot] POST/auth/forgot-password", () => {
    it("Deve retornar status 200 quando o lembrete de senha for enviado com sucesso", async () => {
      const resposta = await request(process.env.BASE_URL)
        .post("/auth/forgot-password")
        .set("Content-Type", "application/json")
        .send({
          username: "usuario1",
        });
      expect(resposta.status).to.equal(200);
      expect(resposta.body.lembrete).to.equal(
        "Seu lembrete de senha foi encaminhado para o email cadastrado: *******@email.com"
      );
    });
    it("Deve retornar status 404 quando o usuário não estiver cadastrado", async () => {
    const userNotFound = {
        username: faker.internet.username()
    }
      const resposta = await request(process.env.BASE_URL)
        .post("/auth/forgot-password")
        .set("Content-Type", "application/json")
        .send(userNotFound)
      expect(resposta.status).to.equal(404);
      expect(resposta.body.mensagem).to.equal("Usuário não cadastrado.");
    });
  });
});
