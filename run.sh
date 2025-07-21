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
echo "================================================================"


# Aguarda alguns segundos para o servidor subir
echo "================================================================"
echo "⏳ Aguardando o servidor iniciar..."
sleep 5
echo "================================================================"

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
        "Todos os testes")
            echo "▶️ Executando todos os testes..."
            npm test
            break
            ;;
        "Gerar Report")
            echo "📊 Gerando Relátorios...."
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
