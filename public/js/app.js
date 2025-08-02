/**
 * app.js - Lógica principal da aplicação web responsiva
 * Sistema de Gestão de Login - Mentoria 2.0
 */

// Configuração da API
const API_BASE_URL = '/auth';

// Elementos do DOM
const forms = {
    login: document.getElementById('loginForm'),
    register: document.getElementById('registerForm'),
    forgot: document.getElementById('forgotForm')
};

const loadingElements = {
    login: {
        loading: document.getElementById('login-loading'),
        text: document.getElementById('login-text')
    },
    register: {
        loading: document.getElementById('register-loading'),
        text: document.getElementById('register-text')
    },
    forgot: {
        loading: document.getElementById('forgot-loading'),
        text: document.getElementById('forgot-text')
    }
};

/**
 * Exibe uma notificação toast
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo da notificação (success, error, warning)
 */
function showToast(message, type = 'info') {
    const backgroundColor = {
        success: '#22c55e',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    }[type] || '#3b82f6';

    Toastify({
        text: message,
        duration: 4000,
        gravity: "top",
        position: "right",
        backgroundColor: backgroundColor,
        color: "white",
        stopOnFocus: true,
        className: "toast-notification"
    }).showToast();
}

/**
 * Controla o estado de loading dos botões
 * @param {string} formType - Tipo do formulário (login, register, forgot)
 * @param {boolean} isLoading - Se está carregando
 */
function setLoading(formType, isLoading) {
    const elements = loadingElements[formType];
    if (elements) {
        elements.loading.classList.toggle('hidden', !isLoading);
        elements.text.classList.toggle('hidden', isLoading);
    }
}

/**
 * Navega entre as abas do sistema
 * @param {string} tabName - Nome da aba a ser exibida
 */
function showTab(tabName) {
    // Esconde todos os formulários
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('forgot-form').classList.add('hidden');
    
    // Remove classe active de todas as abas
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-primary-600', 'text-white');
        btn.classList.add('text-gray-600');
    });
    
    // Mostra o formulário selecionado
    document.getElementById(`${tabName}-form`).classList.remove('hidden');
    
    // Adiciona classe active na aba selecionada
    const activeTab = document.getElementById(`${tabName}-tab`);
    activeTab.classList.add('active', 'bg-primary-600', 'text-white');
    activeTab.classList.remove('text-gray-600');
}

/**
 * Realiza uma requisição para a API
 * @param {string} endpoint - Endpoint da API
 * @param {Object} data - Dados a serem enviados
 * @returns {Promise} Promise com a resposta da API
 */
async function apiRequest(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        return { status: response.status, data: result };
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw new Error('Erro de conexão com o servidor');
    }
}

/**
 * Valida os dados do formulário de cadastro
 * @param {Object} data - Dados do formulário
 * @returns {Object} Resultado da validação
 */
