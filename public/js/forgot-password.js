/**
 * forgot-password.js - JavaScript específico para a página de recuperação de senha
 * Gerencia o formulário de lembrete de senha e interação com a API
 */

document.addEventListener('DOMContentLoaded', function() {
    const forgotForm = document.getElementById('forgotForm');
    const forgotButton = document.getElementById('forgotButton');
    
    if (!forgotForm || !forgotButton) {
        console.error('Elementos do formulário de recuperação não encontrados');
        return;
    }
    
    /**
     * Valida os campos do formulário de recuperação
     * @param {Object} formData - Dados do formulário
     * @returns {Object} - Resultado da validação
     */
    function validateForgotForm(formData) {
        const errors = [];
        
        if (!formData.username || formData.username.trim() === '') {
            errors.push('Usuário é obrigatório');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
    
    /**
     * Processa a resposta da API de recuperação de senha
     * @param {Object} response - Resposta da API
     */
    function handleForgotResponse(response) {
        if (response.ok) {
            // Recuperação bem-sucedida
            AppUtils.showToast(response.data.lembrete || 'Lembrete enviado com sucesso!', 'success');
            
            // Limpa o formulário
            forgotForm.reset();
            
            // Redireciona para login após 3 segundos
            setTimeout(() => {
                window.location.href = '/login';
            }, 3000);
        } else {
            // Recuperação falhou
            let message = response.data.mensagem || 'Erro na recuperação';
            
            // Personaliza mensagem baseada no status
            switch(response.status) {
                case 404:
                    message = 'Usuário não cadastrado.';
                    break;
                case 400:
                    message = 'Dados inválidos. Verifique o usuário.';
                    break;
                default:
                    message = 'Erro interno do servidor.';
            }
            
            AppUtils.showToast(message, 'error');
        }
    }
    
    /**
     * Executa o processo de recuperação de senha
     * @param {Object} formData - Dados do formulário
     */
    async function performForgotPassword(formData) {
        try {
            // Valida os dados do formulário
            const validation = validateForgotForm(formData);
            if (!validation.isValid) {
                AppUtils.showToast(validation.errors.join(', '), 'error');
                return;
            }
            
            // Mostra estado de loading
            AppUtils.setButtonLoading(forgotButton, true);
            
            // Faz a requisição para a API
            const response = await AppUtils.apiRequest('/auth/forgot-password', {
                method: 'POST',
                body: JSON.stringify({
                    username: formData.username.trim()
                })
            });
            
            // Processa a resposta
            handleForgotResponse(response);
            
        } catch (error) {
            console.error('Erro durante a recuperação:', error);
            AppUtils.showToast('Erro de conexão. Tente novamente.', 'error');
        } finally {
            // Esconde estado de loading
            AppUtils.setButtonLoading(forgotButton, false);
        }
    }
    
    /**
     * Manipula o envio do formulário de recuperação
     * @param {Event} event - Evento de submit
     */
    function handleForgotSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(forgotForm);
        const data = {
            username: formData.get('username')
        };
        
        performForgotPassword(data);
    }
    
    // Adiciona listener para o formulário
    forgotForm.addEventListener('submit', handleForgotSubmit);
    
    // Adiciona validação em tempo real
    const usernameInput = document.getElementById('username');
    
    if (usernameInput) {
        usernameInput.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.classList.add('border-red-500');
            } else {
                this.classList.remove('border-red-500');
            }
        });
    }
    
    // Adiciona funcionalidade de "Enter" para submeter
    forgotForm.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            forgotForm.dispatchEvent(new Event('submit'));
        }
    });
    
    console.log('Formulário de recuperação de senha inicializado');
}); 