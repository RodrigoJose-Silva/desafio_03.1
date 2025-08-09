// Suite de testes do fluxo de lembrete de senha.
describe('Lembrete de senha', () => {

    beforeEach(() => {

    })

    // Cenário: usuário inexistente solicita lembrete.
    it('Deve mostrar mensagem de usuário não cadastrado quando inserido um usuário não cadastrado', () => {
        cy.solicitarLembreteSenha('usuário-não-cadastrado')
        cy.waitForToast('Usuário não cadastrado.', 'error')

    })

    // Cenário: usuário válido solicita lembrete, sistema informa e-mail destino.
    it('Deve cadastrar usuário e quando inserido esse usuário deve mostrar mensagem que email foi enviado para email cadastrado', () => {
        cy.cadastrarNovoUsuario().then(({ username, email }) => {
            cy.solicitarLembreteSenha(username)
            cy.waitForToast(`Seu lembrete de senha foi encaminhado para o email cadastrado: ${email}`, 'success')
        })

    })

})