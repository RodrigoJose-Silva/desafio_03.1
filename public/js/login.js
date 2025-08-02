/**
 * login.js - JavaScript específico para a página de login
 * Gerencia o formulário de login e interação com a API
 */

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    
    if (!loginForm || !loginButton) {
        console.error('Elementos do formulário de login não encontrados');
        return;
    }
    
    /**
     * Valida os campos do formulário de login
     * @param {Object} formData - Dados do formulário
     * @returns {Object} - Resultado da validação
     */
    function validateLoginForm(formData) {
        const errors = [];
        
        if (!formData.username || formData.username.trim() === '') {
            errors.push('Usuário é obrigatório');
        }
        
        if (!formData.password || formData.password.trim() === '') {
            errors.push('Senha é obrigatória');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
    
    /**
     * Processa a resposta da API de login
     * @param {Object} response - Resposta da API
     */
    function handleLoginResponse(response) {
        if (response.ok) {
            // Login bem-sucedido
            AppUtils.showToast(response.data.mensagem, 'success');
            
            // Simula redirecionamento após login bem-sucedido
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        } else {
            // Login falhou
            let message = response.data.mensagem || 'Erro no login';
            
            // Personaliza mensagem baseada no status
            switch(response.status) {
                case 401:
                    message = 'Credenciais inválidas. Verifique usuário e senha.';
                    break;
                case 403:
                    message = 'Usuário bloqueado por excesso de tentativas.';
                    break;
                case 404:
                    message = 'Usuário não cadastrado.';
                    break;
                case 400:
                    message = 'Dados inválidos. Verifique os campos.';
                    break;
                default:
                    message = 'Erro interno do servidor.';
            }
            
            AppUtils.showToast(message, 'error');
        }
    }
    
    /**
     * Executa o processo de login
     * @param {Object} formData - Dados do formulário
     */
    async function performLogin(formData) {
        try {
            // Valida os dados do formulário
            const validation = validateLoginForm(formData);
            if (!validation.isValid) {
                AppUtils.showToast(validation.errors.join(', '), 'error');
                return;
            }
            
            // Mostra estado de loading
            AppUtils.setButtonLoading(loginButton, true);
            
            // Faz a requisição para a API
            const response = await AppUtils.apiRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    username: formData.username.trim(),
                    password: formData.password
                })
            });
            
            // Processa a resposta
            handleLoginResponse(response);
            
        } catch (error) {
            console.error('Erro durante o login:', error);
            AppUtils.showToast('Erro de conexão. Tente novamente.', 'error');
        } finally {
            // Esconde estado de loading
            AppUtils.setButtonLoading(loginButton, false);
        }
    }
    
    /**
     * Manipula o envio do formulário de login
     * @param {Event} event - Evento de submit
     */
    function handleLoginSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(loginForm);
        const data = {
            username: formData.get('username'),
            password: formData.get('password')
        };
        
        performLogin(data);
    }
    
    // Adiciona listener para o formulário
    loginForm.addEventListener('submit', handleLoginSubmit);
    
    // Adiciona validação em tempo real
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    if (usernameInput) {
        usernameInput.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.classList.add('border-red-500');
            } else {
                this.classList.remove('border-red-500');
            }
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.classList.add('border-red-500');
            } else {
                this.classList.remove('border-red-500');
            }
        });
    }
    
    // Adiciona funcionalidade de "Enter" para submeter
    loginForm.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            loginForm.dispatchEvent(new Event('submit'));
        }
    });
    
    console.log('Formulário de login inicializado');
}); 