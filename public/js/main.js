/**
 * main.js - JavaScript principal da aplicação
 * Responsável por funcionalidades gerais e utilitários
 */

// Configuração global do Toastify
const TOAST_CONFIG = {
    duration: 4000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
        background: "linear-gradient(to right, #3b82f6, #1d4ed8)",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500"
    }
};

/**
 * Exibe uma notificação toast
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo da notificação (success, error, warning, info)
 */
function showToast(message, type = 'info') {
    const config = { ...TOAST_CONFIG };
    
    // Personaliza o estilo baseado no tipo
    switch(type) {
        case 'success':
            config.style.background = "linear-gradient(to right, #10b981, #059669)";
            break;
        case 'error':
            config.style.background = "linear-gradient(to right, #ef4444, #dc2626)";
            break;
        case 'warning':
            config.style.background = "linear-gradient(to right, #f59e0b, #d97706)";
            break;
        default:
            config.style.background = "linear-gradient(to right, #3b82f6, #1d4ed8)";
    }
    
    Toastify(config).showToast();
}

/**
 * Valida se um email é válido
 * @param {string} email - Email a ser validado
 * @returns {boolean} - True se válido, false caso contrário
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Valida se um usuário está no formato correto (3-8 caracteres)
 * @param {string} username - Usuário a ser validado
 * @returns {boolean} - True se válido, false caso contrário
 */
function isValidUsername(username) {
    return username.length >= 3 && username.length <= 8;
}

/**
 * Valida se uma senha está no formato correto (5-8 caracteres, letras e números)
 * @param {string} password - Senha a ser validada
 * @returns {boolean} - True se válido, false caso contrário
 */
function isValidPassword(password) {
    return password.length >= 5 && 
           password.length <= 8 && 
           /[a-zA-Z]/.test(password) && 
           /[0-9]/.test(password);
}

/**
 * Faz uma requisição HTTP para a API
 * @param {string} url - URL da requisição
 * @param {Object} options - Opções da requisição
 * @returns {Promise} - Promise com a resposta
 */
async function apiRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        const data = await response.json();
        
        return {
            ok: response.ok,
            status: response.status,
            data: data
        };
    } catch (error) {
        console.error('Erro na requisição:', error);
        return {
            ok: false,
            status: 0,
            data: { mensagem: 'Erro de conexão' }
        };
    }
}

/**
 * Alterna a visibilidade da senha
 * @param {HTMLElement} input - Campo de senha
 * @param {HTMLElement} button - Botão de toggle
 */
function togglePasswordVisibility(input, button) {
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

/**
 * Mostra/esconde o estado de loading de um botão
 * @param {HTMLElement} button - Botão a ser modificado
 * @param {boolean} loading - True para mostrar loading, false para esconder
 */
function setButtonLoading(button, loading) {
    const textSpan = button.querySelector('[id$="Text"]');
    const loadingSpan = button.querySelector('[id$="Loading"]');
    
    if (loading) {
        textSpan.classList.add('hidden');
        loadingSpan.classList.remove('hidden');
        button.disabled = true;
    } else {
        textSpan.classList.remove('hidden');
        loadingSpan.classList.add('hidden');
        button.disabled = false;
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aplicação carregada com sucesso!');
    
    // Adiciona listeners para toggle de senha
    const passwordToggles = document.querySelectorAll('[id^="toggle"]');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            togglePasswordVisibility(input, this);
        });
    });
});

// Exporta funções para uso em outros arquivos
window.AppUtils = {
    showToast,
    isValidEmail,
    isValidUsername,
    isValidPassword,
    apiRequest,
    togglePasswordVisibility,
    setButtonLoading
}; 