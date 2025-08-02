/**
 * register.js - JavaScript específico para a página de cadastro
 * Gerencia o formulário de registro e interação com a API
 */

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const registerButton = document.getElementById('registerButton');
    
    if (!registerForm || !registerButton) {
        console.error('Elementos do formulário de registro não encontrados');
        return;
    }
    
    /**
     * Valida os campos do formulário de registro
     * @param {Object} formData - Dados do formulário
     * @returns {Object} - Resultado da validação
     */
    function validateRegisterForm(formData) {
        const errors = [];
        
        // Validação do usuário
        if (!formData.username || formData.username.trim() === '') {
            errors.push('Usuário é obrigatório');
        } else if (!AppUtils.isValidUsername(formData.username)) {
            errors.push('Usuário deve ter entre 3 e 8 caracteres');
        }
        
        // Validação do email
        if (!formData.email || formData.email.trim() === '') {
            errors.push('Email é obrigatório');
        } else if (!AppUtils.isValidEmail(formData.email)) {
            errors.push('Email deve ter um formato válido');
        }
        
        // Validação da senha
        if (!formData.password || formData.password.trim() === '') {
            errors.push('Senha é obrigatória');
        } else if (!AppUtils.isValidPassword(formData.password)) {
            errors.push('Senha deve ter entre 5 e 8 caracteres, com letras e números');
        }
        
        // Validação da confirmação de senha
        if (!formData.confirmPassword || formData.confirmPassword.trim() === '') {
            errors.push('Confirmação de senha é obrigatória');
        } else if (formData.password !== formData.confirmPassword) {
            errors.push('Senhas não coincidem');
        }
        
        // Validação dos termos
        if (!formData.terms) {
            errors.push('Você deve aceitar os termos de uso');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
    
    /**
     * Processa a resposta da API de registro
     * @param {Object} response - Resposta da API
     */
    function handleRegisterResponse(response) {
        if (response.ok) {
            // Registro bem-sucedido
            AppUtils.showToast(response.data.mensagem, 'success');
            
            // Limpa o formulário
            registerForm.reset();
            
            // Redireciona para login após 2 segundos
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } else {
            // Registro falhou
            let message = response.data.mensagem || 'Erro no registro';
            
            // Personaliza mensagem baseada no status
            switch(response.status) {
                case 400:
                    message = 'Dados inválidos. Verifique as regras de validação.';
                    break;
                case 409:
                    message = 'Usuário já cadastrado.';
                    break;
                default:
                    message = 'Erro interno do servidor.';
            }
            
            AppUtils.showToast(message, 'error');
        }
    }
    
    /**
     * Executa o processo de registro
     * @param {Object} formData - Dados do formulário
     */
    async function performRegister(formData) {
        try {
            // Valida os dados do formulário
            const validation = validateRegisterForm(formData);
            if (!validation.isValid) {
                AppUtils.showToast(validation.errors.join(', '), 'error');
                return;
            }
            
            // Mostra estado de loading
            AppUtils.setButtonLoading(registerButton, true);
            
            // Faz a requisição para a API
            const response = await AppUtils.apiRequest('/auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    username: formData.username.trim(),
                    email: formData.email.trim(),
                    password: formData.password
                })
            });
            
            // Processa a resposta
            handleRegisterResponse(response);
            
        } catch (error) {
            console.error('Erro durante o registro:', error);
            AppUtils.showToast('Erro de conexão. Tente novamente.', 'error');
        } finally {
            // Esconde estado de loading
            AppUtils.setButtonLoading(registerButton, false);
        }
    }
    
    /**
     * Manipula o envio do formulário de registro
     * @param {Event} event - Evento de submit
     */
    function handleRegisterSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(registerForm);
        const data = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            terms: formData.get('terms') === 'on'
        };
        
        performRegister(data);
    }
    
    // Adiciona listener para o formulário
    registerForm.addEventListener('submit', handleRegisterSubmit);
    
    // Adiciona validação em tempo real
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // Validação do usuário
    if (usernameInput) {
        usernameInput.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value === '') {
                this.classList.add('border-red-500');
            } else if (!AppUtils.isValidUsername(value)) {
                this.classList.add('border-yellow-500');
            } else {
                this.classList.remove('border-red-500', 'border-yellow-500');
            }
        });
    }
    
    // Validação do email
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value === '') {
                this.classList.add('border-red-500');
            } else if (!AppUtils.isValidEmail(value)) {
                this.classList.add('border-yellow-500');
            } else {
                this.classList.remove('border-red-500', 'border-yellow-500');
            }
        });
    }
    
    // Validação da senha
    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            const value = this.value;
            if (value === '') {
                this.classList.add('border-red-500');
            } else if (!AppUtils.isValidPassword(value)) {
                this.classList.add('border-yellow-500');
            } else {
                this.classList.remove('border-red-500', 'border-yellow-500');
            }
        });
    }
    
    // Validação da confirmação de senha
    if (confirmPasswordInput && passwordInput) {
        confirmPasswordInput.addEventListener('blur', function() {
            const value = this.value;
            const passwordValue = passwordInput.value;
            
            if (value === '') {
                this.classList.add('border-red-500');
            } else if (value !== passwordValue) {
                this.classList.add('border-yellow-500');
            } else {
                this.classList.remove('border-red-500', 'border-yellow-500');
            }
        });
    }
    
    // Adiciona funcionalidade de "Enter" para submeter
    registerForm.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            registerForm.dispatchEvent(new Event('submit'));
        }
    });
    
    console.log('Formulário de registro inicializado');
}); 