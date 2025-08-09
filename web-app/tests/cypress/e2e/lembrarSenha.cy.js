describe('Lembrete de senha', () => {

    beforeEach(() => {

    })

    it('Deve mostrar mensagem de usuário não cadastrado quando inserido um usuário não cadastrado', () => {
        cy.solicitarLembreteSenha('usuário-não-cadastrado')
        cy.waitForToast('Usuário não cadastrado.', 'error')

    })

    it('Deve cadastrar usuário e quando inserido esse usuário deve mostrar mensagem que email foi enviado para email cadastrado', () => {
        cy.cadastrarNovoUsuario().then(({ username, email }) => {
            cy.solicitarLembreteSenha(username)
            cy.waitForToast(`Seu lembrete de senha foi encaminhado para o email cadastrado: ${email}`, 'success')
        })

    })

})