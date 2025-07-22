#!/bin/bash

# Para servidor antigo
echo ""
echo "================================================================"
echo "⛔ Parando o servidor antigo..."
pkill -f "app.js"
echo "================================================================" 

# Startando o servidor
echo "================================================================"
echo "🚀 Iniciando servidor..."
npm start & 
SERVER_PID=$!
echo "================================================================"

# Aguarda o servidor subir com checagem ativa
function wait_for_server() {
    local url=$1
    local max_attempts=20
    local attempt=1
    echo "================================================================"
    echo "⏳ Aguardando o servidor iniciar..."
    until curl --output /dev/null --silent --head --fail "$url"; do
        if [ $attempt -ge $max_attempts ]; then
            echo "❌ Servidor não respondeu após $max_attempts tentativas."
            exit 1
        fi
        printf '.'
        attempt=$((attempt+1))
        sleep 1
    done
    echo "\n================================================================"
    echo "✅ Servidor está pronto!"
}

# Detecta BASE_URL do .env ou usa padrão
BASE_URL=$(grep BASE_URL .env 2>/dev/null | cut -d '=' -f2)
if [ -z "$BASE_URL" ]; then
    BASE_URL="http://localhost:3030"
fi
export BASE_URL

wait_for_server "$BASE_URL/"

if [[ "$1" == "--ci" ]]; then
    echo "▶️ Executando todos os testes (modo CI)..."
    npm test
    kill $SERVER_PID
    exit $?
fi

# Função para exibir a mensagem de boas-vindas
exibir_mensagem_boas_vindas() {
    clear
    echo ""
    echo "============================================"
    echo "Olá!! seja Bem-vindo(a) - Desafio 03 da mentoria do Júlio de Lima!"
    read -p "Por favor, me diga seu Nome: " name
    echo "$name"
    clear
    echo -e "📌 Seja bem-vindo(a): $name\nPor gentileza escolha uma das opções abaixo:"
    echo "================================================================" 
}
exibir_mensagem_boas_vindas
options=("Todos os Testes"  "Gerar Report" "Sair")

select opt in "${options[@]}"
do
    case $opt in
        "Todos os Testes")
            echo "▶️ Executando todos os testes..."
            npm test
            break
            ;;
        "Gerar Report")
            echo "📊 Gerando Relatórios...."
            npm run test-html
            break
            ;;
        "Sair")
            echo "👋 Obrigado $name volte sempre..."
            break
            ;;
        *) echo "⚠️ Vish!!! $name Opção inválida! Tente novamente.";;
    esac
done
