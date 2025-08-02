// models/User.js
// Modelo de usuário para MongoDB

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Schema do usuário para MongoDB
 * Define a estrutura dos dados do usuário no banco
 */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username é obrigatório'],
        unique: true,
        minlength: [3, 'Username deve ter pelo menos 3 caracteres'],
        maxlength: [8, 'Username deve ter no máximo 8 caracteres'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Senha é obrigatória'],
        minlength: [5, 'Senha deve ter pelo menos 5 caracteres'],
        maxlength: [8, 'Senha deve ter no máximo 8 caracteres']
    },
    email: {
        type: String,
        required: [true, 'Email é obrigatório'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[^@\s]+@[^@\s]+\.[^@\s]+$/, 'Email inválido']
    },
    reminder: {
        type: String,
        default: 'Seu lembrete de senha foi encaminhado para o email cadastrado: *******@email.com'
    },
    loginAttempts: {
        count: {
            type: Number,
            default: 0
        },
        blocked: {
            type: Boolean,
            default: false
        },
        lastAttempt: {
            type: Date,
            default: Date.now
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Adiciona automaticamente createdAt e updatedAt
});

/**
 * Middleware para criptografar a senha antes de salvar
 */
userSchema.pre('save', function(next) {
    // Criptografa a senha apenas se ela foi modificada
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    this.updatedAt = Date.now();
    next();
});

/**
 * Método para verificar se a senha está correta
 * @param {string} password - Senha a ser verificada
 * @returns {boolean} True se a senha estiver correta
 */
userSchema.methods.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

/**
 * Método para incrementar tentativas de login
 */
userSchema.methods.incrementLoginAttempts = function() {
    this.loginAttempts.count += 1;
    this.loginAttempts.lastAttempt = Date.now();
    
    // Bloqueia após 3 tentativas
    if (this.loginAttempts.count >= 3) {
        this.loginAttempts.blocked = true;
    }
    
    return this.save();
};

/**
 * Método para resetar tentativas de login
 */
userSchema.methods.resetLoginAttempts = function() {
    this.loginAttempts.count = 0;
    this.loginAttempts.blocked = false;
    this.loginAttempts.lastAttempt = Date.now();
    return this.save();
};

/**
 * Método para verificar se o usuário está bloqueado
 * @returns {boolean} True se o usuário estiver bloqueado
 */
userSchema.methods.isBlocked = function() {
    return this.loginAttempts.blocked;
};

module.exports = mongoose.model('User', userSchema); 