function validateRegisterData(data) {
    const errors = [];
    
    // Validação de username
    if (data.username.length < 3 || data.username.length > 8) {
        errors.push('O nome de usuário deve conter entre 3 e 8 caracteres.');
    }
    
    // Validação de senha
    if (data.password.length < 5 || data.password.length > 8) {
        errors.push('A senha deve conter entre 5 e 8 caracteres.');
    }
    
    // Senha deve conter letras e números
    if (!(/[a-zA-Z]/.test(data.password) && /[0-9]/.test(data.password))) {
        errors.push('A senha deve conter letras e números.');
    }
    
    // Validação de email
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(data.email)) {
        errors.push('O email informado é inválido.');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

/**
 * Manipula o envio do formulário de login
 * @param {Event} event - Evento do formulário
 */
async function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        username: formData.get('username'),
        password: formData.get('password')
    };
    
    // Validação básica
    if (!data.username || !data.password) {
        showToast('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    setLoading('login', true);
    
    try {
        const response = await apiRequest('/login', data);
        
        if (response.status === 200) {
            showToast('Login realizado com sucesso!', 'success');
            event.target.reset();
        } else if (response.status === 401) {
            showToast('Credenciais inválidas.', 'error');
        } else if (response.status === 403) {
            showToast('Usuário bloqueado por excesso de tentativas.', 'error');
        } else if (response.status === 404) {
            showToast('Usuário não cadastrado.', 'error');
        } else {
            showToast(response.data.mensagem || 'Erro no login.', 'error');
        }
    } catch (error) {
        showToast(error.message, 'error');
    } finally {
        setLoading('login', false);
    }
}

/**
 * Manipula o envio do formulário de cadastro
 * @param {Event} event - Evento do formulário
 */
async function handleRegister(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
    };
    
    // Validação dos dados
    const validation = validateRegisterData(data);
    if (!validation.isValid) {
        showToast(validation.errors.join('\n'), 'error');
        return;
    }
    
    setLoading('register', true);
    
    try {
        const response = await apiRequest('/register', data);
        
        if (response.status === 201) {
            showToast('Usuário cadastrado com sucesso!', 'success');
            event.target.reset();
            showTab('login'); // Volta para a aba de login
        } else if (response.status === 409) {
            showToast('Usuário já cadastrado.', 'error');
        } else {
            showToast(response.data.mensagem || 'Erro no cadastro.', 'error');
        }
    } catch (error) {
        showToast(error.message, 'error');
    } finally {
        setLoading('register', false);
    }
}

/**
 * Manipula o envio do formulário de recuperação de senha
 * @param {Event} event - Evento do formulário
 */
async function handleForgotPassword(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        username: formData.get('username')
    };
    
    // Validação básica
    if (!data.username) {
        showToast('Por favor, informe o usuário.', 'error');
        return;
    }
    
    setLoading('forgot', true);
    
    try {
        const response = await apiRequest('/forgot-password', data);
        
        if (response.status === 200) {
            showToast(response.data.lembrete || 'Lembrete enviado com sucesso!', 'success');
            event.target.reset();
        } else if (response.status === 404) {
            showToast('Usuário não cadastrado.', 'error');
        } else {
            showToast(response.data.mensagem || 'Erro ao enviar lembrete.', 'error');
        }
    } catch (error) {
        showToast(error.message, 'error');
    } finally {
        setLoading('forgot', false);
    }
}

/**
 * Inicializa a aplicação
 */
function initApp() {
    // Adiciona event listeners aos formulários
    forms.login.addEventListener('submit', handleLogin);
    forms.register.addEventListener('submit', handleRegister);
    forms.forgot.addEventListener('submit', handleForgotPassword);
    
    // Mostra a aba de login por padrão
    showTab('login');
    
    // Adiciona validação em tempo real para o formulário de cadastro
    const registerForm = document.getElementById('registerForm');
    const usernameInput = document.getElementById('register-username');
    const passwordInput = document.getElementById('register-password');
    const emailInput = document.getElementById('register-email');
    
    // Validação de username em tempo real
    usernameInput.addEventListener('input', function() {
        const value = this.value;
        const isValid = value.length >= 3 && value.length <= 8;
        this.classList.toggle('border-red-500', !isValid && value.length > 0);
        this.classList.toggle('border-green-500', isValid && value.length > 0);
    });
    
    // Validação de senha em tempo real
    passwordInput.addEventListener('input', function() {
        const value = this.value;
        const hasValidLength = value.length >= 5 && value.length <= 8;
        const hasLettersAndNumbers = /[a-zA-Z]/.test(value) && /[0-9]/.test(value);
        const isValid = hasValidLength && hasLettersAndNumbers;
        
        this.classList.toggle('border-red-500', !isValid && value.length > 0);
        this.classList.toggle('border-green-500', isValid && value.length > 0);
    });
    
    // Validação de email em tempo real
    emailInput.addEventListener('input', function() {
        const value = this.value;
        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        const isValid = emailRegex.test(value);
        
        this.classList.toggle('border-red-500', !isValid && value.length > 0);
        this.classList.toggle('border-green-500', isValid && value.length > 0);
    });
    
    console.log('Aplicação inicializada com sucesso!');
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initApp); 